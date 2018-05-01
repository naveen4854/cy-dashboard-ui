import { StatisticCategoryEnum, ResponseStatusEnum, DisplayFormatEnum } from "../../shared/enums";
import { DEFAULT_CUSTOM_METRICS, UPDATE_CUSTOM_METRICS_SP_DATA, SET_SELECTED_STORED_PROC, SET_CUSTOM_QUERY, UPDATE_PARAMS, CLEAR_SELECTED_CUSTOM_SETTINGS, customSettingsInitialState } from "./custom-metrics-settings.reducer";
import * as dataMetricsService from '../data-metrics/data-metrics-service';
import { Constants } from "../../shared/constants";

export function initiateCustomMetricsSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        let selectedStatisticCategory = getState().dataMetrics.statisticCategory;

        let storeProcOptions = getState().customSettings.storeProcOptions;
        let storeProcsData = getState().customSettings.storeProcsData;
        if (!storeProcsData || !storeProcOptions || storeProcsData.length == 0 || storeProcOptions.length == 0)
            dispatch(getState().customSettings.getStoredProcedures());

        let appliedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory
        if (appliedStatisticCategory == StatisticCategoryEnum.Custom) {
            dispatch({
                type: DEFAULT_CUSTOM_METRICS,
                selectedStoreProc: currentWidget.appliedSettings.dataMetrics.selectedStoreProc || {},
                query: currentWidget.appliedSettings.dataMetrics.query || {},
                filterStoreProcs: currentWidget.appliedSettings.dataMetrics.filterStoreProcs || []
            })
        }
    }
}

export function getStoredProcedures() {
    return (dispatch, getState) => {
        dispatch(getState().spinnerStore.BeginTask());
        dataMetricsService.getStoreProcs().then(function (response) {
            var storeProcsData = response.data;

            var uniqStoreProcData = _.uniqBy(storeProcsData, u => {
                return u.ProcedureName
            });

            const storeProcOptions = _.map(uniqStoreProcData, (item, key) => {
                return {
                    label: item.ProcedureName,
                    value: item.ProcedureName
                };
            });

            storeProcOptions.splice(0, 0, {
                value: 'Select Custom Query',
                label: 'Select Custom Query'
            });

            dispatch({
                type: UPDATE_CUSTOM_METRICS_SP_DATA,
                storeProcOptions,
                storeProcsData
            })
            dispatch(getState().spinnerStore.EndTask());
        }).catch((err) => {
            dispatch(getState().spinnerStore.EndTask());
            dispatch(getState().notificationStore.notify('couldnt load storedprocs', ResponseStatusEnum.Error))
        })
    }
}

export function setSelectedStoreProc(selectedStoreProc) {
    return (dispatch, getState) => {
        let storeProcsData = getState().customSettings.storeProcsData;
        let storeProcParams = _.filter(_.cloneDeep(storeProcsData), x => x.ProcedureName == selectedStoreProc.label);
        dispatch({
            type: SET_SELECTED_STORED_PROC,
            selectedStoreProc: selectedStoreProc,
            storeProcParams
        })
    }
}

export function setCustomQuery(query) {
    return {
        type: SET_CUSTOM_QUERY,
        query
    }
}

export function updateParamValue(value, i) {
    return (dispatch, getState) => {
        let storeProcParams = getState().customSettings.storeProcParams;
        if (!storeProcParams)
            return
        let updatedStoreProcParams = storeProcParams.map((param, index) => {
            if (i !== index) {
                return param;
            }
            return { ...param, vl: value };
        })

        dispatch({
            type: UPDATE_PARAMS,
            storeProcParams: updatedStoreProcParams
        })
    }
}

export function saveCustomMetrics(settings) {
    return (dispatch, getState) => {
        let settings = {
            selectedStoreProc: getState().customSettings.selectedStoreProc,
            query: getState().customSettings.query,
            filterStoreProcs: getState().customSettings.storeProcParams
        }
        dispatch(getState().spinnerStore.BeginTask());
        let updatedQuery = settings.query;
        //TOOD: use loadColumns
        dataMetricsService.validateQuery(updatedQuery).then((response) => {
            dispatch(getState().spinnerStore.EndTask());
            if (!response.data.Status) {

            }
            if (response.data && response.data.Status) {
                dataMetricsService.loadColumns(updatedQuery).then(function (response) {
                    if (response.status === 200) {
                        // setdisplayformat
                        let columnDataTypeName = response.data[0].DataTypeName;
                        let displayFormat = { id: DisplayFormatEnum.Text };
                        if (Constants.NumericTypes.indexOf(columnDataTypeName) != -1) {
                            displayFormat = { id: DisplayFormatEnum.Number };
                        }
                        else if (Constants.DateTypes.indexOf(columnDataTypeName) != -1) {
                            displayFormat = { id: DisplayFormatEnum.Date_Time }; // Since we display date as is, we are treating here it to be of Text display format.
                        }
                        dispatch(getState().dataMetrics.saveDataMetrics({ ...settings, displayFormat }));
                        dispatch(getState().realTimeSettings.clearRealTimeSettings());
                        dispatch(getState().cyReportSettings.clearCyReportSettings());
                    }
                })
            }
        }).catch((error) => {
            dispatch(getState().spinnerStore.EndTask());
            dispatch(getState().notificationStore.notify(error.response.data.Messages, ResponseStatusEnum.Error));
        })
    }
}

export function clearCustomSettings() {
    return (dispatch, getState) => {
        let storeProcOptions = getState().customSettings.storeProcOptions;
        let storeProcsData = getState().customSettings.storeProcsData;
        let customSettings = { ...customSettingsInitialState, storeProcOptions, storeProcsData }
        dispatch({
            type: CLEAR_SELECTED_CUSTOM_SETTINGS,
            customSettings
        })
    }
}