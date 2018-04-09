
import { initiateComboCustomSettings } from './combo-custom-metrics-settings.actions'
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, TOGGLE_EXPAND_COMBO_CUSTOM_QUERY, UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS, UPDATE_COMBO_CUSTOM_QUERY } from './combo-custom-metrics-settings.constants';

export const ACTION_HANDLERS = {
    [UPDATE_COMBO_CUSTOM_QUERY]: (state, action) => {
        return Object.assign({}, state, {
            query: action.query
        })
    },
    [TOGGLE_EXPAND_COMBO_CUSTOM_QUERY]: (state, action) => {
        return Object.assign({}, state, {
            isCustomQueryExpanded: !state.isCustomQueryExpanded
        })
    },
    [UPDATE_COMBO_CUSTOM_COLUMN_OPTIONS]: (state, action) => {
        return Object.assign({}, state, {
            columOptions: action.columOptions
        })
    }
}

const initialState = {
    isCustomQueryExpanded: true,
    query: '',
    columOptions: [],
    columns: []
};

export default function ComboCustomSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}