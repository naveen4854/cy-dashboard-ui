
const ADD_WIDGET = 'ADD_WIDGET'

export function AddWidget(widgetType) {
    return {
        type: ADD_WIDGET
    }
}

export const ACTION_HANDLERS = {
    [ADD_WIDGET]: (state, action) => {
        state.widgets = state.widgets.concat([Date.now()])
        return Object.assign({}, state);
    }
}

const initialState = {
    widgets: []
};

export default function DashboardReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}