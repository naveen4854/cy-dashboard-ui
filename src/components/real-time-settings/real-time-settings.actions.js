import { DEFAULT_REALTIME_METRICS, UPDATE_REALTIME_SELECTED_GROUP, UPDATE_REALTIME_METRICS, UPDATE_REALTIME_ITEMS, SET_REALTIME_ITEM, UPDATE_REALTIME_FUNCTIONS, UPDATE_REALTIME_SELECTED_FUNCTION, UPDATE_REALTIME_DISPLAY_FORMATS, UPDATE_REALTIME_SELECTED_DISPLAY_FORMAT, UPDATE_DRILL_DOWN_METADATA } from "./real-time-settings.reducer";

export function initiateRealTimeSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        let selectedStatisticCategory = getState().dataMetrics.selectedStatisticCategory;
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetaData = getState().dataMetrics.datametricMetadata;

        dispatch(DispatchDMForWidgetType(statisticCategories, currentWidget.widgetType, datametricsMetaData, selectedStatisticCategory));
        dispatch({
            type: DEFAULT_REALTIME_METRICS,
            selectedGroup: currentWidget.appliedSettings.dataMetrics.group || {},
            selectedItem: currentWidget.appliedSettings.dataMetrics.item || {},
            selectedFunction: currentWidget.appliedSettings.dataMetrics.func || {},
            selectedDisplayFormat: currentWidget.appliedSettings.dataMetrics.displayFormat || {}
        })

    }
}

function DispatchDMForWidgetType(statisticCategories, widgetType, datametricsMetaData, selectedStatisticCategory) {
    let _categories = _.map(_.filter(statisticCategories, x => x.WidgetType === widgetType), (obj) => {
        return {
            label: obj.StatisticCategoryName,
            value: obj.StatisticCategory
        };
    });

    let _grpOptions = _.uniqBy(_.map(_.filter(datametricsMetaData, metric => (metric.StatisticCategory === selectedStatisticCategory &&
        metric.WidgetType === widgetType)), (obj) => {
            return {
                id: obj.StatisticGroupId,
                label: obj.StatisticGroup,
                value: obj.Id
            };
        }), 'id');
    return {
        type: UPDATE_REALTIME_METRICS,
        statisticCategories,
        statisticCategoryOptions: _categories,
        datametricsMetaData,
        groupOptions: _grpOptions,
    };
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
        let selectedGroup = getState().dataMetrics.selectedGroup;

        let allData = getState().dataMetrics.datametricMetadata;
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
        let selectedItem = dataMetrics.selectedItem;
        let _funcOptions = _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricMetadata,
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
        let selectedFunction = getState().dataMetrics.selectedFunction;
        let currentWidget = getState().configurations.widget;
        dispatch({
            type: UPDATE_REALTIME_DISPLAY_FORMATS,
            displayFormatOptions: _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricMetadata, metric =>
                (metric.StatisticItemId === getState().dataMetrics.selectedItem.id &&
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
        let currentWidget = getState().configurations.widget;
        let updatedWidget = { ...currentWidget, appliedSettings: { ...currentWidget.appliedSettings, dataMetrics: dataMetrics } }
        dispatch(getState().configurations.updateDashboardWidget(updatedWidget));
    }
}



export function getDrillDownMetaData(selectedItem) {
    return (dispatch, getState) => {
        if (getState().dataMetrics && getState().dataMetrics.datametricMetadata) {
            let widget = getState().configurations.widget;
            const selectedItemData = _.find(getState().dataMetrics.datametricMetadata, (metaData) => metaData.StatisticItemId === selectedItem.id);
            dataMetricsService.getDrillDownMetaData(selectedItemData.StatisticGroupId).then(function (response) {
                let _opts = _.map(_.uniqBy(response.data, 'Id'), (obj) => {

                    let defaulted = getState().dataMetrics.drillDownDefaulted
                    // all these calculations because of the difference in drill down options saved in db vs appended obj to DM
                    let option = _.find(widget.appliedSettings.dataMetrics.drillDownOptions, (_opt) => _opt == obj.Id || _opt.value == obj.Id)
                    let _checked = option ? true : false;
                    if (option && option.checked != undefined)
                        _checked = option.checked
                    return {
                        label: obj.Name,
                        value: obj.Id,
                        checked: defaulted ? false : _checked
                        // checked:  _checked //getState().dataMetrics.isLoaded ? false :
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
        let openDrillDown = shouldOpen || !getState().dataMetrics.openDrillDown
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