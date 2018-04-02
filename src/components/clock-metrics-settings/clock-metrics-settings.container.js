import { connect } from 'react-redux'
import ClockMetricsSettingsComponent from './clock-metrics-settings.component';
import localize from '../localization/localization.hoc';
import * as ClockMetricsSettingsActions from './clock-metrics-settings.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedHoursFormat: (selectedHoursFormat) => {
            if (selectedHoursFormat && selectedHoursFormat.value) {
                dispatch(ClockMetricsSettingsActions.setSelectedHoursFormatAction(selectedHoursFormat));
            }
        },
        setSelectedTimeFormat: (selectedTimeFormat) => {
            if (selectedTimeFormat && selectedTimeFormat.value) {
                dispatch(ClockMetricsSettingsActions.setSelectedTimeFormatAction(selectedTimeFormat));
            }
        },
        setSelectedDateFormat: (selectedDateFormat) => {
            if (selectedDateFormat && selectedDateFormat.value) {
                dispatch(ClockMetricsSettingsActions.setSelectedDateFormatAction(selectedDateFormat));
            }
        },
        setSelectedTimeZone: (selectedTimeZoneItem) => {
            if (selectedTimeZoneItem) {
                dispatch(ClockMetricsSettingsActions.setSelectedTimeZoneAction(selectedTimeZoneItem));
            }
        },
        setTimeZonelabel: (tzoneText) => {
            dispatch(ClockMetricsSettingsActions.setTimeZonelabelAction(tzoneText));
        },
        updateWidgetSettings: () => {
            dispatch(ClockMetricsSettingsActions.updateWidget())
        },
        updateClock: (isAnalog) => {
            dispatch(ClockMetricsSettingsActions.updateClocklAction(isAnalog))
        },
        updateDisplayDate: (displayDate) => {
            dispatch(ClockMetricsSettingsActions.updateDisplayDateAction(displayDate))
        },
        updateDisplayDays: (displayDays) => {
            dispatch(ClockMetricsSettingsActions.updateDisplayDaysAction(displayDays))
        },
        initializeClocksettings: (data) => {
            dispatch(ClockMetricsSettingsActions.initializeClocksettings(data))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        clockSettings: state.clockSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ClockMetricsSettingsComponent))
