import React from 'react'
import { push, replace } from 'react-router-redux'
import { browserHistory, Router } from 'react-router'

const initialState = {
  userName: 'naveen'
};

export const ACTION_HANDLERS = {
}

export default function LoginFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
