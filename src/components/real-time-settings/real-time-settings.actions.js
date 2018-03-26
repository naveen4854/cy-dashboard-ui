import { DEFAULT_REALTIME_METRICS, UPDATE_REALTIME_SELECTED_GROUP, UPDATE_REALTIME_METRICS, UPDATE_REALTIME_ITEMS, SET_REALTIME_ITEM, UPDATE_REALTIME_FUNCTIONS, UPDATE_REALTIME_SELECTED_FUNCTION, UPDATE_REALTIME_DISPLAY_FORMATS, UPDATE_REALTIME_SELECTED_DISPLAY_FORMAT, UPDATE_DRILL_DOWN_METADATA, SET_REALTIME_STATISTIC_GROUPS, TOGGLE_DRILL_DOWN, UPDATE_DRILL_DOWN_OPTIONS, realTimeSettingsinitialState, CLEAR_SELECTED_REALTIME_SETTINGS, SET_DRILL_DOWN_DEFAULTED } from "./real-time-settings.reducer";
import { WidgetTypeEnum, StatisticCategoryEnum } from "../../shared/enums";
import * as dataMetricsService from '../data-metrics/data-metrics-service';

export function initiateRealTimeSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        let selectedStatisticCategory = getState().dataMetrics.statisticCategory;
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;

        let _grpOptions = _.uniqBy(_.map(_.filter(datametricsMetadata, metric => (metric.StatisticCategory === StatisticCategoryEnum.RealTime &&
            metric.WidgetType === currentWidget.widgetType)), (obj) => {
                return {
                    id: obj.StatisticGroupId,
                    label: obj.StatisticGroup,
                    value: obj.Id
                };
            }), 'id');

        dispatch({
            type: SET_REALTIME_STATISTIC_GROUPS,
            groupOptions: _grpOptions
        });
        if (selectedStatisticCategory == StatisticCategoryEnum.RealTime)
            dispatch({
                type: DEFAULT_REALTIME_METRICS,
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
            type: UPDATE_REALTIME_SELECTED_GROUP,
            selectedGroup
        });
    }
}

export function setStatisticsItems() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let selectedGroup = getState().realTimeSettings.selectedGroup;

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
            type: UPDATE_REALTIME_ITEMS,
            itemOptions: availableItems || []
        });
    }
}

export function setSelectedSatisticItem(selectedItem) {
    return {
        type: SET_REALTIME_ITEM,
        selectedItem
    }
}

export function setStatisticFunctions() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let dataMetrics = getState().dataMetrics;
        let selectedItem = getState().realTimeSettings.selectedItem;
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
            type: UPDATE_REALTIME_FUNCTIONS,
            functionOptions: _funcOptions
        });
    }
}

export function setSelectedFunction(selectedFunction) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_REALTIME_SELECTED_FUNCTION,
            selectedFunction
        });
    }
}

export function getDisplayFormat() {
    return (dispatch, getState) => {
        let selectedFunction = getState().realTimeSettings.selectedFunction;
        let currentWidget = getState().configurations.widget;
        dispatch({
            type: UPDATE_REALTIME_DISPLAY_FORMATS,
            displayFormatOptions: _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricsMetadata, metric =>
                (metric.StatisticItemId === getState().realTimeSettings.selectedItem.id &&
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
            type: UPDATE_REALTIME_SELECTED_DISPLAY_FORMAT,
            selectedDisplayFormat
        });
    }
}

export function SaveMetrics(dataMetrics) {
    return (dispatch, getState) => {
        // let currentWidget = getState().configurations.widget;
        // let updatedWidget = { ...currentWidget, appliedSettings: { ...currentWidget.appliedSettings, dataMetrics: dataMetrics } }
        // dispatch(getState().configurations.updateDashboardWidget(updatedWidget));
        dispatch(getState().dataMetrics.saveDataMetrics(dataMetrics));

    }
}

export function getDrillDownMetaData(selectedItem) {
    return (dispatch, getState) => {
        if (getState().dataMetrics && getState().dataMetrics.datametricsMetadata) {
            let widget = getState().configurations.widget;
            const selectedItemData = _.find(getState().dataMetrics.datametricsMetadata, (metaData) => metaData.StatisticItemId === selectedItem.id);
            let defaulted = getState().realTimeSettings.drillDownDefaulted
            dataMetricsService.getDrillDownMetaData(selectedItemData.StatisticGroupId).then(function (response) {
                let _opts = _.map(_.uniqBy(response.data, 'Id'), (obj) => {
                    let option, _checked;
                    // all these calculations because of the difference in drill down options saved in db vs appended obj to DM
                    // if already defaulted.. trying to persist changes wrt to selections made even on toggling categories
                    // else trying to fetch from widget drill downs
                    if (defaulted)
                        option = _.find(getState().realTimeSettings.drillDownOptions, (_opt) => _opt == obj.Id || _opt.value == obj.Id)
                    else
                        option = _.find(widget.appliedSettings.dataMetrics.drillDownOptions, (_opt) => _opt == obj.Id || _opt.value == obj.Id)

                    _checked = option ? true : false;
                    if (option && option.checked != undefined)
                        _checked = option.checked

                    return {
                        label: obj.Name,
                        value: obj.Id,
                        checked: _checked
                        // checked: defaulted ? false : _checked
                    };
                });
                dispatch({
                    type: UPDATE_DRILL_DOWN_METADATA,
                    drillDownDefaulted: true,
                    drillDownOptions: _opts,
                    isDrillDownMultiSelect: selectedItemData.AllowMultiSelect,
                });
            });
        }
    }
}

export function toggleDrillDown(shouldOpen) {
    return (dispatch, getState) => {
        let openDrillDown = shouldOpen || !getState().realTimeSettings.openDrillDown
        dispatch({
            type: TOGGLE_DRILL_DOWN,
            openDrillDown
        })
    }
}

export function updateDrillDownOptions(options) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_DRILL_DOWN_OPTIONS,
            drillDownOptions: options
        })
    }
}

export function clearRealTimeSettings() {
    return (dispatch, getState) => {
        let realTimeSettings = { ...realTimeSettingsinitialState }
        dispatch({
            type: CLEAR_SELECTED_REALTIME_SETTINGS,
            realTimeSettings
        })
    }
}

export function setDrillDownDefaulted(value) {
    return {
        type: SET_DRILL_DOWN_DEFAULTED,
        drillDownDefaulted: value
    }
}