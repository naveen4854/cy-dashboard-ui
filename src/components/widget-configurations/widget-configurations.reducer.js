import { ResponseStatusEnum, WidgetTypeEnum } from "../../shared/enums";
import _ from 'lodash';
import { UPDATE_DASHBOARD_WIDGET } from "../../dashboard/dashboard.reducer";
import { DashboardUtilities } from "../../shared/lib";
import * as widgetService from './widget-configurations.service';
import { updateConfigurationsWidget, closeConfigurations, previewWidget, previewWidgetInLive, getDefaultRefreshInterval } from './widget-configurations.actions'
import { TOGGLE_CONFIGURATIONS_PANEL, UPDATE_CONFIGURATIONS_WIDGET, SET_METRICS_TAB_VISIBILITY, SET_THRESHOLDS_TAB_VISIBILITY, CLEAR_CONFIGURATIONS, DEFAULT_REFRESH_INTERVAL } from "./widget-configurations.constants";

export function toggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        dispatch(getState().dataMetrics.clearSelectedDM())
        dispatch(getState().threshold.clearThresholds())
        //todo -clear styles.
        let currentWidget = _.cloneDeep(widget);
        let showPanel = currentWidget && !(getState().configurations.showPanel && getState().configurations.widgetId == currentWidget.id)

        let showMetricsTab = currentWidget && !(currentWidget.isComboWidget || currentWidget.widgetType == WidgetTypeEnum.Picture
            || currentWidget.widgetType == WidgetTypeEnum.Text);
        let showThresholdsTab = currentWidget && !(currentWidget.widgetType == WidgetTypeEnum.Picture
            || currentWidget.widgetType == WidgetTypeEnum.Text
            || currentWidget.widgetType == WidgetTypeEnum.Pie
            || currentWidget.widgetType == WidgetTypeEnum.Bar
            || currentWidget.widgetType == WidgetTypeEnum.Combo
            || currentWidget.widgetType == WidgetTypeEnum.Clock);

        if (showPanel) {
            dispatch({
                type: TOGGLE_CONFIGURATIONS_PANEL,
                widget: currentWidget,
                widgetId: currentWidget.id,
                widgetType: currentWidget.widgetType,
                showPanel
            })
            dispatch({
                type: SET_THRESHOLDS_TAB_VISIBILITY,
                showThresholdsTab
            });
            dispatch({
                type: SET_METRICS_TAB_VISIBILITY,
                showMetricsTab
            });

            if (currentWidget.widgetType == WidgetTypeEnum.Clock) {
                dispatch(getState().clockSettings.initializeClocksettings());
            }
            else {
                dispatch(getState().dataMetrics.initializeStatisticMetadata());
            }
            dispatch(getState().styles.initializeStyles())
            dispatch(getState().threshold.initializeThresholddata())
        }
        else {
            let initialState = configurationsInitialState;
            dispatch({
                type: CLEAR_CONFIGURATIONS,
                configurations: configurationsInitialState
            })
        }
    }
}

export function updateDashboardWidget(widget) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CONFIGURATIONS_WIDGET,
            widget: widget
        })
        // if (!widget.isComboWidget)
        dispatch(getState().dashboard.updateWidget(widget));
    }
}

export function applyWidget(widget) {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        if (currentWidget.id == widget.id)
            dispatch({
                type: UPDATE_CONFIGURATIONS_WIDGET,
                widget: widget
            })
        dispatch(getState().dashboard.updateWidget(widget));
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
            widget: { ...action.widget }
        })
    },
    [SET_METRICS_TAB_VISIBILITY]: (state, action) => {
        return Object.assign({}, state, {
            showMetricsTab: action.showMetricsTab
        })
    },
    [SET_THRESHOLDS_TAB_VISIBILITY]: (state, action) => {
        return Object.assign({}, state, {
            showThresholdsTab: action.showThresholdsTab
        })
    },
    [CLEAR_CONFIGURATIONS]: (state, action) => {
        return Object.assign({}, state, action.configurations)
    },
    [DEFAULT_REFRESH_INTERVAL]: (state, action) => {
        return Object.assign({}, state, { defaultRefreshInterval: action.interval })
    },
}

const configurationsInitialState = {
    widget: {},
    widgetId: -1,
    widgetType: WidgetTypeEnum.Box,
    showPanel: false,
    showThresholdsTab: true,
    showMetricsTab: true,
    defaultRefreshInterval: 5,
    toggleSettingsMenu,
    applyWidget,
    previewWidget,
    updateConfigurationsWidget,
    closeConfigurations,
    previewWidgetInLive,
    getDefaultRefreshInterval
};

export default function WidgetConfigurationsReducer(state = _.cloneDeep(configurationsInitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}