import { ResponseStatusEnum, StatisticCategoryEnum, WidgetTypeEnum } from "../../shared/enums";
import { WidgetData } from "../../shared/lib";

import * as dataMetricsService from '../data-metrics/data-metrics-service';
import { getWidgetByEnum } from "../../shared/lib/widget-data";
import { getRandom } from "../../utilities/utils";
import { UPDATE_COMBO_CUSTOM_QUERY, TOGGLE_EXPAND_COMBO_CUSTOM_QUERY, UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS, UPDATE_COMBO_CUSTOM_DISPLAY_FORMATS, UPDATE_CUSTOM_COMBO_COLUMNS, TOGGLE_EXPAND_ADD_COLUMN, DEFAULT_COMBO_CUSTOM_METRICS } from "./combo-custom-metrics-settings.constants";
import { comboCustomInitialState } from "./combo-custom-metrics-settings.reducer";
import { CLEAR_SELECTED_COMBO_CUSTOM_SETTINGS } from "../combo-realtime-metrics-settings/combo-realtime-metrics-settings.constants";

export function initiateComboCustomSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);

        let displayFormatOptions = getState().comboCustomSettings.displayFormatOptions;
        // TODO: move to on enter route hook
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
        if (appliedStatisticCategory == StatisticCategoryEnum.Custom) {
            let datametrics = currentWidget.appliedSettings.dataMetrics;
            dispatch({
                type: DEFAULT_COMBO_CUSTOM_METRICS,
                query: datametrics.query || '',
                columns: datametrics.columns || [],
            })

            dispatch(getState().comboCustomSettings.loadColumns())
        }
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

        // TODO: clear columns before validating new query
        // dispatch({
        //     type: UPDATE_COLUMNS,
        //     allColumnOptions: [],
        //     query: ''
        // })

        //TODO: make one validatequery and loadcolumns functions 
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
        dispatch({
            type: TOGGLE_EXPAND_COMBO_CUSTOM_QUERY,
            isCustomQueryExpanded: !isCustomQueryExpanded
        })
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

export function updateCustomComboColumns(columns) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CUSTOM_COMBO_COLUMNS,
            columns: columns
        })
    }
}

export function removeCustomComboColumn(columnId) {
    return (dispatch, getState) => {
        let columns = getState().comboCustomSettings.columns;

        let updatedColumns = _.filter(columns, (column) => column.id != columnId);
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
        let newColumns = [...columns]
        dispatch({
            type: UPDATE_CUSTOM_COMBO_COLUMNS,
            columns: newColumns
        })
    }
}
export function toggleAddColumn() {
    return (dispatch, getState) => {
        let addColumnExpanded = getState().comboCustomSettings.addColumnExpanded
        dispatch({
            type: TOGGLE_EXPAND_ADD_COLUMN,
            addColumnExpanded: !addColumnExpanded
        })
    }
}

export function saveComboCustomMetrics() {
    return (dispatch, getState) => {
        dispatch(getState().dataMetrics.saveComboCustomMetricsAction())
    }
}

export function clearComboCustomSettings() {
    return (dispatch, getState) => {
        let displayFormatOptions = getState().comboCustomSettings.displayFormatOptions;
        //TODO: figure out issue with this initial state
        let customSettings = { ...comboCustomInitialState, displayFormatOptions, columns: [] }
        dispatch({
            type: CLEAR_SELECTED_COMBO_CUSTOM_SETTINGS,
            customSettings
        })
    }
}