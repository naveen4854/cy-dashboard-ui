import React from 'react'
import { push, replace } from 'react-router-redux'
import { browserHistory, Router } from 'react-router'

import { setTokenRefreshTimeout, defaultRedirection, initializeUserFromCache, logout, clearRefreshTokenTimeout, ping } from './login.actions';

export const SAVE_LOGIN = "SAVE_LOGIN";
export const LOGIN_DETAILS = "LOGIN_DETAILS"
export const INITIATE_PING = "INITIATE_PING"
export const UPDATE_REF_TOKEN_TIMEOUT_ID = "UPDATE_REF_TOKEN_TIMEOUT_ID"
export const DEFAULT_DASHBOARD_ID = "DEFAULT_DASHBOARD_ID"
export const USER_LOGOUT = "USER_LOGOUT"
export const UPDATE_PING_TOKEN_TIMEOUT_ID = "UPDATE_PING_TOKEN_TIMEOUT_ID"

export const ACTION_HANDLERS = {
  [SAVE_LOGIN]: (state, action) => {
    let auth = action.auth || {}
    return Object.assign({}, state, {
      auth: auth,
      accessToken: auth.access_token,
      expiresIn: auth.expires_in,
      refreshToken: auth.refresh_token,
      userName: auth.userName,
      roles: auth.roles,
      nic: auth.Nic,
      expiresOn: auth['.expires'],
      issuedOn: auth['.issued'],
      loggedIn: action.loggedIn,
      userInitalized: action.userInitalized,
      //tokenRefTimeOutId: action.tokenRefTimeOutId,
      //pingRefTimeOutId: action.pingRefTimeOutId
    })
  },
  [INITIATE_PING]: (state, action) => {
    if (!state.pingInitiated)
      return Object.assign({}, state, {
        pingInitiated: true
      })
    return state;
  },
  [UPDATE_REF_TOKEN_TIMEOUT_ID]: (state, action) => {
    return Object.assign({}, state, {
      tokenRefTimeOutId: action.tokenRefTimeOutId
    })
  },
  [DEFAULT_DASHBOARD_ID]: (state, action) => {
    return Object.assign({}, state, {
      defaultDashboardId: action.defaultDashboardId
    })
  },
  [UPDATE_PING_TOKEN_TIMEOUT_ID]: (state, action) => {
    clearTimeout(state.pingRefTimeOutId)
    return Object.assign({}, state, {
      pingRefTimeOutId: action.pingRefTimeOutId
    })
  },
}

const initialState = {
  userName: '',
  loggedIn: false,
  userInitalized: false,
  auth: {},
  accessToken: '',
  expiresIn: '',
  refreshToken: '',
  roles: '',
  nic: '',
  expiresOn: '',
  issuedOn: '',
  tokenInitiated: false,
  pingInitiated: false,
  tokenRefTimeOutId: -1,
  pingRefTimeOutId: -1,
  defaultDashboardId: -1,
  setTokenRefreshTimeout,
  defaultRedirection,
  logout,
  initializeUserFromCache,
  clearRefreshTokenTimeout,
  ping
};

export default function LoginFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
