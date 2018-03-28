import { SET_CYREPORT_STATISTIC_GROUPS, UPDATE_CYREPORT_SELECTED_GROUP, UPDATE_CYREPORT_ITEMS, SET_CYREPORT_ITEM, UPDATE_CYREPORT_FUNCTIONS, UPDATE_CYREPORT_SELECTED_DISPLAY_FORMAT, UPDATE_CYREPORT_SELECTED_FUNCTION, DEFAULT_CYREPORT_METRICS, UPDATE_CYREPORT_DISPLAY_FORMATS, cyReportInitialState, CLEAR_SELECTED_CYREPORT_SETTINGS } from "./cy-report-settings.reducer";
import { StatisticCategoryEnum, WidgetTypeEnum } from "../../shared/enums";
import * as dataMetricsService from '../data-metrics/data-metrics-service';

export function initiateCyReportSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        let selectedStatisticCategory = getState().dataMetrics.statisticCategory;
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;

        let groupOptions = getState().cyReportSettings.groupOptions;
        if (!groupOptions || groupOptions.length == 0) {
            let _grpOptions = _.uniqBy(_.map(_.filter(datametricsMetadata, metric => (metric.StatisticCategory === StatisticCategoryEnum.CyReport &&
                metric.WidgetType === currentWidget.widgetType)), (obj) => {
                    return {
                        id: obj.StatisticGroupId,
                        label: obj.StatisticGroup,
                        value: obj.Id
                    };
                }), 'id');

            dispatch({
                type: SET_CYREPORT_STATISTIC_GROUPS,
                groupOptions: _grpOptions
            });
        }
        
        let appliedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory
        if (appliedStatisticCategory == StatisticCategoryEnum.CyReport)
            dispatch({
                type: DEFAULT_CYREPORT_METRICS,
                selectedGroup: currentWidget.appliedSettings.dataMetrics.group || {},
                selectedItem: currentWidget.appliedSettings.dataMetrics.item || {},
                selectedFunction: currentWidget.appliedSettings.dataMetrics.func || {},
                selectedDisplayFormat: currentWidget.appliedSettings.dataMetrics.displayFormat || {}
            })
    }
}

export function setSelectedGroupValue(selectedGroup) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CYREPORT_SELECTED_GROUP,
            selectedGroup
        });
    }
}

export function setStatisticsItems() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let selectedGroup = getState().cyReportSettings.selectedGroup;

        let allData = getState().dataMetrics.datametricsMetadata;
        if (currentWidget.widgetType == WidgetTypeEnum.Bar || currentWidget.widgetType == WidgetTypeEnum.Pie) {
            allData = _.filter(allData, data => !data.IsDrillDownFilter)
        };
        let availableItems = _.uniqBy(_.map(_.filter(allData,
            metric => metric.StatisticGroupId === selectedGroup.id &&
                metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
                metric.WidgetType === currentWidget.widgetType && !metric.IsFilterId),
            item => {
                return {
                    id: item.StatisticItemId,
                    label: item.StatisticItem,
                    value: item.Id
                }
            }), 'id');

        dispatch({
            type: UPDATE_CYREPORT_ITEMS,
            itemOptions: availableItems || []
        });
    }
}

export function setSelectedSatisticItem(selectedItem) {
    return {
        type: SET_CYREPORT_ITEM,
        selectedItem
    }
}

export function setStatisticFunctions() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let dataMetrics = getState().dataMetrics;
        let selectedItem = getState().cyReportSettings.selectedItem;
        let _funcOptions = _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricsMetadata,
            metric =>
                metric.StatisticItemId === selectedItem.id &&
                metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
                metric.WidgetType === currentWidget.widgetType),
            item => {
                return {
                    id: item.StatisticFunctionId,
                    label: item.StatisticFunction,
                    value: item.Id
                }
            }), 'id');
        dispatch({
            type: UPDATE_CYREPORT_FUNCTIONS,
            functionOptions: _funcOptions
        });
    }
}

export function setSelectedFunction(selectedFunction) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CYREPORT_SELECTED_FUNCTION,
            selectedFunction
        });
    }
}

export function getDisplayFormat() {
    return (dispatch, getState) => {
        let selectedFunction = getState().cyReportSettings.selectedFunction;
        let currentWidget = getState().configurations.widget;
        dispatch({
            type: UPDATE_CYREPORT_DISPLAY_FORMATS,
            displayFormatOptions: _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricsMetadata, metric =>
                (metric.StatisticItemId === getState().cyReportSettings.selectedItem.id &&
                    metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
                    metric.StatisticFunctionId === selectedFunction.id && metric.WidgetType === currentWidget.widgetType)
            ), item => {
                return {
                    id: item.DisplayFormatId,
                    label: item.DisplayFormat,
                    value: item.Id
                }
            }), 'id')
        });
    }
}

export function setSelectedDisplayFormatAction(selectedDisplayFormat) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CYREPORT_SELECTED_DISPLAY_FORMAT,
            selectedDisplayFormat
        });
    }
}

export function SaveCyReportMetrics(dataMetrics) {
    return (dispatch, getState) => {
        dispatch(getState().dataMetrics.saveDataMetrics(dataMetrics));
        dispatch(getState().realTimeSettings.clearRealTimeSettings());
        dispatch(getState().customSettings.clearCustomSettings());
    }
}

export function clearCyReportSettings() {
    return (dispatch, getState) => {
        let groupOptions = getState().cyReportSettings.groupOptions;
        let cyReportSettings = { ...cyReportInitialState, groupOptions }
        dispatch({
            type: CLEAR_SELECTED_CYREPORT_SETTINGS,
            cyReportSettings
        })
    }
}