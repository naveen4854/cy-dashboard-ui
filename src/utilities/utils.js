import { Color } from "../shared/lib";

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
        fontSize: fontSize.toString().indexOf('px') > 0 ? fontSize : fontSize + 'px'
    }
}

export function stylesObjToCss(stylesObj) {
    return {
        color: Color.ToString(stylesObj.color),
        backgroundColor: Color.ToString(stylesObj.backgroundColor),
        fontFamily: stylesObj.fontFamily,
        fontSize: stylesObj.fontSize.toString().indexOf('px') > 0 ? stylesObj.fontSize : stylesObj.fontSize + 'px'
    }
}