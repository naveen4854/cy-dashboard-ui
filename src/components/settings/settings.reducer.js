import { WidgetTypeEnum } from "../../shared/enums";

export const TOGGLE_SETTINGS_PANEL = "TOGGLE_SETTINGS_PANEL"

export const ACTION_HANDLERS = {
    [TOGGLE_SETTINGS_PANEL]: (state, action) => {
        return Object.assign({}, state, {
            widgetId: action.widgetId,
            widgetType: action.widgetType,
            showPanel: !(state.showPanel && state.widgetId == action.widgetId)
        })
    }
}

const initialState = {
    widgetId: 1,
    widgetType: WidgetTypeEnum.Box,
    showPanel: false
};

export default function SettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}