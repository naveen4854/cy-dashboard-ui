
import { initiateComboRealTimeSettings } from './combo-realtime-metrics-settings.actions'
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, UPDATE_COMBO_SELECTED_GROUP, UPDATE_COMBO_STATISTIC_ITEMS, SET_COMBO_SELECTED_STATISTIC_ITEMS } from './combo-realtime-metrics-settings.constants';
import { UPDATE_COMBO_DRILL_DOWN_METADATA } from '../data-metrics/data-metrics.reducer';

export const ACTION_HANDLERS = {
    [SET_COMBO_REALTIME_STATISTIC_GROUPS]: (state, action) => {
        return Object.assign({}, state, {
            groupOptions: action.groupOptions
        })
    },
    [UPDATE_COMBO_SELECTED_GROUP]: (state, action) => {
        return Object.assign({}, state, {
            selectedGroup: action.selectedGroup
        })
    },
    [UPDATE_COMBO_STATISTIC_ITEMS]: (state, action) => {
        return Object.assign({}, state, {
            statisticItems: action.statisticItems
        })
    },
    [UPDATE_COMBO_DRILL_DOWN_METADATA]:  (state, action) => {
        return Object.assign({}, state, {
            selectedDrilldownOptions: action.selectedDrilldownOptions,
            drillDownOptions: action.drillDownOptions,
        })
    },
    [SET_COMBO_SELECTED_STATISTIC_ITEMS]: (state, action) => {
        return Object.assign({}, state, {
            comboSelectedStatisticItems: action.comboSelectedStatisticItems
        })
    },
}

const initialState = {
    groupOptions : [],
    selectedGroup: {},
    drillDownOptions: [] ,
    selectedDrilldownOptions:[],
    statisticItems: [],
    comboSelectedStatisticItems: [],

    initiateComboRealTimeSettings,
    
};

export default function ComboRealTimeMetricsSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}