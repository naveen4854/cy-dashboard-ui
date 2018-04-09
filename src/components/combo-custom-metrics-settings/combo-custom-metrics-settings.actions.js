import { ResponseStatusEnum, StatisticCategoryEnum, WidgetTypeEnum } from "../../shared/enums";
import { WidgetData } from "../../shared/lib";

import * as dataMetricsService from '../data-metrics/data-metrics-service';
import { getWidgetByEnum } from "../../shared/lib/widget-data";
import { getRandom } from "../../utilities/utils";
import { UPDATE_COMBO_CUSTOM_QUERY, TOGGLE_EXPAND_COMBO_CUSTOM_QUERY, UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS, UPDATE_COMBO_CUSTOM_DISPLAY_FORMATS, UPDATE_CUSTOM_COMBO_COLUMNS, TOGGLE_EXPAND_ADD_COLUMN } from "./combo-custom-metrics-settings.constants";

export function initiateComboCustomSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);

        let displayFormatOptions = getState().comboCustomSettings.displayFormatOptions;
        if (!displayFormatOptions || displayFormatOptions.length == 0)
            dataMetricsService.getDisplayformats(StatisticCategoryEnum.Custom).then(function (response) {
                if (response.status === 200) {
                    const displayFormatOptions = _.map(response.data, (item) => {
                        return {
                            value: item.DisplayFormatId,
                            id: item.DisplayFormatId,
                            label: item.DisplayFormatName
                        }
                    })
                    dispatch({
                        type: UPDATE_COMBO_CUSTOM_DISPLAY_FORMATS,
                        displayFormatOptions: displayFormatOptions
                    })
                }
            });

        let appliedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory
        if (appliedStatisticCategory == StatisticCategoryEnum.Custom)
            dispatch({
                // type: DEFAULT_REALTIME_METRICS,
                // selectedGroup: currentWidget.appliedSettings.dataMetrics.group || {},
                // selectedItem: currentWidget.appliedSettings.dataMetrics.item || {},
                // selectedFunction: currentWidget.appliedSettings.dataMetrics.func || {},
                // selectedDisplayFormat: currentWidget.appliedSettings.dataMetrics.displayFormat || {}
            })
    }
}

export function updateCustomQuery(query) {
    return {
        type: UPDATE_COMBO_CUSTOM_QUERY,
        query
    }
}

export function loadColumns() {
    return (dispatch, getState) => {
        let query = getState().comboCustomSettings.query;
        if (!query)
            return

        // clear columns before validating new query
        // dispatch({
        //     type: UPDATE_COLUMNS,
        //     allColumnOptions: [],
        //     query: ''
        // })

        dispatch(getState().notificationStore.clearNotifications());
        dispatch(getState().spinnerStore.BeginTask());
        dataMetricsService.validateQuery(query).then((response) => {
            dispatch(getState().spinnerStore.EndTask());
            if (response.data && response.data.Status) {
                dataMetricsService.loadColumns(query).then(function (response) {
                    if (response.status === 200) {
                        let columnOptions = _.map(response.data, (item) => {
                            return {
                                label: item.ColumnName,
                                value: item.Id,
                                type: item.DataTypeName
                            }
                        });

                        dispatch({
                            type: UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS,
                            columnOptions
                        })
                    }
                })
            }
            else {
                return dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Error))
            }
        }).catch((error) => {
            dispatch(getState().notificationStore.notify(error.response.data.Messages, ResponseStatusEnum.Error));
            dispatch(getState().spinnerStore.EndTask());
        })
    }
}

export function toggleExpandQuery() {
    return (dispatch, getState) => {
        let isCustomQueryExpanded = getState().comboCustomSettings.isCustomQueryExpanded
        return {
            type: TOGGLE_EXPAND_COMBO_CUSTOM_QUERY,
            isCustomQueryExpanded: !isCustomQueryExpanded
        }
    }
}

export function updateCustomComboColumn(selectedColumn) {
    return (dispatch, getState) => {
        let columns = getState().comboCustomSettings.columns;

        let updatedColumns = _.map(columns, (column) => {
            if (column.id == selectedColumn.id) {
                return {
                    ...column,
                    ...selectedColumn
                }
            }
            return column
        })

        dispatch({
            type: UPDATE_CUSTOM_COMBO_COLUMNS,
            columns: updatedColumns
        })
    }
}

export function removeCustomComboColumn(columnId) {
    return (dispatch, getState) => {
        let columns = getState().comboCustomSettings.columns;

        let updatedColumns = _.filter(columns, (column) => column.id != columnId);
        debugger
        dispatch({
            type: UPDATE_CUSTOM_COMBO_COLUMNS,
            columns: updatedColumns
        })
    }
}

export function addCustomColumn() {
    return (dispatch, getState) => {
        let columns = getState().comboCustomSettings.columns;
        let newColumn = {
            id: getRandom(),
            expanded: true,
            selectedColumn: {},
            displayFormat: {},
            displayName: '',
            isSummary: false,
            showZeroValues: false,
            dateFormat: undefined,
            timeFormat: undefined,
            hoursFormat: undefined,

        };
        columns.splice(columns.length, 0, newColumn);
        dispatch({
            type: UPDATE_CUSTOM_COMBO_COLUMNS,
            columns
        })
    }
}
export function toggleAddColumn() {
    return (dispatch, getState) => {
        let addColumnExpanded = getState().comboCustomSettings.addColumnExpanded
        return {
            type: TOGGLE_EXPAND_ADD_COLUMN,
            addColumnExpanded: !addColumnExpanded
        }
    }
}

export function SaveComboCustomMetricsAction(dataMetrics, widgetId) {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.ClearNotifications());
        let matrix = [];
        let headers = [];
        let statisticCategory = dataMetrics.statisticCategory;
        let levels = dataMetrics.levels;
        let query = dataMetrics.query;
        const combo = _.find(getState().newdashboard.widgets, (w) => w.id === widgetId);
        const existedMatrix = combo ? combo.matrix : [];
        if (levels.length > 0) {
            _.map(levels, (level) => {
                let ecHeader = _.find(existedMatrix[0], mat => mat.id == level.column.value);
                if (ecHeader) {
                    headers.push(dashboardUtils.MappingCustomMatrixHeaders(ecHeader, level));
                }
                else {
                    let cHeader = WidgetData.GetWidget(WidgetType.Box, true, 0);
                    cHeader.isComboWidget = true;
                    cHeader.comboId = widgetId;
                    headers.push(dashboardUtils.MappingCustomMatrixHeaders(cHeader, level));
                }
            });
        } else {
            _.map(dataMetrics.columnOptions, (option) => {
                let cHeader = WidgetData.GetWidget(WidgetType.Box, true, 0);
                cHeader.displayValue = option.label;
                cHeader.isComboWidget = true;
                cHeader.comboId = widgetId;
                cHeader.column = option.label;
                cHeader.id = option.value;
                headers.push(cHeader);

            });
        }
        matrix[0] = headers;

        dispatch({
            type: SAVE_COMBO_CUSTOM_METRICS,
            statisticCategory,
            levels,
            widgetId,
            matrix,
            query
        });
        dispatch(getState().newdashboard.SetUpdateTimeAction());

    }
}