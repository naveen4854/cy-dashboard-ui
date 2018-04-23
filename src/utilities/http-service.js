require('es6-promise').polyfill();
var axios = require('axios');
import { browserHistory } from 'react-router';
import { dispatch } from 'redux';
import { store } from '../main'

import ResponseStatusEnum from '../shared/enums/response-status-enum';
import { SAVE_LOGIN, UPDATE_REF_TOKEN_TIMEOUT_ID } from '../login/login.reducer';
import * as loginService from '../login/login.service';
import { Constants } from '../shared/constants';
import * as authMan from '../authentication/auth-manager';

const envconfig = require('./static/envconfig');
let retryPromise = undefined;

/**
 * http post
 * @param {*} url 
 * @param {*} data 
 * @param {*} config 
 */
export function axiosPost(url, data, config) {
    return (
        axios.post(url, data)
    )
}

/**
 * http get
 * @param {*} url 
 * @param {*} data 
 * @param {*} config 
 */
export function axiosGet(url, queryString = null) {
    var getUrl = url;
    if (queryString) {
        getUrl = getUrl + "?" + queryString;
    }
    return axios.get(getUrl)
}

/**
 * request interceptor, can be used to manipulate every req before it requests an api
 */
axios.interceptors.request.use(
    (config) => {
        if (config.__isRetryRequest)
            console.log("retry :" + (config.retryCount + 1))

        if (!config.__isRetryRequest)
            config.retryCount = 0;

        const authToken = authMan.getAuthToken();
        if (authToken) {
            config.headers = Object.assign({}, config.headers, {
                Authorization: `bearer ${authToken}`
            });
        } else {
            browserHistory.push('/login')
        }
        return config;
    },
    (error) => {
        console.log('request error', error)
        return Promise.reject(error);
    }
);

/**
 * response interceptor, can be used to manipulate response and add default implementations
 */
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        handleNetworkError(error);
        if (error.response && error.response.status === 401 && !error.config.__isRetryRequest)
            return handleUnAuthWithRetry(error);
        return Promise.reject(error);
    }
);

/**
 * handle network error
 * @param {*} error 
 */
function handleNetworkError(error) {
    if (!error.response && error.message == "Network Error") {
        return store.dispatch((dispatch, getState) => {
            dispatch(getState().notificationStore.notify([{ Message: 'Network Error', normalizedMessage: 'Network_Error' }], ResponseStatusEnum.Error));
        })
    }
}

/**
 * handle 401 with retry 
 * @param {*} error 
 */
function handleUnAuthWithRetry(error) {
    if (error.config && error.config.__isRetryRequest)
        return store.dispatch((dispatch, getState) => {
            dispatch(getState().notificationStore.notify(['Permission Denied'], ResponseStatusEnum.Error));
            dispatch(getState().user.logout());
        })

    error.config.__isRetryRequest = true;
    return store.dispatch((dispatch, getState) => {
        let currentTabId = getState().app.currentTabId;
        let rt = localStorage.getItem(Constants.refreshTabId);
        if (currentTabId == rt) {
            clearTimeout(getState().user.tokenRefTimeOutId)
            dispatch({
                type: UPDATE_REF_TOKEN_TIMEOUT_ID,
                tokenRefTimeOutId: -1
            })
        } else {
            //clear other tabs refreshtimeout id
            localStorage.setItem(Constants.cleartimeout, Date.parse(new Date()));
        }

        let user = getState().user;
        if (!user.refreshToken) {
            console.log("NO REFRESH TOKEN FOUND")
            return dispatch(getState().user.logout())
        }
        retryPromise = retryPromise || loginService.refreshToken(user.refreshToken, user.nic).then(res => {
            //set this tab as new rt
            if (currentTabId != rt)
                localStorage.setItem(Constants.refreshTabId, currentTabId);
            localStorage.setItem(Constants.auth, JSON.stringify(res ? res.data : {}));
            dispatch({
                type: SAVE_LOGIN,
                auth: res ? res.data : {},
                loggedIn: true,
                userInitalized: true,
                //tokenRefTimeOutId: -1
            }); 
            dispatch({
              type: UPDATE_REF_TOKEN_TIMEOUT_ID,
              tokenRefTimeOutId: -1
            })
            let nextTimeDiff = getState().user.expiresIn * 1000;
            dispatch(getState().user.setTokenRefreshTimeout(nextTimeDiff))
            dispatch(getState().user.ping(Constants.oneMinute))
            
        }).catch((err) => {
            dispatch(getState().user.logout())
            dispatch(getState().notificationStore.clearNotifications());
            dispatch(getState().notificationStore.notify(err.response.data.Messages, ResponseStatusEnum.Error, true));
        });

        return retryPromise.then(res => {
            const authToken = authMan.getAuthToken();
            error.config.headers = Object.assign({}, error.config.headers, {
                Authorization: `bearer ${authToken}`
            });
            return axios(error.config);
        }).catch((error) => {
            dispatch(getState().notificationStore.ClearNotifications());
            dispatch(getState().notificationStore.notify(error.response.data.Messages, ResponseStatusEnum.Error, true));
            dispatch(getState().user.logout())
        });
    })
}

