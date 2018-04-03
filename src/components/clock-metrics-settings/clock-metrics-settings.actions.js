import * as dataMetricsService from '../data-metrics/data-metrics-service';
import { Constants } from '../../shared/constants';
import { DateZone } from '../../shared/lib';
import { TIMEZONE_LIST, UPDATE_SELECTED_TIME_ZONE, INITIALIZE_CLOCK_SETTINGS, UPDATE_SELECTED_HOURS_FORMAT, UPDATE_SELECTED_TIME_FORMAT, UPDATE_SELECTED_DATE_FORMAT, UPDATE_TIMEZONE_LABEL, UPDATE_CLOCK, RESET_CLOCK, UPDATE_DISPLAY_DATE, UPDATE_DISPLAY_DAYS } from './clock-metrics-settings.reducer';

export function initializeClocksettings() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let metrics = currentWidget.appliedSettings.dataMetrics

        var hoursFormat = _.find(Constants.hoursFormat, (i) => i.value == metrics.selectedHoursFormat)
        var timeFormat = _.find(Constants.timeFormat, (i) => i.value == metrics.selectedTimeFormat)
        var dateFormat = _.find(DateZone.dateFormats, (i) => i.value == metrics.selectedDateFormat)
        dispatch({
            type: INITIALIZE_CLOCK_SETTINGS,
            payload: {
                selectedTimeZoneItem: _.find(getState().clockSettings.timeZonesList, (i) => i.value == (metrics.selectedTimeZoneItem.value ? metrics.selectedTimeZoneItem.value : metrics.selectedTimeZoneItem)),
                isAnalog: metrics.isAnalog,
                displayDate: metrics.displayDate,
                displayDays: metrics.displayDays,
                selectedHoursFormat: hoursFormat ? hoursFormat : _.first(Constants.hoursFormat),
                selectedTimeFormat: timeFormat ? timeFormat : _.first(Constants.timeFormat),
                selectedDateFormat: dateFormat ? dateFormat : _.first(DateZone.dateFormats),
                tzoneText: metrics.tzoneText,
            }
        })
    }
}

export function setTimeZonesList() {
    return (dispatch, getState) => {
        let timeZonesListFromStore = getState().clockSettings.timeZonesList;
        if (!timeZonesListFromStore || timeZonesListFromStore.length == 0) {
            dataMetricsService.getTimeZones().then((response) => {
                let timeZonesList = response.data;
                dispatch({
                    type: TIMEZONE_LIST,
                    timeZonesList: timeZonesList
                })
            })
        }
    }
}

export function setSelectedHoursFormatAction(selectedHoursFormat) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_SELECTED_HOURS_FORMAT,
            selectedHoursFormat
        })
    }
}
export function setSelectedTimeFormatAction(selectedTimeFormat) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_SELECTED_TIME_FORMAT,
            selectedTimeFormat
        })
    }
}
export function setSelectedDateFormatAction(selectedDateFormat) {
    return (dispatch, getState) => {
        dispatch(
            {
                type: UPDATE_SELECTED_DATE_FORMAT,
                selectedDateFormat
            }
        )
    }
}
export function setSelectedTimeZoneAction(selectedTimeZoneItem) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_SELECTED_TIME_ZONE,
            selectedTimeZoneItem
        })

        // dispatch({
        //   type: UPDATE_TIMEZONE_LABEL,
        //   tzoneText: selectedTimeZoneItem.label
        // })
    }
}

export function setTimeZonelabelAction(tzoneText) {
    return (dispatch, getState) => {

        dispatch({
            type: UPDATE_TIMEZONE_LABEL,
            tzoneText
        })
    }
}
export function updateClocklAction(isAnalog) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CLOCK,
            isAnalog
        })
    }
}
export function DeleteWidgetAction() {
    return (dispatch, getState) => {
        dispatch({
            type: RESET_CLOCK
        })
    }
}
export function updateDisplayDateAction(displayDate) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_DISPLAY_DATE,
            displayDate

        })
    }
}
export function updateDisplayDaysAction(displayDays) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_DISPLAY_DAYS,
            displayDays
        })
    }
}

export function updateWidget() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let clockSettings = getState().clockSettings;
        var timeZone = clockSettings.selectedTimeZoneItem;
        let dataMetrics = {
            selectedTimeZoneItem: timeZone,
            title: clockSettings.tzoneText == "" ? timeZone.label : clockSettings.tzoneText,
            timezoneid: timeZone.value,
            timezoneLabel: timeZone.label,
            isAnalog: clockSettings.isAnalog,
            tzoneText: clockSettings.tzoneText,
            selectedHoursFormat: clockSettings.selectedHoursFormat.value,
            selectedTimeFormat: clockSettings.selectedTimeFormat.value,
            selectedDateFormat: clockSettings.selectedDateFormat.value,
            displayDate: clockSettings.displayDate,
            displayDays: clockSettings.displayDays,
        }
        let updatedWidget = {
            ...currentWidget,
            title: clockSettings.tzoneText == "" ? timeZone.label : clockSettings.tzoneText,
            appliedSettings: {
                ...currentWidget.appliedSettings,
                dataMetrics
            }
        }
        dispatch(getState().configurations.updateDashboardWidget(updatedWidget));
    }
}