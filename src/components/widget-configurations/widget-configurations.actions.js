import { UPDATE_CONFIGURATIONS_WIDGET, TOGGLE_CONFIGURATIONS_PANEL, DEFAULT_REFRESH_INTERVAL, TOP_TAB_CHANGE_EVENT } from "./widget-configurations.constants";
import { DashboardUtilities } from "../../shared/lib";
import { ResponseStatusEnum } from "../../shared/enums";
import * as widgetService from './widget-configurations.service';
import * as dashboardService from '../../dashboard/dashboard-service';

export function updateConfigurationsWidget(updatedWidget) {
    return (dispatch, getState) => {
        if (updatedWidget.id == getState().configurations.widget.id) {
            dispatch({
                type: UPDATE_CONFIGURATIONS_WIDGET,
                widget: updatedWidget
            })
        }
    }
}

export function closeConfigurations() {
    return (dispatch, getState) => {
        dispatch(getState().configurations.toggleSettingsMenu())
    }
}

export function previewWidget(widget) {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.clearNotifications());
        const widgetData = DashboardUtilities.WidgetMapper(widget, getState().dataMetrics.dataMetricsMetadata);
        dispatch(getState().spinnerStore.BeginTask());
        widgetService.getWidgetPreviewData(widgetData).then(function (response) {
            dispatch(getState().spinnerStore.EndTask());
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
            dispatch(getState().spinnerStore.EndTask());
        });
    }
}

export function previewWidgetInLive(currentWidgetId, refreshInterval) {
    return (dispatch, getState) => {
        let setTimeoutId = setTimeout(() => {
            let currentWidget = _.find(getState().dashboard.widgets, (e) => e.id == currentWidgetId);
            const widget = DashboardUtilities.WidgetMapper(_.cloneDeep(currentWidget), getState().dataMetrics.dataMetricsMetadata);
            let dashboardId = getState().dashboard.Id;
            widget.isLive = true;
            widgetService.getWidgetPreviewData(widget, dashboardId).then(function (response) {
                if (response.status === 200) {
                    if (widget) {
                        dispatch(getState().notificationStore.clearNotifications());
                        let updatedWidget = DashboardUtilities.WidgetDataMapper(currentWidget, response.data)
                        updatedWidget = {
                            ...updatedWidget,
                            previousData: response.data
                        }
                        dispatch(getState().dashboard.updateWidget(updatedWidget));
                    }
                    let nextRefreshInterval = currentWidget.refreshInterval; // can be changed based on throttling
                    if (nextRefreshInterval > 0) {
                        dispatch(getState().configurations.previewWidgetInLive(currentWidgetId, nextRefreshInterval))
                    }
                }
            }).catch((error) => {
                dispatch(getState().notificationStore.notify(error.response.data.Messages, ResponseStatusEnum.Error));
            });
        }, refreshInterval * 1000);
        dispatch(getState().widgetResults.updateRefreshingWidgets(currentWidgetId, setTimeoutId));
    }
}

export function getDefaultRefreshInterval() {
    return (dispatch, getState) => {
        dashboardService.getDefaultRefreshInterval().then((response) => {
            dispatch({
                type: DEFAULT_REFRESH_INTERVAL,
                interval: response.data
            })
        });
    }
}
export function tabsChange(selectedTab) {
    return {
        type: TOP_TAB_CHANGE_EVENT,
        selectedTab: selectedTab
    };
}
