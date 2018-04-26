
import { initiateComboCustomSettings, loadColumns, clearComboCustomSettings } from './combo-custom-metrics-settings.actions'
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, TOGGLE_EXPAND_COMBO_CUSTOM_QUERY, UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS, UPDATE_COMBO_CUSTOM_QUERY, UPDATE_COMBO_CUSTOM_DISPLAY_FORMATS, UPDATE_CUSTOM_COMBO_COLUMNS, TOGGLE_EXPAND_ADD_COLUMN, DEFAULT_COMBO_CUSTOM_METRICS } from './combo-custom-metrics-settings.constants';
import { CLEAR_SELECTED_COMBO_CUSTOM_SETTINGS } from '../combo-realtime-metrics-settings/combo-realtime-metrics-settings.constants';

export const ACTION_HANDLERS = {
    [UPDATE_COMBO_CUSTOM_QUERY]: (state, action) => {
        return Object.assign({}, state, {
            query: action.query
        })
    },
    [TOGGLE_EXPAND_COMBO_CUSTOM_QUERY]: (state, action) => {
        return Object.assign({}, state, {
            isCustomQueryExpanded: action.isCustomQueryExpanded
        })
    },
    [UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS]: (state, action) => {
        return Object.assign({}, state, {
            columnOptions: action.columnOptions,
            columns: action.columns,
            hideConfigureColumn: action.hideConfigureColumn
        })
    },
    [UPDATE_COMBO_CUSTOM_DISPLAY_FORMATS]: (state, action) => {
        return Object.assign({}, state, {
            displayFormatOptions: action.displayFormatOptions
        })
    },
    [UPDATE_CUSTOM_COMBO_COLUMNS]: (state, action) => {
        return Object.assign({}, state, {
            columns: action.columns
        })
    },
    [TOGGLE_EXPAND_ADD_COLUMN]: (state, action) => {
        return Object.assign({}, state, {
            addColumnExpanded: action.addColumnExpanded
        })
    },
    [DEFAULT_COMBO_CUSTOM_METRICS]: (state, action) => {
        return Object.assign({}, state, {
            query: action.query,
            columns: action.columns
        })
    },
    [CLEAR_SELECTED_COMBO_CUSTOM_SETTINGS]: (state, action) => {
        return Object.assign({}, state, { ...action.customSettings })
    }
}

export const comboCustomInitialState = {
    isCustomQueryExpanded: true,
    query: '',
    columnOptions: [],
    columns: [],
    displayFormatOptions: [],
    addColumnExpanded: true,
    hideConfigureColumn: false,
    initiateComboCustomSettings,
    loadColumns,
    clearComboCustomSettings,
};

export default function ComboCustomSettingsReducer(state = _.cloneDeep(comboCustomInitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}