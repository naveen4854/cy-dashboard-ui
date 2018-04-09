import { StatisticCategoryEnum, WidgetTypeEnum } from "../../shared/enums";
import { WidgetData } from "../../shared/lib";
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, UPDATE_COMBO_SELECTED_GROUP, UPDATE_COMBO_STATISTIC_ITEMS, SET_COMBO_SELECTED_STATISTIC_ITEMS, UPDATE_COMBO_REALTIME_DISPLAYNAME, SET_COMBO_REALTIME_STATISTIC_ITEM, UPDATE_COMBO_REALTIME_FUNCTIONS, UPDATE_COMBO_REALTIME_SELECTED_FUNCTION, UPDATE_COMBO_REALTIME_DISPLAY_FORMATS, UPDATE_COMBO_REALTIME_SELECTED_DISPLAY_FORMAT, UPDATE_COMBO_REALTIME_APPLICABLE_WIDGETS, SET_COMBO_REALTIME_APPLICABLE_WIDGET, UPDATE_COMBO_DRILL_DOWN_METADATA, UPDATE_COMBO_REALTIME_TOGGLE_ADD, SET_COMBO_REALTIME_STATISTIC_COLUMNS } from './combo-realtime-metrics-settings.constants';

import * as dataMetricsService from '../data-metrics/data-metrics-service';
import { getWidgetByEnum } from "../../shared/lib/widget-data";
import { getRandom } from "../../utilities/utils";

export function initiateComboRealTimeSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        let selectedStatisticCategory = getState().dataMetrics.statisticCategory;
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;
        let groupOptions = getState().realTimeSettings.groupOptions;
        if (!groupOptions || groupOptions.length == 0) {
            let _grpOptions = _.uniqBy(_.map(_.filter(datametricsMetadata, metric => (metric.StatisticCategory === StatisticCategoryEnum.RealTime &&
                metric.WidgetType === currentWidget.widgetType)), (obj) => {
                    return {
                        id: obj.StatisticGroupId,
                        label: obj.StatisticGroup,
                        value: obj.Id
                    };
                }), 'id');

            dispatch({
                type: SET_COMBO_REALTIME_STATISTIC_GROUPS,
                groupOptions: _grpOptions
            });
        }

        let appliedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory
        if (appliedStatisticCategory == StatisticCategoryEnum.RealTime)
            dispatch({
                // type: DEFAULT_REALTIME_METRICS,
                // selectedGroup: currentWidget.appliedSettings.dataMetrics.group || {},
                // selectedItem: currentWidget.appliedSettings.dataMetrics.item || {},
                // selectedFunction: currentWidget.appliedSettings.dataMetrics.func || {},
                // selectedDisplayFormat: currentWidget.appliedSettings.dataMetrics.displayFormat || {}
            })
    }
}


export function setSelectedComboGroupValue(selectedGroup) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_COMBO_SELECTED_GROUP,
            selectedGroup
        });
    }
}

export function setStatisticsItems() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let selectedGroup = getState().comboRealTimeSettings.selectedGroup;

        let allData = getState().dataMetrics.datametricsMetadata;

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
            type: UPDATE_COMBO_STATISTIC_ITEMS,
            statisticItems: availableItems.length > 0 ? availableItems : []
        });
    }
}


export function getComboDrillDownMetaData(selectedGroup, widgetId) {
    return (dispatch, getState) => {
        //const selectedWidget = getState().configurations.widget;

        dataMetricsService.getDrillDownMetaData(selectedGroup.id).then(function (response) {
            if (response.status === 200) {
                let currentWidget = getState().configurations.widget;
                let group = getState().comboRealTimeSettings.selectedGroup;

                let isEqual = currentWidget.appliedSettings.dataMetrics.group && _.isEqualWith(currentWidget.appliedSettings.dataMetrics.group, group,
                    (f, s) => f.id == s.id && f.label == s.label
                );
                const shouldcheck = group ? isEqual : true;
                let drillDownOptions = _.map(_.uniqBy(response.data, 'Id'), (obj) => {
                    // all these calculations because of the difference in drill down options saved in db vs appended obj to DM
                    let o = _.find(currentWidget.appliedSettings.dataMetrics.drillDownOptions, (_opt) => _opt == obj.Id || _opt.value == obj.Id)
                    let _checked = o ? true : false;
                    if (o && o.checked != undefined)
                        _checked = true
                    return {
                        label: obj.Name,
                        value: obj.Id,
                        checked: shouldcheck ? _checked : false
                    };
                });

                let finalDrillDownOptions = _.filter(drillDownOptions,
                    item => !item.checked);

                let selectedDrilldownOptions = []

                if (isEqual) {
                    selectedDrilldownOptions = _.map(currentWidget.appliedSettings.dataMetrics.drillDownOptions, function (value, i) {
                        let selectedValue = _.find(drillDownOptions, { 'value': value.value ? value.value : value });
                        if (selectedValue) {
                            selectedValue.checked = false;
                            return selectedValue;
                        }
                    })
                }
                else {
                    selectedDrilldownOptions = [];
                }

                //selectedWidget.appliedSettings.group.isEdit = false;
                dispatch({
                    type: UPDATE_COMBO_DRILL_DOWN_METADATA,
                    drillDownOptions: finalDrillDownOptions,
                    selectedDrilldownOptions: selectedDrilldownOptions
                });
            }
        });
    }
}



export function addDefaultComboStatisticItems(selectedGroup) {
    return (dispatch, getState) => {

        const currentWidget = getState().configurations.widget; // TODO updating settings reducer widget directly.. move it into a reducer action
        var result = _.find(currentWidget.appliedSettings.dataMetrics.comboSelectedStatisticItems, item => item.isDefault);
        // if (result.length == 0 || widget.appliedSettings.group.isNew) {
        //currentWidget.appliedSettings.dataMetrics.comboSelectedStatisticItems = [];


        const group = _.find(getState().dataMetrics.datametricsMetadata, (metric) =>
            metric.StatisticGroupId === selectedGroup.id &&
            metric.WidgetType === currentWidget.widgetType &&
            metric.IsDrillDownFilter);
        if (!group) return;
        let displayFormat = {
            id: group.DisplayFormatId,
            label: group.DisplayFormat,
            value: group.Id
        };
        let statisticItem = {
            id: group.StatisticItemId,
            label: group.StatisticItem,
            value: group.Id
        };
        let statisticFunction = {
            id: group.StatisticFunctionId,
            label: group.StatisticFunction,
            value: group.Id
        };
        let applicableWidget = {
            label: getWidgetByEnum(WidgetTypeEnum.Box),
            value: WidgetTypeEnum.Box
        };

        let defaultStatisticItem = {
            id: 1, // defaulted to one, helps with reordering rows
            isDefault: true,
            item: statisticItem,
            func: statisticFunction,
            displayFormat: displayFormat,
            widget: applicableWidget,
            displayName: result && result.displayName ? result.displayName : statisticItem.label
        };
        let comboSelectedStatisticItems = [];
        comboSelectedStatisticItems.push(defaultStatisticItem);
        dispatch({
            type: SET_COMBO_SELECTED_STATISTIC_ITEMS,
            comboSelectedStatisticItems
        });
    }
}


export function updateComboDrillDownOptions(options) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_COMBO_DRILL_DOWN_METADATA,
            drillDownOptions: options.allList,
            selectedDrilldownOptions: options.selectedList,
        })
    }
}


function mapComboItems(wdt, metaData) {
    let columns = _.filter(wdt.appliedSettings.dataMetrics.columns, column => column.cwt != 0);
    _.each(columns, (value, key) => {

        if (key > 0) {
            var itemOption = _.find(metaData.itemOptions, m => m.id == value.cisiid)
            if (itemOption) {
                var functionOption = _.find(_.uniqBy(_.map(_.filter(metaData.datametricsMetadata,
                    metric => metric.StatisticItemId === itemOption.id &&
                        metric.StatisticCategory === metaData.statisticCategory &&
                        metric.WidgetType === wdt.widgetType), item => {
                            return {
                                id: item.StatisticFunctionId,
                                label: item.StatisticFunction,
                                value: item.Id
                            }
                        }), 'id'), f => f.id = value.ciafid);

                var displayFormatOption = _.find(_.uniqBy(_.map(_.filter(metaData.datametricsMetadata, metric =>
                    (metric.StatisticItemId === itemOption.id &&
                        metric.StatisticCategory === metaData.statisticCategory &&
                        metric.StatisticFunctionId === functionOption.id &&
                        metric.WidgetType === wdt.widgetType)
                ), item => {
                    return {
                        id: item.DisplayFormatId,
                        label: item.DisplayFormat,
                        value: item.Id
                    }
                }), 'id'), d => d.id == value.cdf)

                var comboItem = {
                    id: Date.now() + Math.floor(Math.random() * 10000),
                    item: itemOption,
                    func: functionOption,
                    isDefault: false,
                    displayFormat: displayFormatOption,
                    widget: {
                        label: getWidgetByEnum(value.cwt),
                        value: value.cwt
                    },
                    displayName: value.dn || itemOption.label
                }
                wdt.appliedSettings.dataMetrics.comboSelectedStatisticItems.push(comboItem)
            }
        }
    });
}


export function setSatisticItem(selectedItem) {
    return (dispatch, getState) => {
        if (!selectedItem)
            return

        dispatch({
            type: SET_COMBO_REALTIME_STATISTIC_ITEM,
            selectedItem
        });

        let dn = getState().comboRealTimeSettings.displayName;
        dispatch({
            type: UPDATE_COMBO_REALTIME_DISPLAYNAME,
            displayName: dn != '' ? dn : selectedItem.label
        })

    }
}

export function setStatisticFunctions() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let selectedItem = getState().comboRealTimeSettings.selectedItem;

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
            type: UPDATE_COMBO_REALTIME_FUNCTIONS,
            functionOptions: _funcOptions
        });

    }
}

export function setSelectedFunction(selectedFunction) {
    return (dispatch, getState) => {

        dispatch({
            type: UPDATE_COMBO_REALTIME_SELECTED_FUNCTION,
            selectedFunction
        });
    }
}

export function getDisplayFormatOptions() {
    return (dispatch, getState) => {
        let selectedFunction = getState().comboRealTimeSettings.selectedFunction;
        let currentWidget = getState().configurations.widget;
        let displayFormatOptions = _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricsMetadata, metric =>
            (metric.StatisticItemId === getState().comboRealTimeSettings.selectedItem.id &&
                metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
                metric.StatisticFunctionId === selectedFunction.id && metric.WidgetType === currentWidget.widgetType)
        ), item => {
            return {
                id: item.DisplayFormatId,
                label: item.DisplayFormat,
                value: item.Id
            }
        }), 'id')
        dispatch({
            type: UPDATE_COMBO_REALTIME_DISPLAY_FORMATS,
            displayFormatOptions
        });
    }
}
export function setSelectedDisplayFormat(selectedDisplayFormat) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_COMBO_REALTIME_SELECTED_DISPLAY_FORMAT,
            selectedDisplayFormat
        });
    }
}


export function getApplicableWidget(selectedDisplayFormat) {
    return (dispatch, getState) => {
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;
        let selectedItem = getState().comboRealTimeSettings.selectedItem.id;
        let applicableWidgets = _.map(_.uniqBy(_.filter(datametricsMetadata, x => x.StatisticItemId == selectedItem &&
            (x.WidgetType == WidgetTypeEnum.Box ||
                x.WidgetType == WidgetTypeEnum.Progress ||
                x.WidgetType == WidgetTypeEnum.Speedo ||
                x.WidgetType == WidgetTypeEnum.CircularProgress)
        ), u => {
            return u.WidgetType;
        }), (item) => {
            return {
                label: getWidgetByEnum(item.WidgetType),
                value: item.WidgetType
            };
        });

        dispatch({
            type: UPDATE_COMBO_REALTIME_APPLICABLE_WIDGETS,
            applicableWidgets
        });
    }
}

export function setApplicableWidget(selectedWidget) {
    return (dispatch, getState) => {
        // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetId);
        dispatch({
            type: SET_COMBO_REALTIME_APPLICABLE_WIDGET,
            selectedWidget: selectedWidget
        });
    }
}
export function updateDisplayName(displayName) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_COMBO_REALTIME_DISPLAYNAME,
            displayName
        })
    }
}


export function toggleAddEdit(toggleAddEdit) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_COMBO_REALTIME_TOGGLE_ADD,
            toggleAddEdit
        })
    }
}

export function addComboStatisticItem() {
    return (dispatch, getState) => {
        let comboSelectedStatisticItems = getState().comboRealTimeSettings.comboSelectedStatisticItems;
        let comboRealTimeSettings = getState().comboRealTimeSettings;
        let selectedStatisticItem = {
            id: getRandom(),
            item: comboRealTimeSettings.selectedItem,
            func: comboRealTimeSettings.selectedFunction,
            displayFormat: comboRealTimeSettings.selectedDisplayFormat,
            widget: comboRealTimeSettings.selectedWidget,
            displayName: comboRealTimeSettings.displayName

        }
        let columns = comboSelectedStatisticItems.splice(comboSelectedStatisticItems.length, 0, selectedStatisticItem);
        dispatch(getState().notificationStore.clearNotifications());
        // dispatch({
        //     type: UPDATE_DISPLAYNAME,
        //     displayName: selectedStatisticItem.displayName
        // });
        dispatch({
            type: SET_COMBO_REALTIME_STATISTIC_COLUMNS,
            comboSelectedStatisticItems: comboSelectedStatisticItems
        })

    }
}

export function applyComboRealTimeMetrics() {
    return (dispatch, getState) => {
        dispatch(getState().dataMetrics.saveComboRealTimeMetrics())
    }
}