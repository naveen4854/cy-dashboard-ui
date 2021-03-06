import { push, replace } from 'react-router-redux'
import { browserHistory, Router } from 'react-router'

import { INITIATE_PING, SAVE_LOGIN, UPDATE_REF_TOKEN_TIMEOUT_ID, USER_LOGOUT, DEFAULT_DASHBOARD_ID, UPDATE_PING_TOKEN_TIMEOUT_ID } from "./login.reducer";
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
                    //tokenRefTimeOutId: -1,
                });
                dispatch({
                    type: UPDATE_PING_TOKEN_TIMEOUT_ID,
                    pingRefTimeOutId: -1
                });
                dispatch({
                    type: UPDATE_REF_TOKEN_TIMEOUT_ID,
                    tokenRefTimeOutId: -1
                })

                console.log("SETTING REFRESH TOKEN TRIGGERFROM NEW LOGIN")
                dispatch({
                    type: INITIATE_PING
                });
                let nextTimeDiff = getState().user.expiresIn * 1000;
                dispatch(getState().user.setTokenRefreshTimeout(nextTimeDiff));
                dispatch(getState().user.ping(1));
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
            //tokenRefTimeOutId: -1,
        });
        dispatch({
            type: UPDATE_PING_TOKEN_TIMEOUT_ID,
            pingRefTimeOutId: -1
        });
        dispatch({
            type: UPDATE_REF_TOKEN_TIMEOUT_ID,
            tokenRefTimeOutId: -1
        })
    }
}

export function setTokenRefreshTimeout(timeDiff) {
    return (dispatch, getState) => {
        // return
        let user = getState().user;

        if (!user.refreshToken || isNaN(timeDiff)) {
            console.log("NO REFRESH TOKEN FOUND")
            return dispatch({
                type: Constants.USER_LOGOUT
            })
        }
        // && getState().app.currentTabId != localStorage.getItem('rt')
        if (user.tokenRefTimeOutId != -1)
            return

        let tokenSetTimeoutId = setTimeout(() => {
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
                });;
                dispatch({
                    type: UPDATE_REF_TOKEN_TIMEOUT_ID,
                    tokenRefTimeOutId: -1
                })
                console.log(res, "TOKEN REFRESH DONE");
                let nextTimeDiff = getState().user.expiresIn * 1000;
                console.log("TOKEN REFRESH timeout SET FOR: " + nextTimeDiff, getState().user.expiresOn);
                dispatch(getState().user.setTokenRefreshTimeout(nextTimeDiff))
            }).catch((err) => {
                dispatch(getState().notificationStore.clearNotifications());
                dispatch(getState().notificationStore.notify(err.response.data.Messages, ResponseStatusEnum.Error, true));
                dispatch(getState().user.setTokenRefreshTimeout(Constants.refreshFailureTimeMinute));
                //dispatch(getState().user.logout())
            });
        }, timeDiff);

        dispatch({
            type: UPDATE_REF_TOKEN_TIMEOUT_ID,
            tokenRefTimeOutId: tokenSetTimeoutId
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
            clearTimeout(getState().user.pingRefTimeOutId);
            dispatch({
                type: USER_LOGOUT
            })
            browserHistory.push(`${Constants.appPath}login`);
        });
    }
}

export function defaultRedirection() {
    return (dispatch, getState) => {
        // return browserHistory.push('/dashboard/mydashboards');

        dispatch(getState().spinnerStore.BeginTask());
        loginService.getDefaultDashboard()
            .then(res => {
                dispatch(getState().spinnerStore.EndTask());
                dispatch({
                    type: DEFAULT_DASHBOARD_ID,
                    defaultDashboardId: res.data
                })
                if (res.data)
                    browserHistory.push(`${Constants.appPath}dashboard/view/` + res.data);
                else
                    browserHistory.push(`${Constants.appPath}dashboard/mydashboards`);
            })
    }
}

export function clearRefreshTokenTimeout() {
    return (dispatch, getState) => {
        clearTimeout(getState().user.tokenRefTimeOutId)
        dispatch({
            type: UPDATE_REF_TOKEN_TIMEOUT_ID,
            tokenRefTimeOutId: -1
        })
    }
}

export function clearPingTimeout() {
    return (dispatch, getState) => {
        clearTimeout(getState().user.pingRefTimeOutId)
        dispatch({
            type: UPDATE_PING_TOKEN_TIMEOUT_ID,
            pingRefTimeOutId: -1
        })
    }
}

export function ping(timeDiff) {
    return (dispatch, getState) => {
        let user = getState().user;

        if (user.pingRefTimeOutId != -1 && getState().app.currentTabId != localStorage.getItem(Constants.refreshTabId))
            return

        let pingTimeoutId = setTimeout(() => {
            console.log("PING STARTED for user.nic ", user.nic)
            if (!authMan.isAuthenticated()) {
                return dispatch(getState().user.logout());
            }
            loginService.ping(user.nic).then(res => {

                let nextTimeDiff = Constants.oneMinute //1000 * 60;
                dispatch(getState().user.ping(nextTimeDiff))
            })
                .catch((err) => {
                    dispatch(getState().notificationStore.clearNotifications());
                    dispatch(getState().notificationStore.notify(err.response.data.Messages, ResponseStatusEnum.Error, true));
                    dispatch(getState().user.ping(Constants.pingFailureTimeMinute))
                    // dispatch(getState().user.logout())
                });
        }, timeDiff);

        dispatch({
            type: UPDATE_PING_TOKEN_TIMEOUT_ID,
            pingRefTimeOutId: pingTimeoutId
        })
    }
}
