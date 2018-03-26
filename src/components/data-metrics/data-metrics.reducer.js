import * as dataMetricsService from './data-metrics-service';
import { StatisticCategoryEnum, WidgetTypeEnum, ResponseStatusEnum } from '../../shared/enums';
import { UPDATE_WIDGET } from '../../dashboard/dashboard.reducer';
import { UPDATE_CONFIGURATIONS_WIDGET } from '../widget-configurations/widget-configurations.reducer';

export const UPDATE_DATAMETRICS = "UPDATE_DATAMETRICS"
export const SET_STATISTIC_CATEGORY = "SET_STATISTIC_CATEGORY"
export const UPDATE_SELECTED_GROUP = "UPDATE_SELECTED_GROUP"
export const UPDATE_SELECTED_ITEM = "UPDATE_SELECTED_ITEM"
export const SET_SELECTED_STATISTIC_CATEGORY = "SET_SELECTED_STATISTIC_CATEGORY"
export const UPDATE_WIDGET_SPECIFIC_STATISTIC_CATEGORIES = "UPDATE_WIDGET_SPECIFIC_STATISTIC_CATEGORIES"
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
export const SET_STATISTIC_Function = "SET_STATISTIC_Function"
export const SET_STATISTIC_DisplayFormat = "SET_STATISTIC_DisplayFormat"
export const SET_DM_ISDIRTY = "SET_DM_ISDIRTY"
export const SET_DM_ISLOADED = "SET_DM_ISLOADED"
export const CLEAR_SELECTED_DM = "CLEAR_SELECTED_DM"
export const UPDATE_DROP_DOWNS = "UPDATE_DROP_DOWNS"
export const UPDATE_COMBO_DRILL_DOWN_OPTIONS = "UPDATE_COMBO_DRILL_DOWN_OPTIONS"
export const DEFAULT_METRICS = "DEFAULT_METRICS"

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
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetaData = getState().dataMetrics.datametricMetadata;

        if (!statisticCategories || statisticCategories.length == 0 || !datametricsMetaData)
            return dispatch(getState().notificationStore.notify('failure to load statistic Metadata, please reload', ResponseStatusEnum.Error));

        //If Categories and DM are already in store, filter them appropriately and update the state
        let selectedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory || StatisticCategoryEnum.RealTime

        dispatch({
            type: SET_STATISTIC_CATEGORY,
            selectedStatisticCategory
        })

        dispatch(getState().realTimeSettings.initiateRealTimeSettings());
        // dispatch(getState().customSettings.initiateRealTimeSettings());
        // dispatch(getState().cyReportSettings.initiateRealTimeSettings());

        // if (currentWidget.appliedSettings.dataMetrics.group)
        //     dispatch(setSelectedGroupValueAction(currentWidget.appliedSettings.dataMetrics.group))
    }
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

export function setSelectedStatisticCategoryAction(selectedStatisticCategory) {
    return (dispatch, getState) => {
        // dispatch(getState().dataMetrics.setDMisLoaded(false))
        // dispatch(getState().dataMetrics.updateDrillDownOptionsAction([]))
        // dispatch(getState().dataMetrics.CLearQuery());
        let currentWidget = getState().configurations.widget;

        dispatch({
            type: SET_SELECTED_STATISTIC_CATEGORY,
            selectedStatisticCategory,
            groupOptions: _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricMetadata, metric =>
                metric.StatisticCategory === selectedStatisticCategory &&
                metric.WidgetType === currentWidget.widgetType), (obj) => {
                    return {
                        id: obj.StatisticGroupId,
                        label: obj.StatisticGroup,
                        value: obj.Id
                    }
                }), 'id')
        });
    }
}


export const ACTION_HANDLERS = {
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