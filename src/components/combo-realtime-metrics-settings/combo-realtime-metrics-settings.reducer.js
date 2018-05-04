
import { initiateComboRealTimeSettings, getComboDrillDownMetaData, clearComboRealTimeSettings } from './combo-realtime-metrics-settings.actions'
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, UPDATE_COMBO_SELECTED_GROUP, UPDATE_COMBO_STATISTIC_ITEMS, SET_COMBO_SELECTED_STATISTIC_ITEMS, UPDATE_COMBO_REALTIME_DISPLAYNAME, SET_COMBO_REALTIME_STATISTIC_ITEM, UPDATE_COMBO_REALTIME_FUNCTIONS, UPDATE_COMBO_REALTIME_SELECTED_FUNCTION, UPDATE_COMBO_REALTIME_DISPLAY_FORMATS, UPDATE_COMBO_REALTIME_SELECTED_DISPLAY_FORMAT, UPDATE_COMBO_REALTIME_APPLICABLE_WIDGETS, SET_COMBO_REALTIME_APPLICABLE_WIDGET, UPDATE_COMBO_DRILL_DOWN_METADATA, UPDATE_COMBO_REALTIME_TOGGLE_ADD, SET_COMBO_REALTIME_STATISTIC_COLUMNS, UPDATE_COMBO_REALTIME_RESET_ADD, DEFAULT_COMBO_REALTIME_METRICS, CLEAR_SELECTED_COMBO_REALTIME_SETTINGS, COMBO_REALTIME_SET_SELECTED_COLUMN, UPDATE_COMBO_REALTIME_TOGGLE_DRILL_DOWN, UPDATE_COMBO_REALTIME_STATISTIC_COLUMNS } from './combo-realtime-metrics-settings.constants';

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
            comboRTDefaulted: action.comboRTDefaulted
        })
    },
    [SET_COMBO_SELECTED_STATISTIC_ITEMS]: (state, action) => {
        return Object.assign({}, state, {
            comboSelectedStatisticColumns: action.comboSelectedStatisticColumns,
            comboRTDefaulted: action.comboRTDefaulted
        })
    },
    [UPDATE_COMBO_REALTIME_DISPLAYNAME]: (state, action) => {
        return Object.assign({}, state, {
            displayName: action.displayName
        })
    },

    [SET_COMBO_REALTIME_STATISTIC_ITEM]: (state, action) => {
        return Object.assign({}, state, {
            selectedItem: action.selectedItem,
            selectedFunction: {},
            functionOptions: [],
            displayFormatOptions: [],
            selectedDisplayFormat: {},
            applicableWidgets: [],
            selectedWidget: {},
            displayName: ''
        })
    },
    [UPDATE_COMBO_REALTIME_FUNCTIONS]: (state, action) => {
        return Object.assign({}, state, {
            functionOptions: action.functionOptions
        })
    },
    [UPDATE_COMBO_REALTIME_SELECTED_FUNCTION]: (state, action) => {
        return Object.assign({}, state, {
            selectedFunction: action.selectedFunction,
            displayFormatOptions: [],
            selectedDisplayFormat: {},
            applicableWidgets: [],
            selectedWidget: {},
        })
    },
    [UPDATE_COMBO_REALTIME_DISPLAY_FORMATS]: (state, action) => {
        return Object.assign({}, state, {
            displayFormatOptions: action.displayFormatOptions
        })
    },
    [UPDATE_COMBO_REALTIME_SELECTED_DISPLAY_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            selectedDisplayFormat: action.selectedDisplayFormat,
            applicableWidgets: [],
            selectedWidget: {},
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
            toggleAddEdit: action.toggleAddEdit,

        })
    },
    [SET_COMBO_REALTIME_STATISTIC_COLUMNS]: (state, action) => {
        return Object.assign({}, state, {
            comboSelectedStatisticColumns: action.comboSelectedStatisticColumns
        })
    },
    [UPDATE_COMBO_REALTIME_RESET_ADD]: (state, action) => {
        return Object.assign({}, state, {
            selectedItem: action.selectedItem,
            displayName: action.displayName,
            selectedFunction: action.selectedFunction,
            selectedDisplayFormat: action.selectedDisplayFormat,
            selectedWidget: action.selectedWidget,
            functionOptions: action.functionOptions,
            applicableWidgets: action.applicableWidgets,
            displayFormatOptions: action.displayFormatOptions
        })
    },
    [DEFAULT_COMBO_REALTIME_METRICS]: (state, action) => {
        return Object.assign({}, state, {
            comboSelectedStatisticColumns: action.comboSelectedStatisticColumns,
            selectedGroup: action.selectedGroup
        })
    },
    [CLEAR_SELECTED_COMBO_REALTIME_SETTINGS]: (state, action) => {
        return Object.assign({}, state, { ...action.comboRealTimeSettings })
    },
    [COMBO_REALTIME_SET_SELECTED_COLUMN]: (state, action) => {
        return Object.assign({}, state, {
            selectedItem: action.comboSelectedStatisticColumn.item,
            selectedFunction: action.comboSelectedStatisticColumn.func,
            selectedDisplayFormat: action.comboSelectedStatisticColumn.displayFormat,
            selectedWidget: action.comboSelectedStatisticColumn.widget,
            displayName: action.comboSelectedStatisticColumn.displayName,
            columnIsDefault: action.comboSelectedStatisticColumn.isDefault,
            selectedColumnId: action.comboSelectedStatisticColumn.id
        })
    },
    [UPDATE_COMBO_REALTIME_TOGGLE_DRILL_DOWN]: (state, action) => {
        return Object.assign({}, state, {
            isDrillDownOpen: action.isDrillDownOpen
        })
    },
    [UPDATE_COMBO_REALTIME_STATISTIC_COLUMNS]: (state, action) => {
        return Object.assign({}, state, {
            comboSelectedStatisticColumns: action.comboSelectedStatisticColumns
        })
    },
}

export const comboRealTimeInitialState = {
    groupOptions: [],
    selectedGroup: {},
    drillDownOptions: [],
    selectedDrilldownOptions: [],
    statisticItems: [],
    comboSelectedStatisticColumns: [],
    selectedItem: {},
    displayName: '',
    functionOptions: [],
    selectedFunction: {},
    displayFormatOptions: [],
    selectedDisplayFormat: {},
    applicableWidgets: [],
    selectedWidget: {},
    columnIsDefault: false,
    toggleAddEdit: false,
    comboRTDefaulted: false,
    selectedColumnId: -1,
    isDrillDownOpen: false,
    initiateComboRealTimeSettings,
    getComboDrillDownMetaData,
    clearComboRealTimeSettings,
};

export default function ComboRealTimeMetricsSettingsReducer(state = _.cloneDeep(comboRealTimeInitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}