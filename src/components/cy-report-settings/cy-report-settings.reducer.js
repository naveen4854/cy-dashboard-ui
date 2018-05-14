import { initiateCyReportSettings, clearCyReportSettings } from './cy-report-settings.actions'
import { saveCyReportMetrics } from './cy-report-settings.actions'

export const SET_CYREPORT_STATISTIC_GROUPS = 'SET_CYREPORT_STATISTIC_GROUPS';
export const UPDATE_CYREPORT_SELECTED_GROUP = 'UPDATE_CYREPORT_SELECTED_GROUP';
export const UPDATE_CYREPORT_ITEMS = 'UPDATE_CYREPORT_ITEMS';
export const SET_CYREPORT_ITEM = 'SET_CYREPORT_ITEM';
export const UPDATE_CYREPORT_FUNCTIONS = 'UPDATE_CYREPORT_FUNCTIONS';
export const UPDATE_CYREPORT_SELECTED_FUNCTION = 'UPDATE_CYREPORT_SELECTED_FUNCTION';
export const UPDATE_CYREPORT_DISPLAY_FORMATS = 'UPDATE_CYREPORT_DISPLAY_FORMATS';
export const UPDATE_CYREPORT_SELECTED_DISPLAY_FORMAT = 'UPDATE_CYREPORT_SELECTED_DISPLAY_FORMAT';
export const DEFAULT_CYREPORT_METRICS = 'DEFAULT_CYREPORT_METRICS';
export const CLEAR_SELECTED_CYREPORT_SETTINGS = 'CLEAR_SELECTED_CYREPORT_SETTINGS';

export const ACTION_HANDLERS = {
    [SET_CYREPORT_STATISTIC_GROUPS]: (state, action) => {
        return Object.assign({}, state, {
            groupOptions: action.groupOptions
        })
    },
    [DEFAULT_CYREPORT_METRICS]: (state, action) => {
        return Object.assign({}, state, {
            selectedGroup: action.selectedGroup,
            selectedItem: action.selectedItem,
            selectedFunction: action.selectedFunction,
            selectedDisplayFormat: action.selectedDisplayFormat
        })
    },
    [UPDATE_CYREPORT_SELECTED_GROUP]: (state, action) => {
        return Object.assign({}, state, {
            selectedGroup: action.selectedGroup,
            functionOptions: [],
            selectedItem: {},
            selectedFunction: {},
            selectedDisplayFormat: {},
            selectedWidgetforStatisticItem: {},
            displayFormatOptions: [],
        })
    },
    [UPDATE_CYREPORT_ITEMS]: (state, action) => {
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
    [SET_CYREPORT_ITEM]: (state, action) => {
        return Object.assign({}, state, {
            selectedItem: action.selectedItem,
            selectedFunction: {},
            functionOptions: [],
            selectedDisplayFormat: {},
            displayFormatOptions: [],
        })
    },
    [UPDATE_CYREPORT_FUNCTIONS]: (state, action) => {
        return Object.assign({}, state, {
            functionOptions: action.functionOptions
        })
    },
    [UPDATE_CYREPORT_SELECTED_FUNCTION]: (state, action) => {
        return Object.assign({}, state, {
            selectedFunction: action.selectedFunction,
            selectedDisplayFormat: {},
            displayFormatOptions: [],
        })
    },
    [UPDATE_CYREPORT_DISPLAY_FORMATS]: (state, action) => {
        return Object.assign({}, state, {
            displayFormatOptions: action.displayFormatOptions
        })
    },
    [UPDATE_CYREPORT_SELECTED_DISPLAY_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            selectedDisplayFormat: action.selectedDisplayFormat,
        })
    },
    [CLEAR_SELECTED_CYREPORT_SETTINGS]: (state, action) => {
        return Object.assign({}, state, action.cyReportSettings)
    }
}

export const cyReportInitialState = {
    groupOptions: [],
    itemOptions: [],
    functionOptions: [],
    displayFormatOptions: [],
    selectedGroup: {},
    selectedItem: {},
    selectedFunction: {},
    selectedDisplayFormat: {},
    initiateCyReportSettings,
    clearCyReportSettings,
    saveCyReportMetrics

};

export default function CyReportSettingsReducer(state = _.cloneDeep(cyReportInitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}