import { WidgetTypeEnum } from "../../shared/enums";
import _ from 'lodash';
import { UPDATE_WIDGET } from "../../dashboard/dashboard.reducer";
import { DashboardUtilities } from "../../shared/lib";
import * as widgetService  from './widget-configurations.service';

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
            if (currentWidget.widgetType != WidgetTypeEnum.Clock) {
                dispatch(getState().dataMetrics.initializeStatisticMetadata());
                dispatch(getState().styles.initializeStyles())
                dispatch(getState().threshold.initializeThresholddata())
                // dispatch(getState().dataMetrics.initi)
            } else {
                // dispatch(getState().clock.initializeClocksettings(currentWidget))
            }
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
        dispatch(getState().configurations.PreviewAction(currentWidget));

    }
}
export function PreviewAction(inputWidget) {
    return (dispatch, getState) => {
        debugger;
        dispatch(getState().notificationStore.ClearNotifications());
        const widgetData = DashboardUtilities.WidgetMapper(inputWidget, getState().dataMetrics.datametricsMetadata);
        widgetService.getWidgetPreviewData(widgetData).then(function (response) {
            if (response.status === 200) {
                debugger;
                const widget = _.find(getState().newdashboard.widgets, (widget) => widget.id == response.data.wrid);
                // TODO: change the logic according to the data
                if (widget) {
                    dashboardUtils.widgetDataMapper(widget, response.data)

                    const { widgetBody } = widget || {};
                    if (widgetBody) {
                        widget.appliedBackgroundColor = response.data.wrth && response.data.wrth.thc ? response.data.wrth.thc : widgetBody.backgroundColor;
                    }
                }
                dispatch({
                    type: PREVIEW_WIDGET,
                    widget
                });
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
            widget: _.cloneDeep(action.widget)
        })
    }
}

const initialState = {
    widgetId: 1,
    widgetType: WidgetTypeEnum.Box,
    showPanel: false,
    ToggleSettingsMenu,
    updateDashboardWidget,
    PreviewAction
};

export default function WidgetConfigurationsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}