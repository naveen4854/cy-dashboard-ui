import { Color } from "../shared/lib";
import { DisplayFormatEnum } from "../shared/enums";

export function getButton(text, className, handler) {
    return { text }
}

/**
 * 
 * @param {*} bgColor 
 * @param {*} fontSize 
 * @param {*} fontFamily 
 * @param {*} fontColor 
 */
export function stylesToCss(bgColor, fontSize, fontFamily, fontColor) {
    return {
        color: Color.ToString(fontColor),
        backgroundColor: Color.ToString(bgColor),
        fontFamily: fontFamily,
        fontSize: fontSize ? fontSize.toString().indexOf('px') > 0 ? fontSize : fontSize + 'px' : '12px'
    }
}

export function stylesObjToCss(stylesObj) {
    return {
        color: Color.ToString(stylesObj.color),
        backgroundColor: Color.ToString(stylesObj.backgroundColor),
        fontFamily: stylesObj.fontFamily,
        fontSize: stylesObj.fontSize ? stylesObj.fontSize.toString().indexOf('px') > 0 ? stylesObj.fontSize : stylesObj.fontSize + 'px' : '12px'
    }
}

export function stylesToCssSVG(bgColor, fontSize, fontFamily, fontColor) {
    return {
        color: Color.ToString(fontColor),
        backgroundColor: Color.ToString(bgColor),
        fontFamily: fontFamily,
        fontSize: fontSize ? fontSize : 12
    }
}

export function stylesObjToCssSVG(stylesObj) {
    return {
        color: Color.ToString(stylesObj.color),
        backgroundColor: Color.ToString(stylesObj.backgroundColor),
        fontFamily: stylesObj.fontFamily,
        fontSize: stylesObj.fontSize ? stylesObj.fontSize : 12
    }
}

export function SecondsTohhmmss(totalSeconds, delimiter) {
    totalSeconds = isNaN(totalSeconds) ? 0 : +totalSeconds;
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100

    let result = [];
    result.push(hours < 10 ? "0" + hours : hours)
    result.push(minutes < 10 ? "0" + minutes : minutes)
    result.push(seconds < 10 ? "0" + seconds : seconds)

    return result.join(delimiter || ':');
}


export function SecondsTommss(totalSeconds, delimiter) {
    totalSeconds = isNaN(totalSeconds) ? 0 : +totalSeconds;
    var minutes = Math.floor((totalSeconds) / 60);
    var seconds = totalSeconds - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100

    let result = [];
    result.push(minutes < 10 ? "0" + minutes : minutes)
    result.push(seconds < 10 ? "0" + seconds : seconds)

    return result.join(delimiter || ':');
}

export function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validateSmsNumer(number) {
    return number != null && number.trim() != ""; //&& !isNaN(number);
}

export function rgba(r, b, g, a) {
    return { r, b, g, a }
}

export function convertToSeconds(value, displayFormatId) {
    if (displayFormatId == DisplayFormatEnum.HH_MM_SS) {
        let parts = value.split(':');
        if (parts.length != 3)
            return 0;
        return +parts[0] * 60 * 60 + +parts[1] * 60 + +parts[2]
    } else {
        let parts = value.split(':');
        if (parts.length != 2)
            return 0;
        return +parts[0] * 60 + +parts[1]
    }
}
export function getFormatter(displayFormatid) {
    switch (displayFormatid) {
        case DisplayFormatEnum.HH_MM_SS:
        case DisplayFormatEnum.MM_SS:
            let valuee = _.find(ConstantValues.customCombotimeFormat, f => f.displayFormatId == displayFormatid);
            return valuee.convert;
            break;
        case DisplayFormatEnum.Number:
        case DisplayFormatEnum.Percentage:
            return (value) => value;
            break;
        default:
            return (value) => value;
            break;
    }
}