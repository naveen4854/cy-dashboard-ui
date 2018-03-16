import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export class ClockWidget extends Widget {
    constructor() {
        super()
    }
    widgetType = WidgetTypeEnum.Clock;

    width = 250;
    height = 250;
    title = moment.tz.guess();
    widgetBody = {
        ClockbackgroundColor: {
            r: 255, g: 255, b: 255, a: 1
        }
        ,
        ClockOuterbackgroundColor: {
            r: 0, g: 119, b: 162, a: 1
        }
        ,
        clockRoundingColor: {
            r: 14, g: 144, b: 197, a: 1
        }
    }

    numberStyles = {
        color: {
            r: 0, g: 0, b: 0, a: 1
        },

        fontSize: '15'
    }
    TimezoneStyles = {
        color: {
            r: 255, g: 255, b: 255, a: 1
        },

        fontSize: '12'
    }
    DateStyles = {
        color: {
            r: 0, g: 0, b: 0, a: 1
        },

        fontSize: '15'
    }
    DaysStyles = {
        color: {
            r: 0, g: 0, b: 0, a: 1
        },
        fontSize: '12'
    }
    CurrentDayColor = { r: 240, g: 10, b: 10, a: 1 }
    TimeStyles = {
        color: {
            r: 0, g: 0, b: 0, a: 1
        },
        fontSize: '25'
    }
    hands = {
        hourhandcolor: {
            r: 255, g: 0, b: 0, a: 1
        },
        minutehandcolor: {
            r: 0, g: 128, b: 0, a: 1
        },
        secondhandcolor: {
            r: 165, g: 42, b: 42, a: 1
        }
    }
    selectedTimeZoneItem = moment.tz.guess()
    isAnalog = true
    timezoneid = moment.tz.guess()
    selectedHoursFormat = _.first(ConstantValues.hoursFormat)
    selectedTimeFormat = _.first(ConstantValues.timeFormat)
    selectedDateFormat = _.first(ConstantValues.dateFormats)
    displayDate = false
    displayDays = true
    tzoneText = ''
}