import * as dataMetricsService from './data-metrics-service';
import { StatisticCategoryEnum, WidgetTypeEnum, ResponseStatusEnum } from '../../shared/enums';
import { UPDATE_DASHBOARD_WIDGET } from '../../dashboard/dashboard.reducer';
import { UPDATE_CONFIGURATIONS_WIDGET } from '../widget-configurations/widget-configurations.constants';
import { saveComboRealTimeMetrics, saveComboCustomMetricsAction } from './data-metrics.actions';

export const UPDATE_DATA_METRICS = "UPDATE_DATA_METRICS"
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
// export const UPDATE_COMBO_DRILL_DOWN_METADATA = "UPDATE_COMBO_DRILL_DOWN_METADATA"
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
export const UPDATE_METRICS_WIDGET_DETAILS = "UPDATE_METRICS_WIDGET_DETAILS"

/**
 *  Load StatisticCategories and groups for dashboard
 * @param {*} dashboardId 
 */
export function loadDataMetricsMetaData(dashboardId) {
    return (dispatch, getState) => {
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let dataMetricsMetadata = getState().dataMetrics.dataMetricsMetadata;
        if (statisticCategories && statisticCategories.length != 0 && dataMetricsMetadata) {
             
            return new Promise(function(resolve, reject) {  
                resolve();
             });
        }

        dispatch(getState().spinnerStore.BeginTask());
        return dataMetricsService.getStatisticCategories().then(function (response) {
            return response.data;
        }).then((statisticCategories) => {
            return dataMetricsService.getStatisticGroups().then((response) => {
                let dataMetricsMetadata = _.map(response.data, (metric) => {
                    return dataMetricsMetadataMapper(metric);
                })
                dispatch({
                    type: UPDATE_DATA_METRICS,
                    statisticCategories,
                    statisticCategoryOptions: [],
                    dataMetricsMetadata
                });
                dispatch(getState().spinnerStore.EndTask());
                return 1;
            })
        }).catch(err => {
            dispatch(getState().spinnerStore.EndTask());
            dispatch(getState().notificationStore.notify('failure to load statistic Metadata, please reload', ResponseStatusEnum.Error))
        })
    }
}

export function initializeStatisticMetadata() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);

        if (currentWidget.widgetType == WidgetTypeEnum.Clock)
            return

        let statisticCategories = getState().dataMetrics.statisticCategories;
        let dataMetricsMetadata = getState().dataMetrics.dataMetricsMetadata;
        if (!statisticCategories || statisticCategories.length == 0 || !dataMetricsMetadata)
            return dispatch(getState().notificationStore.notify('failure to load statistic Metadata, please reload', ResponseStatusEnum.Error));

        let selectedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory || StatisticCategoryEnum.RealTime

        dispatch({
            type: SET_SELECTED_STATISTIC_CATEGORY,
            selectedStatisticCategory
        })

        let _categories = _.map(_.filter(statisticCategories, x => x.WidgetType === currentWidget.widgetType), (obj) => {
            return {
                label: obj.StatisticCategoryName,
                value: obj.StatisticCategory
            };
        });
        dispatch({
            type: UPDATE_DATA_METRICS,
            statisticCategories,
            statisticCategoryOptions: _categories,
            widgetType: currentWidget.widgetType,
            dataMetricsMetadata
        });

        if (currentWidget.widgetType == WidgetTypeEnum.Combo) {
            dispatch(getState().comboRealTimeSettings.initiateComboRealTimeSettings());
            dispatch(getState().comboCustomSettings.initiateComboCustomSettings());
        }
        else {
            dispatch(getState().realTimeSettings.initiateRealTimeSettings());
            dispatch(getState().cyReportSettings.initiateCyReportSettings());
            dispatch(getState().customSettings.initiateCustomMetricsSettings());
        }
    }
}

function dataMetricsMetadataMapper(metric) {
    return {
        StatisticGroupId: metric.dSGId,
        StatisticGroup: metric.dSG,
        StatisticItemId: metric.dSIId,
        StatisticItem: metric.dSI,
        StatisticFunctionId: metric.dSFId,
        StatisticFunction: metric.dSF,
        DisplayFormatId: metric.dDFId,
        DisplayFormat: metric.dDF,
        StatisticCategory: metric.dSC,
        WidgetType: metric.dWT,
        AllowMultiSelect: metric.dAMS,
        IsDrillDownFilter: metric.dDDF,
        IsFilterId: metric.dIF,
        Id: metric.dId
    };
}

export function clearSelectedDM() {
    return (dispatch, getState) => {
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let dataMetricsMetadata = getState().dataMetrics.dataMetricsMetadata;
        let dataMetrics = { ..._.cloneDeep(initialState), statisticCategories, dataMetricsMetadata }
        dispatch({
            type: CLEAR_SELECTED_DM,
            dataMetrics
        })

        dispatch(getState().realTimeSettings.clearRealTimeSettings());
        dispatch(getState().cyReportSettings.clearCyReportSettings());
        dispatch(getState().customSettings.clearCustomSettings());
        dispatch(getState().comboRealTimeSettings.clearComboRealTimeSettings());
        dispatch(getState().comboCustomSettings.clearComboCustomSettings());
    }
}

export function setSelectedStatisticCategory(selectedStatisticCategory) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_SELECTED_STATISTIC_CATEGORY,
            selectedStatisticCategory
        });
        // following existing application functionality where we clear unsaved metrics on category toggle
        if (selectedStatisticCategory == StatisticCategoryEnum.RealTime) {
            dispatch(getState().cyReportSettings.clearCyReportSettings());
            dispatch(getState().customSettings.clearCustomSettings());
            dispatch(getState().realTimeSettings.initiateRealTimeSettings());
        }
        if (selectedStatisticCategory == StatisticCategoryEnum.Custom) {
            dispatch(getState().realTimeSettings.clearRealTimeSettings());
            dispatch(getState().cyReportSettings.clearCyReportSettings());
            dispatch(getState().customSettings.initiateCustomMetricsSettings());
        }
        if (selectedStatisticCategory == StatisticCategoryEnum.CyReport) {
            dispatch(getState().realTimeSettings.clearRealTimeSettings());
            dispatch(getState().customSettings.clearCustomSettings());
            dispatch(getState().cyReportSettings.initiateCyReportSettings());
        }
        // dispatch(getState().dataMetrics.setDMisLoaded(false))
        // dispatch(getState().dataMetrics.updateDrillDownOptionsAction([]))
        // dispatch(getState().dataMetrics.CLearQuery());
        // let currentWidget = getState().configurations.widget;
        // groupOptions: _.uniqBy(_.map(_.filter(getState().dataMetrics.dataMetricsMetadata, metric =>
        //     metric.StatisticCategory === selectedStatisticCategory &&
        //     metric.WidgetType === currentWidget.widgetType), (obj) => {
        //         return {
        //             id: obj.StatisticGroupId,
        //             label: obj.StatisticGroup,
        //             value: obj.Id
        //         }
        //     }), 'id')

    }
}

export function saveDataMetrics(settings) {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let statisticCategory = getState().dataMetrics.statisticCategory;
        let dataMetrics = {
            ...settings,
            statisticCategory
        }
        let updatedWidget = {
            ...currentWidget,
            appliedSettings: {
                ...currentWidget.appliedSettings,
                dataMetrics
            }
        }
        // use preview widget instead
        dispatch(getState().configurations.previewWidget(updatedWidget));

        // dispatch(getState().configurations.applyWidget(updatedWidget));
        // dispatch(getState().threshold.updateDisplayFormat(settings.displayFormat.id));
    }
}

export const ACTION_HANDLERS = {
    [UPDATE_DATA_METRICS]: (state, action) => {
        return Object.assign({}, state, {
            statisticCategories: action.statisticCategories,
            statisticCategoryOptions: action.statisticCategoryOptions,
            dataMetricsMetadata: action.dataMetricsMetadata
        })
    },
    [UPDATE_METRICS_WIDGET_DETAILS]: (state, action) => {
        return Object.assign({}, state, {
            widgetType: action.widgetType
        })
    },
    [SET_SELECTED_STATISTIC_CATEGORY]: (state, action) => {
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

export const initialState = {
    widgetType: WidgetTypeEnum.Box,
    statisticCategory: StatisticCategoryEnum.RealTime,
    dataMetricsMetadata: {},
    loadDataMetricsMetaData,
    initializeStatisticMetadata,
    clearSelectedDM,
    saveDataMetrics,
    saveComboRealTimeMetrics,
    saveComboCustomMetricsAction
};

export default function DataMetricsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}