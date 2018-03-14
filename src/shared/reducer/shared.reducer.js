import React from 'react'
import _ from 'lodash';
import { store } from '../../main'

export function ShowNotification(messagesConfiguration) {
    return store.dispatch((dispatch, getState) => {
        dispatch(getState().notificationStore.ShowNotification(messagesConfiguration));
    })
}

export function notify(messages, errorType, persistMessage) {
    return store.dispatch((dispatch, getState) => {
        dispatch(getState().notificationStore.notify(messages, errorType, persistMessage))
    })
}

export function ClearNotifications() {
    return store.dispatch((dispatch, getState) => {
        dispatch(getState().notificationStore.ClearNotifications())
    });
}

export const ACTION_HANDLERS = {

}

const initialState = {
    ShowNotification,
    ClearNotifications,
    notify
};

export default function SharedReducer(state = initialState, action) {
    // const handler = ACTION_HANDLERS[action.type];
    // return handler ? handler(state, action) : state;
    return state;
}
