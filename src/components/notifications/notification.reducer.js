import React from 'react'
import _ from 'lodash';
import { ResponseStatusEnum } from '../../shared/enums'

const SHOW_NOTIFICATIONS = "SHOW_NOTIFICATIONS";
const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

/**
 * notify to user
 * @param {string[] | string} messages
 * @param {ResponseStatusEnum} errorType 
 * @param {boolean} persistMessage 
 */
export function notify(messages, errorType, persistMessage) {
  return (dispatch, getState) => {
    if (!messages)
      return
    let msgArr = []
    if (messages.constructor === Array)
      msgArr = msgArr.concat(messages);
    else
      msgArr.push(messages);
    let messagesConfig = {};
    messagesConfig.messages = _.map(msgArr, (msg) => {
      return {
        displayMessage: msg.Message || msg.displayMessage || msg,
        normalizedMessage: msg.normalizedMessage || msg.NormalizedMessage, params: msg.params,
      }
    });
    messagesConfig.type = errorType || ResponseStatusEnum.Success;
    messagesConfig.persistMessages = persistMessage || false;

    dispatch({
      type: SHOW_NOTIFICATIONS,
      messagesConfiguration: messagesConfig,
      isRtl: getState().localizationStore.isRtl
    });

  }
}

/**
 * 
 * @param {string} message 
 * @param {text:string,handler:function} buttons 
 */
export function custom(message, buttons) {
  return (dispatch, getState) => {
    let messagesConfig = {};
    messagesConfig.message = { displayMessage: message.Message || message, normalizedMessage: message.NormalizedMessage };
    messagesConfig.type = ResponseStatusEnum.Custom;
    messagesConfig.persistMessages = false;

    _.each(buttons, (btn, i) => {
      if (i == 0)
        btn.ok = true;
    })
    messagesConfig.buttons = buttons || [];

    dispatch({
      type: SHOW_NOTIFICATIONS,
      messagesConfiguration: messagesConfig,
      isRtl: getState().localizationStore.isRtl
    });
  }
}

/**
 * 
 * @param {string} message 
 * @param {text:string,handler:function} buttons 
 */
export function confirm(message, buttons) {
  return (dispatch, getState) => {
    let messagesConfig = {};
    messagesConfig.message = { displayMessage: message.Message || message, normalizedMessage: message.NormalizedMessage, params: message.params };
    messagesConfig.type = ResponseStatusEnum.Confirmation;
    messagesConfig.persistMessages = false;
    _.each(buttons, (btn, i) => {
      if (i == 0) {
        btn.ok = true;
        btn.onOk = btn.handler
      }
      if (i == 1) {
        btn.cancel = true;
        btn.onCancel = btn.handler
      }
    })
    messagesConfig.buttons = buttons || [];

    dispatch({
      type: SHOW_NOTIFICATIONS,
      messagesConfiguration: messagesConfig,
      isRtl: getState().localizationStore.isRtl
    });
  }
}

export function clearNotifications() {
  return {
    type: CLEAR_NOTIFICATIONS
  };
}

export const ACTION_HANDLERS = {
  [SHOW_NOTIFICATIONS]: (state, action) => {
    return Object.assign({}, state, {
      id: Date.now() + Math.floor(Math.random() * 10000),
      messages: action.messagesConfiguration.messages || [],
      persistMessages: action.messagesConfiguration.persistMessages,
      type: action.messagesConfiguration.type,
      func: action.messagesConfiguration.func,
      isRtl: action.isRtl,
      buttons: action.messagesConfiguration.buttons || [],
      message: action.messagesConfiguration.message || ''
    })
  },
  [CLEAR_NOTIFICATIONS]: (state, action) => {
    return Object.assign({}, state, {
      type: ResponseStatusEnum.Error,
      messages: [],
      persistMessages: false,
      func: null,
    })
  }
}

const initialState = {
  type: ResponseStatusEnum.Error,
  persistMessages: false,
  buttons: [],
  messages: [],
  message: '',
  isRtl: false,
  id: -1,
  notify,
  clearNotifications,
  custom,
  confirm
};

export default function NotificationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
