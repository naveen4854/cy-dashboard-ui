import { UPDATE_REFRESHING_WIDGETS } from "./widget-results.constants";
import { updateRefreshingWidgets } from "./widget-results.actions";


export const ACTION_HANDLERS = {
    [UPDATE_REFRESHING_WIDGETS]: (state, action) => {
        return Object.assign({}, state, {
            refreshingWidgets: action.refreshingWidgets
        })
    },
}

export const initialState = {
    refreshingWidgets: [], //{ widgetId: 'i', id:1 }
    updateRefreshingWidgets
};

export default function WidgetResultsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}