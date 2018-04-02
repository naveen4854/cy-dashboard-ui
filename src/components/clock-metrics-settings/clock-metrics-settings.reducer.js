import { Constants } from '../../shared/constants';
import { DateZone } from '../../shared/lib';
import {initializeClocksettings, setTimeZonesList} from './clock-metrics-settings.actions';

export const UPDATE_SELECTED_HOURS_FORMAT = "UPDATE_SELECTED_HOURS_FORMAT";
export const UPDATE_SELECTED_TIME_FORMAT = "UPDATE_SELECTED_TIME_FORMAT";
export const UPDATE_SELECTED_DATE_FORMAT = "UPDATE_SELECTED_DATE_FORMAT";
export const UPDATE_SELECTED_TIME_ZONE = "UPDATE_SELECTED_TIME_ZONE";
export const UPDATE_WIDGET_SET = "UPDATE_WIDGET_SET";
export const UPDATE_TIMEZONE_LABEL = "UPDATE_TIMEZONE_LABEL";
export const UPDATE_CLOCK = "UPDATE_CLOCK";
export const RESET_CLOCK = "RESET_CLOCK";
export const UPDATE_DISPLAY_DATE = "UPDATE_DISPLAY_DATE";
export const UPDATE_DISPLAY_DAYS = "UPDATE_DISPLAY_DAYS";
export const INITIALIZE_CLOCK_SETTINGS = "INITIALIZE_CLOCK_SETTINGS";
export const TIMEZONE_LIST = "TIMEZONE_LIST";

export const ACTION_HANDLERS = {
    [UPDATE_SELECTED_HOURS_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            selectedHoursFormat: action.selectedHoursFormat
        })
    },
    [UPDATE_SELECTED_TIME_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            selectedTimeFormat: action.selectedTimeFormat
        })
    },
    [UPDATE_SELECTED_DATE_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            selectedDateFormat: action.selectedDateFormat
        })
    },

    [UPDATE_SELECTED_TIME_ZONE]: (state, action) => {
        return Object.assign({}, state, {
            selectedTimeZoneItem: action.selectedTimeZoneItem
        })
    },
    [UPDATE_WIDGET_SET]: (state, action) => {
        return Object.assign({}, state, {
            widget: action.widget
        })
    },
    [UPDATE_TIMEZONE_LABEL]: (state, action) => {
        return Object.assign({}, state, {
            tzoneText: action.tzoneText
        })
    },
    [UPDATE_CLOCK]: (state, action) => {
        return Object.assign({}, state, {
            isAnalog: action.isAnalog,
            // selectedHoursFormat: {},
            // selectedTimeFormat: {},
            // selectedDateFormat: {},
            displayDate: action.isAnalog ? false : true
        })
    },
    [RESET_CLOCK]: (state, action) => {
        return Object.assign({}, state, {
            selectedHoursFormat: {},
            selectedTimeFormat: {},
            selectedDateFormat: {},
            selectedTimeZoneItem: {},
            tzoneText: "",
            isAnalog: true,
            displayDate: false,
            displayDays: false
        })
    },
    [UPDATE_DISPLAY_DATE]: (state, action) => {
        return Object.assign({}, state, {
            displayDate: action.displayDate
        })
    },
    [UPDATE_DISPLAY_DAYS]: (state, action) => {
        return Object.assign({}, state, {
            displayDays: action.displayDays
        })
    },
    [INITIALIZE_CLOCK_SETTINGS]: (state, action) => {
        return Object.assign({}, state, action.payload)
    },
    [TIMEZONE_LIST]: (state, action) => {
        return Object.assign({}, state, {
            timeZonesList: action.timeZonesList
        })
    },
}

const initialState = {
    selectedHoursFormat: _.first(Constants.hoursFormat),
    selectedTimeFormat: _.first(Constants.timeFormat),
    selectedDateFormat: _.first(DateZone.dateFormats),
    selectedTimeZoneItem: {},
    tzoneText: "",
    isAnalog: true,
    displayDate: true,
    displayDays: true,
    timeZonesList: [],
    initializeClocksettings,
    setTimeZonesList
}

export default function ClockMetricsSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}