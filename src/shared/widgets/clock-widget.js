import moment from 'moment';
import timezone from 'moment-timezone';

import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";
import { Constants } from "../constants";
import { DateZone } from "../lib";
import { rgba } from '../../utilities';

export default class ClockWidget extends Widget {
    constructor(zIndex) {
        //ClockWidget not avaiable for combo hence iscombo, isheader set to undefined
        super(zIndex)
    }
    widgetType = WidgetTypeEnum.Clock;
    width = 250; height = 250;
    title = moment.tz.guess();
    widgetBody = {
        clockbackgroundColor: rgba(255, 255, 255, 1),
        clockOuterbackgroundColor: rgba(0, 119, 162, 1),
        clockRoundingColor: rgba(14, 144, 197, 1)
    };

    numberStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: '15'
    };
    timezoneStyles = {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: '12'
    };
    dateStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: '15'
    };
    daysStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: '12'
    };
    currentDayColor = rgba(240, 10, 10, 1);
    timeStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: '25'
    };
    hands = {
        hourhandcolor: rgba(255, 0, 0, 1),
        minutehandcolor: rgba(0, 128, 0, 1),
        secondhandcolor: rgba(165, 42, 42, 1)
    };

    appliedSettings = {
        ...this.appliedSettings,
        dataMetrics: {
            selectedTimeZoneItem: moment.tz.guess(),
            title: moment.tz.guess(),
            timezoneid: moment.tz.guess(),
            timezoneLabel: undefined,
            isAnalog: true,
            tzoneText: '',
            selectedHoursFormat: _.first(Constants.hoursFormat),
            selectedTimeFormat: _.first(Constants.timeFormat),
            selectedDateFormat: _.first(DateZone.dateFormats),
            displayDate: false,
            displayDays: true,
        }
    }

}