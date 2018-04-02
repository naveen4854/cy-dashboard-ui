import _ from 'lodash';
import DateType from '../../enums/date-type.enum';
import {Constants}  from '../../Constants';
import moment from 'moment';
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

/**
 * To get date(mm/dd/yyyy) the based on locale
 */
export function getShortDate() {
    let dt = new Date();
    return dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
}
/**
 * To get date(dd/mm/yyyy) the based on locale
 */
export function getShortDateddmmyyyy() {
    let dt = new Date();
    return dt.getDate() + "/" + dt.getMonth() + 1 + "/" + dt.getFullYear();
}
/**
 * To get the Date Object based on timezone
 * @param {*} offsetIST 
 */
export function timezoneDate(offsetIST) {

    if (offsetIST) {
        let offsetISTValue = offsetIST.value ? offsetIST.value : offsetIST;
        let tempDate = moment(moment()).tz(offsetISTValue);
        return new Date(moment(moment()).tz(offsetISTValue).format('YYYY-MM-DDTHH:mm:ss.SSS'));
    }
}

/**
 * To get the date based on date, it will return short or long date based paramater value 
 * @param {*} dt 
 * @param {*} displayDateFormat 
 */
export function getDateBasedOnFormats(dt, displayDateFormat) {
    switch (displayDateFormat) {
        case "long":
            return this.getLongDateWithTimezone(dt);
        case "MMddyyyy":
            return dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getUTCFullYear();
        default:
            return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getUTCFullYear()

    }

}

export const dateFormats = [
    {
        id: 1,
        value: 1,
        label: "long(" + getLongDate() + ")",
        type: "long"
    },
    {
        id: 2,
        value: 2,
        label: "short(MM/dd/yyyy)",
        type: "MMddyyyy"
    },
    {
        id: 3,
        value: 3,
        label: "short(dd/MM/yyyy)",
        type: "ddMMyyyy"
    }
];

/**
 * To get the long date based on locale 
 */
export function getLongDate() {
    let dt = new Date();
    return Constants.months[dt.getMonth()] + " " + dt.getDate() + " " + dt.getFullYear();
}
/**
 *To get the long date time based  on time zone 
 * @param {*} dt 
 */
export function getLongDateWithTimezone(dt) {
    return Constants.months[dt.getMonth()] + " " + dt.getDate() + " " + dt.getFullYear();
}

/**
 *To get the current day based  on time zone 
 * @param {*} dt 
 */
export function getDay(offsetIST) {
    let dt = this.timezoneDate(offsetIST);
    return dt.getDay();
}

/**
 *To get the list of days
 * @param {*} dt 
 */
export function getDays() {
    return days;
}
/**
 * To convert the date based hours and time format.
 * @param {*} dateTime 
 * @param {*} timeFormat 
 * @param {*} hoursFormat 
 */
export function timeFormat(dateTime, timeFormat, hoursFormat = 1) {
    const
        takeTwelve = (n, h) => n > 12 ? n - h : n,
        addZero = n => n < 10 ? "0" + n : n;
    let h, m, s, t, amPm;
    var k = hoursFormat == 1 ? 0 : 12;
    h = addZero(takeTwelve(dateTime.getHours(), k));
    m = addZero(dateTime.getMinutes());
    s = addZero(dateTime.getSeconds());
    t = timeFormat == 1 ? `${h}:${m}:${s}` : `${m}:${s}`;
    amPm = dateTime.getHours() >= 12 ? "PM" : "AM";
    amPm = timeFormat == 1 && hoursFormat != 1 ? amPm : '';
    return t + ' ' + amPm;
}

/**
 * To get the date based on timezone, it will return short or long date based paramater value
 * @param {*} offsetIST 
 * @param {*} displayDateFormat 
 */
export function returnDate(offsetIST, displayDateFormat) {

    if (offsetIST) {
        let offsetISTValue = offsetIST.value ? offsetIST.value : offsetIST;
        let tempDate = moment(moment()).tz(offsetISTValue);
        let dt = new Date(moment(moment()).tz(offsetISTValue).format('YYYY-MM-DDTHH:mm:ss.SSS'))

        //let dt = this.timezoneDate(offsetIST);
        switch (displayDateFormat) {
            case DateType.long:
                return this.getLongDateWithTimezone(dt);
            case DateType.MMddyyyy:
                return dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getUTCFullYear();
            default:
                return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getUTCFullYear()
        }
    }
}
