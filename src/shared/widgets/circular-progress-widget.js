import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export default class CircularProgressWidget extends Widget {
    constructor(zIndex, isCombo, isHeader) {
        super(zIndex, isCombo, isHeader)
    }
    widgetType = WidgetTypeEnum.CircularProgress;
    width = 300;
    height = 300;
    min = 0;
    max = 100;
    displayValue = '0';
    showMaxValueOnWidget = false;

    titleStyles = {
        color: {
            r: 0, g: 0, b: 0, a: 1
        },
        fontFamily: 'Arial',
        fontSize: '12'
    };
    valueStyles = {
        color: {
            r: 0, g: 0, b: 0, a: 1
        },
        fontFamily: 'Arial',
        fontSize: 12
    };

}