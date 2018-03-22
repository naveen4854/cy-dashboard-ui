import { WidgetTypeEnum } from "../../shared/enums";
import _ from 'lodash';

export const TOGGLE_SETTINGS_PANEL = "TOGGLE_SETTINGS_PANEL"

export function ToggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        // check if its same widget and clean datametrics 
        //   dispatch(getState().dataMetrics.clearSelectedDM())

        let currentWidget = _.cloneDeep(widget);
        let showPanel = !(getState().settings.showPanel && getState().settings.widgetId == currentWidget.id)
        dispatch({
            type: TOGGLE_SETTINGS_PANEL,
            widget: currentWidget,
            widgetId: currentWidget.id,
            widgetType: currentWidget.widgetType,
            showPanel
        })

        if (showPanel)
            if (currentWidget.widgetType != WidgetTypeEnum.Clock) {
                dispatch(getState().dataMetrics.initializeStatisticMetadata())
            } else {
                // dispatch(getState().clock.initializeClocksettings(currentWidget))
            }
    }
}


export const ACTION_HANDLERS = {
    [TOGGLE_SETTINGS_PANEL]: (state, action) => {
        return Object.assign({}, state, {
            widget: _.cloneDeep(action.widget),
            widgetId: action.widgetId,
            widgetType: action.widgetType,
            showPanel: action.showPanel
        })
    }
}

const initialState = {
    widgetId: 1,
    widgetType: WidgetTypeEnum.Box,
    showPanel: false,
    ToggleSettingsMenu
};

export default function SettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}