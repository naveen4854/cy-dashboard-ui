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
        ClockbackgroundColor: rgba(255, 255, 255, 1),
        ClockOuterbackgroundColor: rgba(0, 119, 162, 1),
        clockRoundingColor: rgba(14, 144, 197, 1)
    };

    numberStyles = {
        color: rgba(0, 0, 0, 1),
        fontSize: '15'
    };
    timezoneStyles = {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: '12'
    };
    dateStyles = {
        color: rgba(0, 0, 0, 1),
        fontSize: '15'
    };
    daysStyles = {
        color: rgba(0, 0, 0, 1),
        fontSize: '12'
    };
    CurrentDayColor = rgba(240, 10, 10, 1);
    timeStyles = {
        color: rgba(0, 0, 0, 1),
        fontSize: '25'
    };
    hands = {
        hourhandcolor: rgba(255, 0, 0, 1),
        minutehandcolor: rgba(0, 128, 0, 1),
        secondhandcolor: rgba(165, 42, 42, 1)
    };
    selectedTimeZoneItem = moment.tz.guess();
    isAnalog = true;
    timezoneid = moment.tz.guess();
    selectedHoursFormat = _.first(Constants.hoursFormat);
    selectedTimeFormat = _.first(Constants.timeFormat);
    isd = false; // TODO: what is this
    selectedDateFormat = _.first(DateZone.dateFormats);
    displayDate = false;
    displayDays = true;
    tzoneText = ''
}