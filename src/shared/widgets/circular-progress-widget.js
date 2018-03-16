import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export class CircularProgressWidget extends Widget {
    constructor(zIndex) {
        //CircularProgressWidget not avaiable for combo hence iscombo, isheader set to undefined
        super(zIndex)
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