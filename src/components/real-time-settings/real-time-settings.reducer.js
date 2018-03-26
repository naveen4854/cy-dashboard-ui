import { initiateRealTimeSettings } from './real-time-settings.actions'

export const DEFAULT_REALTIME_METRICS = "DEFAULT_REALTIME_METRICS"
export const UPDATE_REALTIME_METRICS = "UPDATE_REALTIME_METRICS"
export const UPDATE_REALTIME_SELECTED_GROUP = "UPDATE_REALTIME_SELECTED_GROUP"
export const UPDATE_REALTIME_ITEMS = "UPDATE_REALTIME_ITEMS"
export const SET_REALTIME_ITEM = "SET_REALTIME_ITEM"
export const UPDATE_REALTIME_FUNCTIONS = "UPDATE_REALTIME_FUNCTIONS"
export const UPDATE_REALTIME_SELECTED_FUNCTION = "UPDATE_REALTIME_SELECTED_FUNCTION"
export const UPDATE_REALTIME_DISPLAY_FORMATS = "UPDATE_REALTIME_DISPLAY_FORMATS"
export const UPDATE_REALTIME_SELECTED_DISPLAY_FORMAT = "UPDATE_REALTIME_SELECTED_DISPLAY_FORMAT"
export const UPDATE_DRILL_DOWN_METADATA = "UPDATE_DRILL_DOWN_METADATA"
export const TOGGLE_DRILL_DOWN = "TOGGLE_DRILL_DOWN"
export const UPDATE_DRILL_DOWN_OPTIONS = "UPDATE_DRILL_DOWN_OPTIONS"

export const ACTION_HANDLERS = {
    [DEFAULT_REALTIME_METRICS]: (state, action) => {
        return Object.assign({}, state, {
            selectedGroup: action.selectedGroup,
            selectedItem: action.selectedItem,
            selectedFunction: action.selectedFunction,
            selectedDisplayFormat: action.selectedDisplayFormat
        })
    },
    [UPDATE_REALTIME_METRICS]: (state, action) => {
        return Object.assign({}, state, {
            statisticCategories: action.statisticCategories,
            statisticCategoryOptions: action.statisticCategoryOptions,
            datametricMetadata: action.datametricsMetaData,
            groupOptions: action.groupOptions
        })
    },
    [UPDATE_REALTIME_SELECTED_GROUP]: (state, action) => {
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
    [UPDATE_REALTIME_ITEMS]: (state, action) => {
        return Object.assign({}, state, {
            itemOptions: action.itemOptions,
            selectedItem: {},
            selectedFunction: {},
            selectedDisplayFormat: {},
            selectedWidgetforStatisticItem: {},
            functionOptions: [],
            displayFormatOptions: [],
            applicableWidgets: []
        })
    },
    [SET_REALTIME_ITEM]: (state, action) => {
        return Object.assign({}, state, {
            selectedItem: action.selectedItem,
        })
    },
    [UPDATE_REALTIME_FUNCTIONS]: (state, action) => {
        return Object.assign({}, state, {
            // selectedFunction: action.functionOptions.length > 0 ? action.functionOptions[0] : {},
            functionOptions: action.functionOptions
        })
    },
    [UPDATE_REALTIME_SELECTED_FUNCTION]: (state, action) => {
        return Object.assign({}, state, {
            selectedFunction: action.selectedFunction,
            selectedDisplayFormat: {},
        })
    },
    [UPDATE_REALTIME_DISPLAY_FORMATS]: (state, action) => {
        return Object.assign({}, state, {
            // selectedDisplayFormat: action.displayFormatOptions.length > 0 ? action.displayFormatOptions[0] : {},
            displayFormatOptions: action.displayFormatOptions
        })
    },
    [UPDATE_REALTIME_SELECTED_DISPLAY_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            selectedDisplayFormat: action.selectedDisplayFormat,
        })
    },
    [UPDATE_DRILL_DOWN_METADATA]: (state, action) => {
        return Object.assign({}, state, {
            drillDownOptions: action.drillDownOptions,
            isDrillDownMultiSelect: action.isDrillDownMultiSelect,
            drillDownDefaulted: action.drillDownDefaulted
        })
    },
    [TOGGLE_DRILL_DOWN]: (state, action) => {
        return Object.assign({}, state, {
            openDrillDown: action.openDrillDown
        })
    },
    [UPDATE_DRILL_DOWN_OPTIONS]: (state, action) => {
        return Object.assign({}, state, {
            drillDownOptions: action.drillDownOptions
        })
    }
}

const initialState = {
    initiateRealTimeSettings
};

export default function RealTimeSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}