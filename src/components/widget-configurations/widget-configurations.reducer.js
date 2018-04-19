import { ResponseStatusEnum, WidgetTypeEnum } from "../../shared/enums";
import _ from 'lodash';
import { UPDATE_DASHBOARD_WIDGET } from "../../dashboard/dashboard.reducer";
import { DashboardUtilities } from "../../shared/lib";
import * as widgetService from './widget-configurations.service';
import { updateConfigurationsWidget, closeConfigurations } from './widget-configurations.actions'
import { TOGGLE_CONFIGURATIONS_PANEL, UPDATE_CONFIGURATIONS_WIDGET, SET_METRICS_TAB_VISIBILITY, SET_THRESHOLDS_TAB_VISIBILITY } from "./widget-configurations.constants";

export function toggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        dispatch(getState().dataMetrics.clearSelectedDM())
        dispatch(getState().threshold.clearThresholds())

        // if (!widget) {
        //     return dispatch({
        //         type: TOGGLE_CONFIGURATIONS_PANEL,
        //         showPanel: false,
        //         widget: {}
        //     })
        // }

        let currentWidget = _.cloneDeep(widget);
        let showPanel = !(getState().configurations.showPanel && getState().configurations.widgetId == currentWidget.id)
        dispatch({
            type: TOGGLE_CONFIGURATIONS_PANEL,
            widget: currentWidget,
            widgetId: currentWidget.id,
            widgetType: currentWidget.widgetType,
            showPanel
        })

        let showMetricsTab = !(currentWidget.isComboWidget || currentWidget.widgetType == WidgetTypeEnum.Picture
            || currentWidget.widgetType == WidgetTypeEnum.Text);
        let showThresholdsTab = !(currentWidget.widgetType == WidgetTypeEnum.Picture
            || currentWidget.widgetType == WidgetTypeEnum.Text
            || currentWidget.widgetType == WidgetTypeEnum.Pie
            || currentWidget.widgetType == WidgetTypeEnum.Bar);

        if (showPanel) {
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

export function previewWidget(widget) {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.clearNotifications());
        const widgetData = DashboardUtilities.WidgetMapper(widget, getState().dataMetrics.dataMetricsMetadata);
        widgetService.getWidgetPreviewData(widgetData).then(function (response) {
            if (response.status === 200) {
                if (widget) {
                    let updatedWidget = DashboardUtilities.WidgetDataMapper(widget, response.data)
                    // const { widgetBody } = updatedWidget || {};
                    // if (widgetBody) {
                    //     updatedWidget.appliedBackgroundColor = response.data.wrth && response.data.wrth.thc ? response.data.wrth.thc : widgetBody.backgroundColor;
                    // }
                    // dispatch(getState().dashboard.updateWidget(widget));
                    dispatch(getState().configurations.applyWidget(updatedWidget));
                }
            }
        }).catch((error) => {
            dispatch(getState().notificationStore.notify(error.response.data.Messages, ResponseStatusEnum.Error));
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
    }
}

const initialState = {
    widget: {},
    widgetId: -1,
    widgetType: WidgetTypeEnum.Box,
    showPanel: false,
    showThresholdsTab: true,
    showMetricsTab: true,
    toggleSettingsMenu,
    applyWidget,
    previewWidget,
    updateConfigurationsWidget,
    closeConfigurations
};

export default function WidgetConfigurationsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}