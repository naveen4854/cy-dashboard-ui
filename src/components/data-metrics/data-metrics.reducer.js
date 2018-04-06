import * as dataMetricsService from './data-metrics-service';
import { StatisticCategoryEnum, WidgetTypeEnum, ResponseStatusEnum } from '../../shared/enums';
import { UPDATE_DASHBOARD_WIDGET } from '../../dashboard/dashboard.reducer';
import { UPDATE_CONFIGURATIONS_WIDGET } from '../widget-configurations/widget-configurations.reducer';
import { saveComboRealTimeMetrics } from './data-metrics.actions';

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

export function LoadDataMetricsMetaData(dashboardId) {
    return (dispatch, getState) => {
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;
        if (statisticCategories && statisticCategories.length != 0 && datametricsMetadata) {
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
                        datametricsMetadata = _.map(response.data, (obj) => {
                            return DataMetricsMetadataMapper(obj);
                        });

                        if (!datametricsMetadata)
                            return;

                        // Dispatching basic data for DM - categories and groups
                        dispatch({
                            type: UPDATE_DATA_METRICS,
                            statisticCategories,
                            statisticCategoryOptions: [],
                            datametricsMetadata
                        });
                    }
                });
            }
        }).catch((error) => {
            dispatch(getState().notificationStore.notify('failure to load statistic Metadata, please reload', ResponseStatusEnum.Error))
        });
    }
}

export function initializeStatisticMetadata() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);

        if (currentWidget.widgetType == WidgetTypeEnum.Clock)
            return

        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;
        if (!statisticCategories || statisticCategories.length == 0 || !datametricsMetadata)
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
            datametricsMetadata
        });

        if (currentWidget.widgetType == WidgetTypeEnum.Combo) {
            dispatch(getState().comboRealTimeSettings.initiateComboRealTimeSettings());
            //dispatch(getState().comboCustomSettings.initiateComboCustomSettings());
        }
        else {
            dispatch(getState().realTimeSettings.initiateRealTimeSettings());
            dispatch(getState().cyReportSettings.initiateCyReportSettings());
            dispatch(getState().customSettings.initiateCustomMetricsSettings());
        }
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
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;
        let dataMetrics = { ..._.cloneDeep(initialState), statisticCategories, datametricsMetadata }
        dispatch({
            type: CLEAR_SELECTED_DM,
            dataMetrics
        })

        dispatch(getState().realTimeSettings.clearRealTimeSettings())
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
        // groupOptions: _.uniqBy(_.map(_.filter(getState().dataMetrics.datametricsMetadata, metric =>
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

        dispatch(getState().configurations.previewWidget(updatedWidget));
        dispatch(getState().threshold.updateDisplayFormat(settings.displayFormat.id));
    }
}

export const ACTION_HANDLERS = {
    [UPDATE_DATA_METRICS]: (state, action) => {
        return Object.assign({}, state, {
            statisticCategories: action.statisticCategories,
            statisticCategoryOptions: action.statisticCategoryOptions,
            datametricsMetadata: action.datametricsMetadata
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
    datametricsMetadata: {},
    LoadDataMetricsMetaData,
    initializeStatisticMetadata,
    clearSelectedDM,
    saveDataMetrics,
    saveComboRealTimeMetrics
};

export default function DataMetricsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}