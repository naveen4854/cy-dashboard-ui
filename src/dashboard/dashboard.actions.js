
import { UPDATE_DASHBOARD_MODE, UPDATE_DASHBOARD_WIDGETS, UPDATE_DASHBOARD_WIDGET, UPDATE_DRAGGABLE, UPDATE_DASHBOARD, UPDATE_SHOW_ICONS, UPDATE_DASHBOARD_PROPERTY } from "./dashboard.constants";
import * as dashboardService from './dashboard-service';
import * as dataMetricsService from '../components/data-metrics/data-metrics-service'
import { DashboardModeEnum, WidgetTypeEnum } from "../shared/enums";
import { DashboardUtilities } from "../shared/lib";
import { dashboardInitialState } from "./dashboard.reducer";


export function PreviewActionPicture(dashboardId, widgetid) {
    return (dispatch, getState) => {
        dashboardService.viewWidgetData(dashboardId, widgetid).then((response) => {
            if (response.status === 200) {
                //TODO: find a better way
                // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetid);
                // widget.picturePath = response.data.pblob,
                //     widget.pictureStretch = response.data.wps == 1 ? { value: PictureStretchEnum.ActualSize, label: 'Actual Size' } : { value: PictureStretchEnum.Fill, label: 'Fill' };
                // dispatch({
                //     type: UPDATE_WIDGET,
                //     widget
                // });
            }
        });
    }
}

export function updateDashboardMode(mode) {
    return {
        type: UPDATE_DASHBOARD_MODE,
        mode
    };
}
export function updateShowIcons(mode) {
    return {
        type: UPDATE_SHOW_ICONS,
        showIcons: (mode == DashboardModeEnum.New || mode == DashboardModeEnum.Edit)
    };
}

export function getDashboardById(dashboardId) {
    return (dispatch, getState) => {
        let dataMetricsMetadata = getState().dataMetrics.dataMetricsMetadata;
        let isEditMode = getState().dashboard.mode == DashboardModeEnum.Edit ? true : false;
        let currentDashboardId = getState().dashboard.Id;
        if (dashboardId && dashboardId != currentDashboardId)
            dashboardService.getDashboardById(dashboardId, isEditMode).then((response) => {
                let dashboard = response.data;
                const dashboardData = DashboardUtilities.mapDashboardFromServer(dashboard, dataMetricsMetadata, true);
                dispatch(getState().dashboard.updateDashboard(dashboardData));
            })
    }
}

export function updateWidgets(widgets) {
    return {
        type: UPDATE_DASHBOARD_WIDGETS,
        widgets
    };
}

export function updateWidget(widget) {
    return {
        type: UPDATE_DASHBOARD_WIDGET,
        widget: widget
    }
}

export function toggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        dispatch(getState().configurations.toggleSettingsMenu(widget))
    }
}

export function updateWidgetZIndex(currentWidget) {
    return (dispatch, getState) => {
        let allWidgets = getState().dashboard.widgets
        let updatedWidget = { ...currentWidget, z: allWidgets.length }

        let updatedWidgets = _.map(allWidgets, (widget) => {
            if (widget.id == currentWidget.id)
                return updatedWidget;

            if (widget.z > currentWidget.z)
                return { ...widget, z: widget.z - 1 };

            return widget;
        })

        dispatch({
            type: UPDATE_DASHBOARD_WIDGETS,
            widgets: updatedWidgets
        })

        dispatch(getState().configurations.updateConfigurationsWidget(updatedWidget))
    }
}

export function updateWidgetPosition(x, y, currentWidget) {
    return (dispatch, getState) => {
        let allWidgets = getState().dashboard.widgets;

        let updatedWidget = { ...currentWidget, x, y };
        let updatedWidgets = _.map(allWidgets, (widget) => {
            if (widget.id == currentWidget.id)
                return updatedWidget

            return widget;
        });

        dispatch({
            type: UPDATE_DASHBOARD_WIDGETS,
            widgets: updatedWidgets
        });
        dispatch(getState().configurations.updateConfigurationsWidget(updatedWidget))
    }
}

export function updateWidgetSize(width, height, currentWidget) {
    return (dispatch, getState) => {
        let allWidgets = getState().dashboard.widgets;
        let newMatrix = [];
        if (currentWidget.widgetType == WidgetTypeEnum.Combo)
            newMatrix = _.map(currentWidget.matrix, (row) => {
                return _.map(row, (cell) => {
                    return {
                        ...cell,
                        height: cell.height / currentWidget.height * height,
                        width: cell.width / currentWidget.width * width
                    }
                })
            })

        let updatedWidget = { ...currentWidget, matrix: newMatrix, width, height };
        let updatedWidgets = _.map(allWidgets, (widget) => {
            if (widget.id == currentWidget.id)
                return updatedWidget

            return widget;
        })

        dispatch({
            type: UPDATE_DASHBOARD_WIDGETS,
            widgets: updatedWidgets
        })

        dispatch(getState().configurations.updateConfigurationsWidget(updatedWidget))
    }
}

export function updateDraggable(draggable) {
    return (dispatch, getState) => {
        // dispatch({
        //     type: UPDATE_DRAGGABLE,
        //     draggable
        // })
    }
}

export function updateDashboard(dashboard) {
    return {
        type: UPDATE_DASHBOARD,
        dashboard
    };
}
export function updateComboMatrix(comboWidgetId, columnIndex, rowIndex, delta) {
    return (dispatch, getState) => {
        let widget = _.find(getState().dashboard.widgets, (widget) => widget.id == comboWidgetId)
        let newMatrix = _.map(widget.matrix, (row, index) => {
            if (columnIndex == 0 && rowIndex == 0) {
                let _rIndex = index
                return _.map(row, (cell, index) => {
                    if (index == columnIndex && _rIndex == rowIndex)
                        return {
                            ...cell,
                            width: cell.width + delta.width,
                            height: cell.height + delta.height,
                        };
                    if (columnIndex == index)
                        return {
                            ...cell,
                            width: cell.width + delta.width,
                        }
                    if (_rIndex == rowIndex)
                        return {
                            ...cell,
                            height: cell.height + delta.height,
                        }
                    return cell;
                })
            }
            if (columnIndex == 0) {
                if (rowIndex != index)
                    return row
                return _.map(row, (cell) => {
                    return {
                        ...cell,
                        height: cell.height + delta.height,
                    }
                })
            }

            if (rowIndex == 0) {
                return _.map(row, (cell, index) => {
                    if (columnIndex != index)
                        return cell

                    return {
                        ...cell,
                        width: cell.width + delta.width,
                    }
                })
            }

            return row
        });
        let updatedWidget = { ...widget, matrix: newMatrix }
        dispatch({
            type: UPDATE_DASHBOARD_WIDGET,
            widget: updatedWidget
        })
    }
}

export function pullWidget(dashboardId, widgetId, refreshInterval) {
    return (dispatch, getState) => {
        // let refreshInterval = refreshValue;

        let setTimeoutId = setTimeout(() => {
            dashboardService.viewWidgetData(dashboardId, widgetId, {}).then(response => {
                let widget = _.find(getState().dashboard.widgets, (w) => w.id == widgetId);
                if (widget) {
                    let updatedWidget = DashboardUtilities.WidgetDataMapper(widget, response.data)
                    updatedWidget = {
                        ...updatedWidget,
                        previousData:  response.data
                    }
                    dispatch(getState().dashboard.updateWidget(updatedWidget));
                }
                let nextRefreshInterval = refreshInterval; // can be changed based on throttling
                if (nextRefreshInterval > 0) {
                    dispatch(getState().dashboard.pullWidget(dashboardId, widgetId, nextRefreshInterval))
                }
            }).catch((err) => {
                let nextRefreshInterval = refreshInterval;
                if (nextRefreshInterval > 0) {
                    dispatch(getState().dashboard.pullWidget(dashboardId, widgetId, nextRefreshInterval));
                }
            });
        }, refreshInterval * 1000);
        dispatch(getState().widgetResults.updateRefreshingWidgets(widgetId, setTimeoutId));
    }
}

export function deleteWidgetAction(widgetId) {
    return (dispatch, getState) => {

        let updatedWidgets = _.filter(getState().dashboard.widgets, (widget) => widget.id !== widgetId);
        if (widgetId == getState().configurations.widget.id) {
            dispatch(getState().configurations.closeConfigurations());
        }
        dispatch({
            type: UPDATE_DASHBOARD_WIDGETS,
            widgets: updatedWidgets
        });

    }
}
export function resetDashboard() {
    return (dispatch, getState) => {
        dispatch(getState().dashboard.updateDashboard(_.cloneDeep(dashboardInitialState)));
    }
}

export function deleteDashboard(dashboardId) {
    return (dispatch, getState) => {
        dispatch(getState().spinnerStore.BeginTask());
        dashboardService.deleteDashboard(dashboardId).then((response) => {
            dispatch(getState().spinnerStore.EndTask());
            if (response.data.Status === true) {
                dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Success));

                dispatch(GetDashboardsList());
            }
            else {
                dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Error))
            }
        });
    }
}

// export function clearRefreshInterval() {
//     return (dispatch, getState) => {

//         _.each(getState().dashboard.refreshingWidgets, (refreshIntervalId) => {
//             clearInterval(refreshIntervalId.id);
//         });
//         dispatch({
//             type: UPDATE_DASHBOARD_PROPERTY,
//             key: 'refreshingWidgets',
//             value: []
//         });
//     }
// }
