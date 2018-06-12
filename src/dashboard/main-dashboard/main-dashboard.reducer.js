
const CLEAN_FUNCTION = 'CLEAN_FUNCTION'

export function cleanFunction() {
    return (dispatch) => {
        dispatch({
            type: CLEAN_FUNCTION
        })
    }
}

const ACTION_HANDLERS = {
    [CLEAN_FUNCTION]: (state, action) => {
        return Object.assign({}, state)
    }
}
const initialState = {}
export default function MainDashboardReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
