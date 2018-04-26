import { getStoredProcedures, initiateCustomMetricsSettings, clearCustomSettings, saveCustomMetrics } from './custom-metrics-settings.actions';

export const DEFAULT_CUSTOM_METRICS = 'DEFAULT_CUSTOM_METRICS';
export const UPDATE_CUSTOM_METRICS_SP_DATA = 'UPDATE_CUSTOM_METRICS_SP_DATA';
export const SET_SELECTED_STORED_PROC = 'SET_SELECTED_STORED_PROC';
export const SET_CUSTOM_QUERY = 'SET_CUSTOM_QUERY';
export const UPDATE_PARAMS = 'UPDATE_PARAMS';
export const CLEAR_SELECTED_CUSTOM_SETTINGS = 'CLEAR_SELECTED_CUSTOM_SETTINGS';

export const ACTION_HANDLERS = {
    [UPDATE_CUSTOM_METRICS_SP_DATA]: (state, action) => {
        return Object.assign({}, state, {
            storeProcOptions: action.storeProcOptions,
            storeProcsData: action.storeProcsData
        })
    },
    [SET_SELECTED_STORED_PROC]: (state, action) => {
        return Object.assign({}, state, {
            selectedStoreProc: action.selectedStoreProc,
            storeProcParams: action.storeProcParams
        })
    },
    [SET_CUSTOM_QUERY]: (state, action) => {
        return Object.assign({}, state, {
            query: action.query
        })
    },
    [UPDATE_PARAMS]: (state, action) => {
        return Object.assign({}, state, {
            storeProcParams: action.storeProcParams
        })
    },
    [CLEAR_SELECTED_CUSTOM_SETTINGS]: (state, action) => {
        return Object.assign({}, state, action.customSettings)
    }
}

export const customSettingsInitialState = {
    storeProcsData: [],
    selectedStoreProc: {},
    storeProcOptions: [],
    storeProcParams: [],
    query: '',
    getStoredProcedures,
    initiateCustomMetricsSettings,
    clearCustomSettings,
    saveCustomMetrics
};

export default function CustomMetricsSettingsReducer(state = _.cloneDeep(customSettingsInitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}