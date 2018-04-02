import { WidgetTypeEnum } from "../../shared/enums";
import _ from 'lodash';
import { UPDATE_WIDGET } from "../../dashboard/dashboard.reducer";

export const TOGGLE_CONFIGURATIONS_PANEL = "TOGGLE_CONFIGURATIONS_PANEL"
export const UPDATE_CONFIGURATIONS_WIDGET = "UPDATE_CONFIGURATIONS_WIDGET"

export function ToggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        dispatch(getState().dataMetrics.clearSelectedDM())

        let currentWidget = _.cloneDeep(widget);
        let showPanel = !(getState().configurations.showPanel && getState().configurations.widgetId == currentWidget.id)
        dispatch({
            type: TOGGLE_CONFIGURATIONS_PANEL,
            widget: currentWidget,
            widgetId: currentWidget.id,
            widgetType: currentWidget.widgetType,
            showPanel
        })

        if (showPanel) {
            if (currentWidget.widgetType == WidgetTypeEnum.Clock) {
                dispatch(getState().clockSettings.initializeClocksettings());
            }
            else {
                dispatch(getState().dataMetrics.initializeStatisticMetadata());
            }
            dispatch(getState().styles.initializeStyles())
            dispatch(getState().threshold.initializeThresholddata())
            // dispatch(getState().dataMetrics.initi)
        }
    }
}

export function updateDashboardWidget(currentWidget) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CONFIGURATIONS_WIDGET,
            widget: currentWidget
        })
        dispatch({
            type: UPDATE_WIDGET,
            widget: currentWidget
        });
    }
}
export const ACTION_HANDLERS = {
    [TOGGLE_CONFIGURATIONS_PANEL]: (state, action) => {
        return Object.assign({}, state, {
            widget: _.cloneDeep(action.widget),
            widgetId: action.widgetId,
            widgetType: action.widgetType,
            showPanel: action.showPanel
        })
    },
    [UPDATE_CONFIGURATIONS_WIDGET]: (state, action) => {
        return Object.assign({}, state, {
            widget: _.cloneDeep(action.widget)
        })
    }
}

const initialState = {
    widgetId: 1,
    widgetType: WidgetTypeEnum.Box,
    showPanel: false,
    ToggleSettingsMenu,
    updateDashboardWidget
};

export default function WidgetConfigurationsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}