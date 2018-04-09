
import { initiateComboRealTimeSettings } from './combo-realtime-metrics-settings.actions'
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, UPDATE_COMBO_SELECTED_GROUP, UPDATE_COMBO_STATISTIC_ITEMS, SET_COMBO_SELECTED_STATISTIC_ITEMS, UPDATE_COMBO_REALTIME_DISPLAYNAME, SET_COMBO_REALTIME_STATISTIC_ITEM, UPDATE_COMBO_REALTIME_FUNCTIONS, UPDATE_COMBO_REALTIME_SELECTED_FUNCTION, UPDATE_COMBO_REALTIME_DISPLAY_FORMATS, UPDATE_COMBO_REALTIME_SELECTED_DISPLAY_FORMAT, UPDATE_COMBO_REALTIME_APPLICABLE_WIDGETS, SET_COMBO_REALTIME_APPLICABLE_WIDGET, UPDATE_COMBO_DRILL_DOWN_METADATA, UPDATE_COMBO_REALTIME_TOGGLE_ADD, SET_COMBO_REALTIME_STATISTIC_COLUMNS } from './combo-realtime-metrics-settings.constants';

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
    [UPDATE_COMBO_DRILL_DOWN_METADATA]: (state, action) => {
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
    [UPDATE_COMBO_REALTIME_DISPLAYNAME]: (state, action) => {
        return Object.assign({}, state, {
            displayName: action.displayName
        })
    },

    [SET_COMBO_REALTIME_STATISTIC_ITEM]: (state, action) => {
        return Object.assign({}, state, {
            selectedItem: action.selectedItem
        })
    },
    [UPDATE_COMBO_REALTIME_FUNCTIONS]: (state, action) => {
        return Object.assign({}, state, {
            functionOptions: action.functionOptions
        })
    },
    [UPDATE_COMBO_REALTIME_SELECTED_FUNCTION]: (state, action) => {
        return Object.assign({}, state, {
            selectedFunction: action.selectedFunction
        })
    },
    [UPDATE_COMBO_REALTIME_DISPLAY_FORMATS]: (state, action) => {
        return Object.assign({}, state, {
            displayFormatOptions: action.displayFormatOptions
        })
    },
    [UPDATE_COMBO_REALTIME_SELECTED_DISPLAY_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            selectedDisplayFormat: action.selectedDisplayFormat
        })
    },
    [UPDATE_COMBO_REALTIME_APPLICABLE_WIDGETS]: (state, action) => {
        return Object.assign({}, state, {
            applicableWidgets: action.applicableWidgets
        })
    },
    [SET_COMBO_REALTIME_APPLICABLE_WIDGET]: (state, action) => {
        return Object.assign({}, state, {
            selectedWidget: action.selectedWidget
        })
    },
    [UPDATE_COMBO_REALTIME_DISPLAYNAME]: (state, action) => {
        return Object.assign({}, state, {
            displayName: action.displayName
        })
    },
    [UPDATE_COMBO_REALTIME_TOGGLE_ADD]: (state, action) => {
        return Object.assign({}, state, {
            toggleAddEdit: action.toggleAddEdit
        })
    },
    [SET_COMBO_REALTIME_STATISTIC_COLUMNS]: (state, action) => {
        return Object.assign({}, state, {
            comboSelectedStatisticItems: action.comboSelectedStatisticItems
        })
    },
}

const initialState = {
    groupOptions: [],
    selectedGroup: {},
    drillDownOptions: [],
    selectedDrilldownOptions: [],
    statisticItems: [],
    comboSelectedStatisticItems: [],
    selectedItem: {},
    displayName: '',
    functionOptions: [],
    selectedFunction: {},
    displayFormatOptions: [],
    selectedDisplayFormat: {},
    applicableWidgets: [],
    selectedWidget: {},
    toggleAddEdit: false,
    initiateComboRealTimeSettings,

};

export default function ComboRealTimeMetricsSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}