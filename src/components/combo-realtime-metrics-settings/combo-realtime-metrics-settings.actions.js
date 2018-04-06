import { StatisticCategoryEnum, WidgetTypeEnum } from "../../shared/enums";
import { WidgetData } from "../../shared/lib";
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, UPDATE_COMBO_SELECTED_GROUP, UPDATE_COMBO_STATISTIC_ITEMS, UPDATE_COMBO_DRILL_DOWN_METADATA, SET_COMBO_SELECTED_STATISTIC_ITEMS } from "./combo-realtime-metrics-settings.constants";
import * as dataMetricsService from '../data-metrics/data-metrics-service';
import { getWidgetByEnum } from "../../shared/lib/widget-data";

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


export function generateMatrix() {
    return (dispatch, getState) => {
        let currentCombo = getState().configurations.widget;
        let comboId = currentCombo.id;
        let oldMatrix = currentCombo ? _.flatten(currentCombo.matrix) : null;
        let selectedGroup = getState().comboRealTimeSettings.selectedGroup;

        let matrix = []
        let headers = [];

        let comboSelectedStatisticItems = getState().configurations.comboSelectedStatisticItems;
        let columns = _.map(comboSelectedStatisticItems, (metric, i) => {
            headers.push(getColumnHeader(metric, i, comboId));
            return getColumn(metric)
        });

        let filters = getState().configurations.drillDownOptions//_.filter(drillDownOptions, (eachOption) => eachOption.checked);
        let rowHeaders = _.map(filters, (filter) => {
            return getRowHeader(filter, comboId);
        });

        let newMatrix = getNewMatrix(filters, headers, comboSelectedStatisticItems, rowHeaders, selectedGroup, comboId, oldMatrix)

    }
}

function getNewMatrix(filters, headers, comboSelectedStatisticItems, rowHeaders, selectedGroup, comboId, oldMatrix) {
    return _.map(filters, (filter, rowIndex) => {
        if (rowIndex == 0)
            return headers;
        let row = _.map(comboSelectedStatisticItems, (statisticItem, columnIndex) => {
            if (columnIndex == 0)
                return rowHeaders[0];

            // check if cell exists in old matrix by comparing columnId and rowId
            // if exists apply all its settings onto new widget
            // else create new widget and return
            // TODO please track the statistic item changes and apply them again and also widgettype
            let existingCell = _.find(oldMatrix, (oldCell) => oldCell.columnId == statisticItem.id && oldCell.rowId == filter.value + '_' + selectedGroup)
            if (existingCell)
                return existingCell;


            // Have to figure out if its a new row cell or a new column 
            // based on which we apply styles
            let dataMetrics = {
                group: {},
                item: statisticItem.item,
                func: statisticItem.func,
                displayFormat: statisticItem.displayFormat,
            };
            let cell = WidgetData.GetWidget(statisticItem.widget.value);
            cell.setDataMetrics(dataMetrics);
            cell.isComboWidget = true;
            cell.comboId = comboId;
            cell.columnId = statisticItem.id;
            cell.rowId = filter.value + '_' + selectedGroup; // TODO: check , using combination because there is chance of same id for unrelated drilldown options
            // isRowrColumn = false
            return cell;
        });
        return row;
    });
}

function getRowHeader(filter, comboId) {
    let rHeader = WidgetData.GetWidget(WidgetTypeEnum.Box, 0, true, true);
    rHeader.displayValue = filter.label;
    rHeader.isComboWidget = true;
    rHeader.comboId = comboId;
    rHeader.HideSettings = true;
    rHeader.settings = {
        filter: filter.value
    };
    rHeader.isRowrColumn = true;
    return rHeader;
}

function getColumnHeader(metric, index, comboId) {
    let cHeader = WidgetData.GetWidget(WidgetTypeEnum.Box, 0, true, true);
    cHeader.displayValue = metric.displayName;
    cHeader.isComboWidget = true;
    cHeader.HideSettings = index == 0 ? true : false;
    cHeader.comboId = comboId;
    cHeader.isHeader = true;
    cHeader.isRowrColumn = true;
    cHeader.settings = {
        item: metric.item && metric.item.id,
        cWidgetType: metric.widget && metric.widget.value,
    };
    return cHeader;
}

function getColumn(metric) {
    return {
        id: metric.id,
        cisiid: metric && metric.item && metric.item.id,
        ciafid: metric && metric.func && metric.func.id,
        cirob: 0,
        ciia: 0,
        cdf: metric && metric.displayFormat && metric.displayFormat.id,
        cwt: metric && metric.widget && metric.widget.value,
        dn: metric && metric.displayName
    };
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

        let allData = getState().dataMetrics.datametricMetadata;

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
                var functionOption = _.find(_.uniqBy(_.map(_.filter(metaData.datametricMetadata,
                    metric => metric.StatisticItemId === itemOption.id &&
                        metric.StatisticCategory === metaData.statisticCategory &&
                        metric.WidgetType === wdt.widgetType), item => {
                            return {
                                id: item.StatisticFunctionId,
                                label: item.StatisticFunction,
                                value: item.Id
                            }
                        }), 'id'), f => f.id = value.ciafid);

                var displayFormatOption = _.find(_.uniqBy(_.map(_.filter(metaData.datametricMetadata, metric =>
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