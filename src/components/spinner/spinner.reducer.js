
const LOADER = "LOADER";

export function BeginTask() {
  return (dispatch, getState) => {
    let pendingTasks = getState().spinnerStore.pendingTasks
    pendingTasks = pendingTasks + 1
    dispatch({
      type: LOADER,
      pendingTasks
    });
  }
}

export function EndTask() {
  return (dispatch, getState) => {
    let pendingTasks = getState().spinnerStore.pendingTasks
    pendingTasks = pendingTasks == 0 ? pendingTasks : pendingTasks - 1
    dispatch({
      type: LOADER,
      pendingTasks
    });
  }
}

export function EndAllTasks() {
  return (dispatch, getState) => {
    dispatch({
      type: LOADER,
      pendingTasks: 0
    });
  }
}

export const ACTION_HANDLERS = {
  [LOADER]: (state, action) => {
    return Object.assign({}, state, {
      pendingTasks: action.pendingTasks
    })
  }
}

const initialState = {
  pendingTasks: 0,
  BeginTask,
  EndTask,
  EndAllTasks
};

export default function LoaderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
