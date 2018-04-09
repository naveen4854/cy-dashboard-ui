
import { initiateComboCustomSettings } from './combo-custom-metrics-settings.actions'
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, TOGGLE_EXPAND_COMBO_CUSTOM_QUERY, UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS, UPDATE_COMBO_CUSTOM_QUERY, UPDATE_COMBO_CUSTOM_DISPLAY_FORMATS, UPDATE_CUSTOM_COMBO_COLUMNS, TOGGLE_EXPAND_ADD_COLUMN } from './combo-custom-metrics-settings.constants';

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
            columnOptions: action.columnOptions
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
}

const initialState = {
    isCustomQueryExpanded: true,
    query: '',
    columnOptions: [],
    columns: [],
    displayFormatOptions: [],
    addColumnExpanded: true,
    initiateComboCustomSettings
};

export default function ComboCustomSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}