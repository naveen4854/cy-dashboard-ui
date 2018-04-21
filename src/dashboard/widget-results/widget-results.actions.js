import { UPDATE_REFRESHING_WIDGETS } from "./widget-results.constants";
import { UPDATE_DASHBOARD_PROPERTY } from "../dashboard.constants";

export function updateRefreshingWidgets(widgetId, setTimeoutId) {
    return (dispatch, getState) => {
        let refreshingWidgetsArray = getState().widgetResults.refreshingWidgets;

        let refreshingWidgetExists = _.find(refreshingWidgetsArray, (each) => each.widgetId == widgetId);

        if (refreshingWidgetExists) {
            let updatedRefreshingWidgets = _.map(refreshingWidgetsArray, (refreshingWidget) => {
                if (refreshingWidget.widgetId == widgetId) {
                    clearInterval(refreshingWidget.id);
                    return {
                        ...refreshingWidget,
                        id: setTimeoutId
                    }
                }
                return refreshingWidget;
            });
            dispatch({
                type: UPDATE_REFRESHING_WIDGETS,
                refreshingWidgets: updatedRefreshingWidgets
            });
        }
        else {
            refreshingWidgetsArray.splice(refreshingWidgetsArray.length, 0, { widgetId: widgetId, id: setTimeoutId })
            dispatch({
                type: UPDATE_REFRESHING_WIDGETS,
                refreshingWidgets: refreshingWidgetsArray
            });
        }
    }
}

export function clearRefreshInterval() {
    return (dispatch, getState) => {

        _.each(getState().widgetResults.refreshingWidgets, (refreshIntervalId) => {
            clearInterval(refreshIntervalId.id);
        });
        dispatch({
            type: UPDATE_REFRESHING_WIDGETS,
            refreshingWidgets: []
        });
    }
}