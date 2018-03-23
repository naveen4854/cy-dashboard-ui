import _ from 'lodash';
import * as authMan from "../authentication/auth-manager";
import {Constants} from '../shared/constants';

const ADD_TAB_ID = "ADD_TAB_ID";

const initialState = {
    currentTabId: 'tab',
    refreshTokenTab: -1,
    triggerRefreshFromOtherTab 
};

export function setTabId() {
    return (dispatch, getState) => {
        if (!getState().user.userInitalized)
            dispatch(getState().user.initializeUserFromCache(authMan.getAuth()));

        let currentTabId = Date.parse(new Date()) + Math.floor(Math.random() * 10000)
        dispatch({
            type: ADD_TAB_ID,
            currentTabId
        })

        let tabsList = JSON.parse(localStorage.getItem(Constants.tabsList));

        if (!tabsList) {
            tabsList = [];
        }
        tabsList.push(currentTabId);
        localStorage.setItem(Constants.tabsList, JSON.stringify(tabsList));
        let user = getState().user;
        if (tabsList.length == 1 && user.loggedIn) {
            localStorage.setItem(Constants.refreshTabId, JSON.stringify(currentTabId));
            localStorage.setItem(Constants.setNewRt, JSON.stringify(currentTabId));
            dispatch(user.setTokenRefreshTimeout(0));
        }
    }
}

export function removeFromTabsList() {
    return (dispatch, getState) => {
        let tabsList = JSON.parse(localStorage.getItem(Constants.tabsList));
        let currentTabId = getState().app.currentTabId;
        if (tabsList) {
            let newTabs = _.filter(tabsList, (tab) => tab != currentTabId)
            localStorage.setItem('tlst', JSON.stringify(newTabs));
        }
    }
}

export function triggerRefreshFromOtherTab() {
    return (dispatch, getState) => {
        let tlst = JSON.parse(localStorage.getItem(Constants.tabsList));
        let user = getState().user;
        if (tlst && user.loggedIn) {
            // since we have already removed currenttab from the list
            // lets take first item from tlst and publish newrefreshtabevent
            let newrt = _.first(tlst);
            localStorage.setItem(Constants.refreshTabId, newrt)
            localStorage.setItem(Constants.setNewRt, newrt)
        }
    }
}

export function setRefreshToken() {
    return (dispatch, getState) => {
        let currentTabId = getState().app.currentTabId;

        // on browser refresh and new tab 
        // initalize user from local storage
        if (!getState().user.userInitalized)
            dispatch(getState().user.initializeUserFromCache(authMan.getAuth()));

        let user = getState().user;
        if (currentTabId == localStorage.getItem(Constants.refreshTabId) && user.loggedIn) {
            dispatch(user.setTokenRefreshTimeout(0));
        }
    }
}

export function logout() {
    return (dispatch, getState) => {
        dispatch(getState().user.logout());
    }
}

export const ACTION_HANDLERS = {
    [ADD_TAB_ID]: (state, action) => {
        return Object.assign({}, state, { currentTabId: action.currentTabId })
    }
}

export default function AppReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
