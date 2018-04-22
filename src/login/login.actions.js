import { push, replace } from 'react-router-redux'
import { browserHistory, Router } from 'react-router'

import { INITIATE_PING, SAVE_LOGIN, UPDATE_REF_TOKEN_TIMEOUT_ID, USER_LOGOUT, DEFAULT_DASHBOARD_ID } from "./login.reducer";
import { Constants } from "../shared/constants";
import * as loginService from './login.service';
import * as authMan from "../authentication/auth-manager";
import ResponseStatusEnum from '../shared/enums/response-status-enum';

export function login(loginDetails) {
    return (dispatch, getState) => {
        dispatch(getState().spinnerStore.BeginTask());
        loginService.userLogin(loginDetails)
            .then((response) => {
                dispatch(getState().spinnerStore.EndTask());
                if (!response || response.status != 200)
                    return;

                localStorage.setItem(Constants.auth, JSON.stringify(response.data));
                localStorage.setItem(Constants.refreshTabId, getState().app.currentTabId);
                localStorage.setItem(Constants.setNewRt, getState().app.currentTabId);

                dispatch({
                    type: SAVE_LOGIN,
                    auth: response.data,
                    loggedIn: true,
                    userInitalized: true,
                    tokenRefTimeOutId: -1
                });

                console.log("SETTING REFRESH TOKEN TRIGGERFROM NEW LOGIN")
                dispatch({
                    type: INITIATE_PING
                });
                let nextTimeDiff = getState().user.expiresIn * 1000;
                dispatch(getState().user.setTokenRefreshTimeout(nextTimeDiff));
                dispatch(getState().user.defaultRedirection());
            })
            .catch((error) => {
                dispatch(getState().spinnerStore.EndTask());
                dispatch(getState().notificationStore.notify(error.response.data.Messages, ResponseStatusEnum.Error));
            })
    }
}

export function initializeUserFromCache(userData) {
    return (dispatch, getState) => {
        dispatch({
            type: SAVE_LOGIN,
            auth: userData,
            userInitalized: true,
            loggedIn: userData ? true : false,
            tokenRefTimeOutId: -1
        })
    }
}

export function InitiatePing() {
    return (dispatch, getState) => {
        dispatch({
            type: INITIATE_PING
        });
    }
}

export function setTokenRefreshTimeout(timeDiff) {
    return (dispatch, getState) => {
        let user = getState().user;

        if (!user.refreshToken || isNaN(timeDiff)) {
            console.log("NO REFRESH TOKEN FOUND")
            return dispatch({
                type: USER_LOGOUT
            })
        }
        if (user.tokenRefTimeOutId != -1)
            return

        let Id = setTimeout(() => {
            let refToken = user.refreshToken;
            console.log("TOKEN REFRESH STARTED", refToken)
            loginService.refreshToken(refToken, user.nic).then(res => {
                localStorage.setItem(Constants.auth, JSON.stringify(res ? res.data : {}));
                dispatch({
                    type: SAVE_LOGIN,
                    auth: res ? res.data : {},
                    loggedIn: true,
                    userInitalized: true,
                    tokenRefTimeOutId: -1
                });
                console.log(res, "TOKEN REFRESH DONE");
                let nextTimeDiff = getState().user.expiresIn * 1000;
                console.log("TOKEN REFRESH timeout SET FOR: " + nextTimeDiff, getState().user.expiresOn);
                dispatch(getState().user.setTokenRefreshTimeout(nextTimeDiff))
            }).catch((err) => {
                dispatch(getState().notificationStore.clearNotifications());
                dispatch(getState().notificationStore.notify(err.response.data.Messages, ResponseStatusEnum.Error, true));
                dispatch(getState().user.logout())
            });
        }, timeDiff);

        dispatch({
            type: UPDATE_REF_TOKEN_TIMEOUT_ID,
            tokenRefTimeOutId: Id
        })
    }
}

export function logout() {
    return (dispatch, getState) => {
        let user = getState().user;

        loginService.userLogout().then(res => {
            authMan.clearAuth();
            localStorage.removeItem(Constants.refreshTabId)
            localStorage.removeItem(Constants.setNewRt)
            clearTimeout(getState().user.tokenRefTimeOutId)
            dispatch({
                type: USER_LOGOUT
            })
            browserHistory.push('/login');
        });
    }
}

export function defaultRedirection() {
    return (dispatch, getState) => {
        dispatch(getState().spinnerStore.BeginTask());
        loginService.getDefaultDashboard()
            .then(res => {
                dispatch(getState().spinnerStore.EndTask());
                dispatch({
                    type: DEFAULT_DASHBOARD_ID,
                    defaultDashboardId: res.data
                })
                if (res.data)
                    browserHistory.push('/dashboard/view/' + res.data);
                else
                    browserHistory.push('/dashboard/mydashboards');
            })
    }
}

export function setPingTimeout(timeDiff) {
    return (dispatch, getState) => {
        let user = getState().user;

        if (user.tokenRefTimeOutId != -1)
            return

        let Id = setTimeout(() => {
            let refToken = user.refreshToken;
            console.log("TOKEN REFRESH STARTED", refToken)
            loginService.refreshToken(refToken, user.nic).then(res => {
                localStorage.setItem(Constants.auth, JSON.stringify(res ? res.data : {}));
                dispatch({
                    type: SAVE_LOGIN,
                    auth: res ? res.data : {},
                    loggedIn: true,
                    userInitalized: true,
                    tokenRefTimeOutId: -1
                });
                console.log(res, "TOKEN REFRESH DONE");
                let nextTimeDiff = getState().user.expiresIn * 1000;
                console.log("TOKEN REFRESH timeout SET FOR: " + nextTimeDiff, getState().user.expiresOn);
                dispatch(getState().user.setTokenRefreshTimeout(nextTimeDiff))
            }).catch((err) => {
                dispatch(getState().notificationStore.clearNotifications());
                dispatch(getState().notificationStore.notify(err.response.data.Messages, ResponseStatusEnum.Error, true));
                dispatch(getState().user.logout())
            });
        }, timeDiff);

        dispatch({
            type: UPDATE_REF_TOKEN_TIMEOUT_ID,
            tokenRefTimeOutId: Id
        })
    }
}

export function clearRefreshTokenTimeoutś() {
    return (dispatch, getState) => {
        clearTimeout(getState().user.tokenRefTimeOutId)
        dispatch({
            type: UPDATE_REF_TOKEN_TIMEOUT_ID,
            tokenRefTimeOutId: -1
        })
    }
}