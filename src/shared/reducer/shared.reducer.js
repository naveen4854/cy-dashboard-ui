import React from 'react'
import _ from 'lodash';
import { store } from '../../main'

export function notify(messages, errorType, persistMessage) {
    return store.dispatch((dispatch, getState) => {
        dispatch(getState().notificationStore.notify(messages, errorType, persistMessage))
    })
}

export function clearNotifications() {
    return store.dispatch((dispatch, getState) => {
        dispatch(getState().notificationStore.clearNotifications())
    });
}

export function custom(message, buttons) {
    return store.dispatch((dispatch, getState) => {
        dispatch(getState().notificationStore.custom(message, buttons))
    });
}

export function confirm(message, buttons) {
    return store.dispatch((dispatch, getState) => {
        dispatch(getState().notificationStore.confirm(message, buttons))
    });
}

export const ACTION_HANDLERS = {

}

const initialState = {
    clearNotifications,
    notify,
    custom,
    confirm
};

export default function SharedReducer(state = initialState, action) {
    // const handler = ACTION_HANDLERS[action.type];
    // return handler ? handler(state, action) : state;
    return state;
}
