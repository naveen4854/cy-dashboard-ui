import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";
import { rgba } from "../../utilities";

export default class CircularProgressWidget extends Widget {
    constructor(zIndex, isCombo, isColumnHeader) {
        super(zIndex, isCombo, isColumnHeader)
    }
    widgetType = WidgetTypeEnum.CircularProgress;
    width = 300;
    height = 300;
    min = 0;
    max = 100;
    displayValue = '0';
    showMaxValueOnWidget = false;
    titleStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: '12'
    };
    valueStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: 12
    };
    arcColor = rgba(0, 192, 239, 1);
    arcWidth = 15;
    appliedBackgroundColor = rgba(255, 255, 255, 1) 
    widgetBody = {
        backgroundColor:  rgba(255, 255, 255, 1), 
        fontFamily: 'Arial',
        fontSize: 12,
        color: {
            r: 0, g: 0, b: 0, a: 1
        }
    };
}