import React from 'react'
import _ from 'lodash';

export function ShowNotification(messagesConfiguration) {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.ShowNotification(messagesConfiguration));
    }
}

export function notify(messages, errorType, persistMessage) {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.notify(messages, errorType, persistMessage))
    }
}

export function ClearNotifications() {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.ClearNotifications())
    };
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
