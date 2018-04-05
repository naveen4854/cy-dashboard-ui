import { UPDATE_DASHBOARD_MODE, UPDATE_DASHBOARD_WIDGETS, UPDATE_DASHBOARD_WIDGET, UPDATE_DRAGGABLE } from "./dashboard.constants";
import * as dashboardService from './dashboard-service';
import * as dataMetricsService from '../components/data-metrics/data-metrics-service'
import { DashboardModeEnum, WidgetTypeEnum } from "../shared/enums";
import { DashboardUtilities } from "../shared/lib";


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

export function getDashboardById(dashboardId) {
    {
        return (dispatch, getState) => {
            let isEditMode = getState().dashboard.mode == DashboardModeEnum.Edit ? true : false;
            dashboardService.getDashboardById(dashboardId, isEditMode).then((response) => {
                if (response.status === 200) {
                    let dashboard = response.data;

                    //getState().dataMetrics.getMetaDataAction(WidgetType.Box);

                    //var datametricMetadata = getState().dataMetrics.datametricMetadata;

                    dataMetricsService.getStatisticCategories().then(function (response) {
                        if (response.status === 200) {
                            const statisticCategories = response.data;
                            const statisticCategoryOptions =
                                _.map(_.filter(statisticCategories, x => x.WidgetType === WidgetTypeEnum.Box), (obj) => {
                                    return {
                                        label: obj.StatisticCategoryName,
                                        value: obj.StatisticCategory
                                    };
                                });
                            dataMetricsService.getStatisticGroups().then(function (response) {
                                if (response.status === 200) {
                                    const datametricsMetaData = _.map(response.data, (obj) => {
                                        return {
                                            StatisticGroupId: obj.StatisticGroupId,
                                            StatisticGroup: obj.StatisticGroup,
                                            StatisticItemId: obj.StatisticItemId,
                                            StatisticItem: obj.StatisticItem,
                                            StatisticFunctionId: obj.StatisticFunctionId,
                                            StatisticFunction: obj.StatisticFunction,
                                            DisplayFormatId: obj.DisplayFormatId,
                                            DisplayFormat: obj.DisplayFormat,
                                            StatisticCategory: obj.StatisticCategory,
                                            WidgetType: obj.WidgetType,
                                            AllowMultiSelect: obj.AllowMultiSelect,
                                            IsDrillDownFilter: obj.IsDrillDownFilter,
                                            Id: obj.Id,
                                        };
                                    });

                                    const dashboardData = DashboardUtilities.mapDashboardFromServer(dashboard, datametricsMetaData, true);
                                    debugger;
                                    dispatch(getState().dashboard.updateWidgets(dashboardData.widgets));

                                }
                            });
                        }
                    });
                }
            })
        }
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

        let updatedWidget = { ...currentWidget, width, height };
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
        dispatch({
            type: UPDATE_DRAGGABLE,
            draggable
        })
    }
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