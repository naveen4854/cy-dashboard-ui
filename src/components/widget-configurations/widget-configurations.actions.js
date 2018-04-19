import { UPDATE_CONFIGURATIONS_WIDGET, TOGGLE_CONFIGURATIONS_PANEL } from "./widget-configurations.constants";
import { DashboardUtilities } from "../../shared/lib";
import { ResponseStatusEnum } from "../../shared/enums";
import * as widgetService from './widget-configurations.service';

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

export function closeConfigurations(closePanel = true) {
    return (dispatch, getState) => {
        dispatch(getState().dataMetrics.clearSelectedDM())
        return dispatch({
            type: TOGGLE_CONFIGURATIONS_PANEL,
            showPanel: !closePanel,
            widget: {}
        })
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