import * as dataMetricsService from './data-metrics-service';
import { StatisticCategoryEnum, WidgetTypeEnum } from '../../shared/enums';
import { UPDATE_WIDGET } from '../../dashboard/dashboard.reducer';
import { UPDATE_SETTINGS_WIDGET } from '../widget-configurations/widget-configurations.reducer';

export const UPDATE_DATAMETRICS = "UPDATE_DATAMETRICS"
export const SET_STATISTIC_CATEGORY = "SET_STATISTIC_CATEGORY"
export const UPDATE_SELECTED_GROUP = "UPDATE_SELECTED_GROUP"
export const UPDATE_DATAMETRICS_ITEMS = "UPDATE_DATAMETRICS_ITEMS"
export const UPDATE_SELECTED_DISPLAY_FORMAT = "UPDATE_SELECTED_DISPLAY_FORMAT"
export const UPDATE_SELECTED_FUNCTION = "UPDATE_SELECTED_FUNCTION"
export const UPDATE_DATAMETRICS_FUNCTIONS = "UPDATE_DATAMETRICS_FUNCTIONS"
export const UPDATE_SELECTED_ITEM = "UPDATE_SELECTED_ITEM"
export const UPDATE_DISPLAY_FORMATS = "UPDATE_DISPLAY_FORMATS"
export const SET_SELECTED_STATISTIC_CATEGORY = "SET_SELECTED_STATISTIC_CATEGORY"
export const UPDATE_WIDGET_SPECIFIC_STATISTIC_CATEGORIES = "UPDATE_WIDGET_SPECIFIC_STATISTIC_CATEGORIES"
export const UPDATE_DRILL_DOWN_METADATA = "UPDATE_DRILL_DOWN_METADATA"
export const UPDATE_DRILL_DOWN_OPTIONS = "UPDATE_DRILL_DOWN_OPTIONS"
export const UPDATE_DRILL_DOWN_MULTI_SELECT_STATUS = "UPDATE_DRILL_DOWN_MULTI_SELECT_STATUS"
export const SET_COMBO_STATISTIC_ITEMS = "SET_COMBO_STATISTIC_ITEMS"
export const UPDATE_COMBO_SELECTED_ROW = "UPDATE_COMBO_SELECTED_ROW"
export const UPDATE_APPLICABLE_WIDGETS = "UPDATE_APPLICABLE_WIDGETS"
export const SET_APPLICABLE_WIDGET = "SET_APPLICABLE_WIDGET"
export const UPDATE_WIDGET_DM = "UPDATE_WIDGET_DM"
export const UPDATE_COMBO_DRILL_DOWN_METADATA = "UPDATE_COMBO_DRILL_DOWN_METADATA"
export const UPDATE_CUSTOM_STASTISTICS_SP_DATA = "UPDATE_CUSTOM_STASTISTICS_SP_DATA"
export const UPDATE_APPLICABLE_WIDGET = "UPDATE_APPLICABLE_WIDGET"
export const UPDATE_COLUMNS = "UPDATE_COLUMNS"
export const SET_STATISTIC_ITEM = "SET_STATISTIC_ITEM"
export const SET_STATISTIC_Function = "SET_STATISTIC_Function"
export const SET_STATISTIC_DisplayFormat = "SET_STATISTIC_DisplayFormat"
export const SET_DM_ISDIRTY = "SET_DM_ISDIRTY"
export const SET_DM_ISLOADED = "SET_DM_ISLOADED"
export const CLEAR_SELECTED_DM = "CLEAR_SELECTED_DM"
export const UPDATE_DROP_DOWNS = "UPDATE_DROP_DOWNS"
export const UPDATE_COMBO_DRILL_DOWN_OPTIONS = "UPDATE_COMBO_DRILL_DOWN_OPTIONS"
export const DEFAULT_METRICS = "DEFAULT_METRICS"
export const TOGGLE_DRILL_DOWN = "TOGGLE_DRILL_DOWN"

export function LoadDataMetricsMetaData(dashboardId) {
    return (dispatch, getState) => {
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetaData = getState().dataMetrics.datametricMetadata;
        if (statisticCategories && statisticCategories.length != 0 && datametricsMetaData) {
            return
        }

        // Load StatisticCategories for all and then filter per widgetType and update DM store
        dispatch(getState().spinnerStore.BeginTask());

        dataMetricsService.getStatisticCategories().then(function (response) {
            dispatch(getState().spinnerStore.EndTask());

            if (response.status === 200) {
                statisticCategories = response.data;

                dispatch(getState().spinnerStore.BeginTask());
                dataMetricsService.getStatisticGroups().then(function (response) {
                    dispatch(getState().spinnerStore.EndTask());
                    if (response.status === 200) {
                        datametricsMetaData = _.map(response.data, (obj) => {
                            return DataMetricsMetadataMapper(obj);
                        });

                        if (!datametricsMetaData)
                            return;

                        // Dispatching basic data for DM - categories and groups
                        dispatch({
                            type: UPDATE_DATAMETRICS,
                            statisticCategories,
                            statisticCategoryOptions: [],
                            datametricsMetaData,
                            groupOptions: [],
                        });
                    }
                });
            }
        }).catch((error) => {
            dispatch(getState().notificationStore.notify('failure to load statistic Metadata, please reload'))
        });
    }
}

export function initializeStatisticMetadata() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetaData = getState().dataMetrics.datametricMetadata;

        //If Categories and DM are already in store, filter them appropriately and update the state
        if (!statisticCategories || statisticCategories.length == 0 || !datametricsMetaData)
            return dispatch(getState().notificationStore.notify('failure to load statistic Metadata, please reload'));

        let selectedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory ?
            currentWidget.appliedSettings.dataMetrics.statisticCategory :
            StatisticCategoryEnum.RealTime

        dispatch({
            type: SET_STATISTIC_CATEGORY,
            selectedStatisticCategory
        })
        dispatch(DispatchDMForWidgetType(statisticCategories, currentWidget.widgetType, datametricsMetaData, getState));
        dispatch({
            type: DEFAULT_METRICS,
            selectedGroup: currentWidget.appliedSettings.dataMetrics.group || {},
            selectedItem: currentWidget.appliedSettings.dataMetrics.item || {},
            selectedFunction: currentWidget.appliedSettings.dataMetrics.func || {},
            selectedDisplayFormat: currentWidget.appliedSettings.dataMetrics.displayFormat || {}
        })
        // if (currentWidget.appliedSettings.dataMetrics.group)
        //     dispatch(setSelectedGroupValueAction(currentWidget.appliedSettings.dataMetrics.group))
    }
}

function DispatchDMForWidgetType(statisticCategories, widgetType, datametricsMetaData, getState) {
    let _categories = _.map(_.filter(statisticCategories, x => x.WidgetType === widgetType), (obj) => {
        return {
            label: obj.StatisticCategoryName,
            value: obj.StatisticCategory
        };
    });

    let _grpOptions = _.uniqBy(_.map(_.filter(datametricsMetaData, metric => (metric.StatisticCategory === getState().dataMetrics.statisticCategory &&
        metric.WidgetType === widgetType)), (obj) => {
            return {
                id: obj.StatisticGroupId,
                label: obj.StatisticGroup,
                value: obj.Id
            };
        }), 'id');
    return {
        type: UPDATE_DATAMETRICS,
        statisticCategories,
        statisticCategoryOptions: _categories,
        datametricsMetaData,
        groupOptions: _grpOptions,
    };
}

function DataMetricsMetadataMapper(obj) {
    return {
        StatisticGroupId: obj.dSGId,
        StatisticGroup: obj.dSG,
        StatisticItemId: obj.dSIId,
        StatisticItem: obj.dSI,
        StatisticFunctionId: obj.dSFId,
        StatisticFunction: obj.dSF,
        DisplayFormatId: obj.dDFId,
        DisplayFormat: obj.dDF,
        StatisticCategory: obj.dSC,
        WidgetType: obj.dWT,
        AllowMultiSelect: obj.dAMS,
        IsDrillDownFilter: obj.dDDF,
        IsFilterId: obj.dIF,
        Id: obj.dId
    };
}

export function setSelectedGroupValue(selectedGroup) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_SELECTED_GROUP,
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
            type: UPDATE_DATAMETRICS_ITEMS,
            itemOptions: availableItems || []
        });
    }
}

export function setSelectedSatisticItem(selectedItem) {
    return {
        type: SET_STATISTIC_ITEM,
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
            type: UPDATE_DATAMETRICS_FUNCTIONS,
            functionOptions: _funcOptions
        });
    }
}

export function setSelectedFunction(selectedFunction) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_SELECTED_FUNCTION,
            selectedFunction
        });
    }
}

export function getDisplayFormat() {
    return (dispatch, getState) => {
        let selectedFunction = getState().dataMetrics.selectedFunction;
        let currentWidget = getState().configurations.widget;
        dispatch({
            type: UPDATE_DISPLAY_FORMATS,
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
            type: UPDATE_SELECTED_DISPLAY_FORMAT,
            selectedDisplayFormat
        });
    }
}

export function SaveMetrics(dataMetrics) {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        currentWidget.appliedSettings.dataMetrics = dataMetrics;
        dispatch({
            type: UPDATE_SETTINGS_WIDGET,
            widget: currentWidget
        })
        dispatch({
            type: UPDATE_WIDGET,
            widget: currentWidget
        });
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

export function updateDrillDownOptionsAction(options) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_DRILL_DOWN_OPTIONS,
            drillDownOptions: options
        })
    }
}

export function clearSelectedDM() {
    return (dispatch, getState) => {
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetaData = getState().dataMetrics.datametricMetadata;
        let dataMetrics = { ..._.cloneDeep(initialState), statisticCategories, datametricsMetaData }
        dispatch({
            type: CLEAR_SELECTED_DM,
            dataMetrics
        })
    }
}

export const ACTION_HANDLERS = {
    [UPDATE_DATAMETRICS]: (state, action) => {
        return Object.assign({}, state, {
            statisticCategories: action.statisticCategories,
            statisticCategoryOptions: action.statisticCategoryOptions,
            datametricMetadata: action.datametricsMetaData,
            groupOptions: action.groupOptions
        })
    },
    [SET_STATISTIC_CATEGORY]: (state, action) => {
        return Object.assign({}, state, {
            statisticCategory: action.selectedStatisticCategory,
        })
    },
    [UPDATE_SELECTED_GROUP]: (state, action) => {
        return Object.assign({}, state, {
            selectedGroup: action.selectedGroup,
            selectedItem: {},
            selectedFunction: {},
            selectedDisplayFormat: {},
            selectedWidgetforStatisticItem: {},
            functionOptions: [],
            displayFormatOptions: [],
        })
    },
    [UPDATE_DATAMETRICS_ITEMS]: (state, action) => {
        return Object.assign({}, state, {
            itemOptions: action.itemOptions,
            selectedItem: {},
            selectedFunction: {},
            selectedDisplayFormat: {},
            selectedWidgetforStatisticItem: {},
            functionOptions: [],
            displayFormatOptions: [],
            applicableWidgets: []
        })
    },
    [UPDATE_SELECTED_DISPLAY_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            selectedDisplayFormat: action.selectedDisplayFormat,
        })
    },
    [UPDATE_SELECTED_FUNCTION]: (state, action) => {
        return Object.assign({}, state, {
            selectedFunction: action.selectedFunction,
            selectedDisplayFormat: {},
        })
    },
    [SET_STATISTIC_ITEM]: (state, action) => {
        return Object.assign({}, state, {
            selectedItem: action.selectedItem,
        })
    },
    [SET_STATISTIC_Function]: (state, action) => {
        return Object.assign({}, state, {
            selectedFunction: action.selectedFunction,
        })
    },
    [SET_STATISTIC_DisplayFormat]: (state, action) => {
        return Object.assign({}, state, {
            selectedDisplayFormat: action.selectedDisplayFormat,
        })
    },
    [UPDATE_DATAMETRICS_FUNCTIONS]: (state, action) => {
        return Object.assign({}, state, {
            // selectedFunction: action.functionOptions.length > 0 ? action.functionOptions[0] : {},
            functionOptions: action.functionOptions
        })
    },
    [UPDATE_DISPLAY_FORMATS]: (state, action) => {
        return Object.assign({}, state, {
            // selectedDisplayFormat: action.displayFormatOptions.length > 0 ? action.displayFormatOptions[0] : {},
            displayFormatOptions: action.displayFormatOptions
        })
    },
    [CLEAR_SELECTED_DM]: (state, action) => {
        return Object.assign({}, state, action.dataMetrics)
    },
    [DEFAULT_METRICS]: (state, action) => {
        return Object.assign({}, state, {
            selectedGroup: action.selectedGroup,
            selectedItem: action.selectedItem,
            selectedFunction: action.selectedFunction,
            selectedDisplayFormat: action.selectedDisplayFormat
        })
    },
    [TOGGLE_DRILL_DOWN]: (state, action) => {
        return Object.assign({}, state, {
            openDrillDown: action.openDrillDown
        })
    },
    [UPDATE_DRILL_DOWN_METADATA]: (state, action) => {
        return Object.assign({}, state, {
            drillDownOptions: action.drillDownOptions,
            isDrillDownMultiSelect: action.isDrillDownMultiSelect,
            drillDownDefaulted: action.drillDownDefaulted
        })
    },
    [UPDATE_DRILL_DOWN_OPTIONS]: (state, action) => {
        return Object.assign({}, state, {
            drillDownOptions: action.drillDownOptions
        })
    }
}

const initialState = {
    widgetType: WidgetTypeEnum.Box,
    drillDownOptions: [],
    groupOptions: [],
    itemOptions: [],
    functionOptions: [],
    storeProcOptions: [],
    selectedGroup: {},
    selectedItem: {},
    selectedFunction: {},
    selectedDisplayFormat: {},
    storeProcData: null,
    selectedWidgetforStatisticItem: '',
    displayFormatOptions: [],
    statisticCategory: StatisticCategoryEnum.RealTime,
    isDirty: false,
    isLoaded: false,
    allColumnOptions: [],
    columnOptions: [],
    comboSelectedStatisticItems: [],
    statisticCategories: [],
    datametricsMetaData: {},
    isDefault: false,
    displayName: '',
    drillDownDefaulted: false,
    openDrillDown: false,
    LoadDataMetricsMetaData,
    initializeStatisticMetadata,
    clearSelectedDM
};

export default function DataMetricsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}