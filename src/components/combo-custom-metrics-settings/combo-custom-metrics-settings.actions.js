import { ResponseStatusEnum, StatisticCategoryEnum, WidgetTypeEnum } from "../../shared/enums";
import { WidgetData } from "../../shared/lib";

import * as dataMetricsService from '../data-metrics/data-metrics-service';
import { getWidgetByEnum } from "../../shared/lib/widget-data";
import { getRandom } from "../../utilities/utils";
import { UPDATE_COMBO_CUSTOM_QUERY, TOGGLE_EXPAND_COMBO_CUSTOM_QUERY, UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS } from "./combo-custom-metrics-settings.constants";

export function initiateComboCustomSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);

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
            debugger
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
    return {
        type: TOGGLE_EXPAND_COMBO_CUSTOM_QUERY
    }
}