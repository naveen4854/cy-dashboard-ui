import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export default class BarWidget extends Widget {
    constructor(zIndex) {
        //bar widget not avaiable for combo hence iscombo, isheader set to undefined
        super(zIndex)
    }
    height = 300;
    width = 500;
    widgetType = WidgetTypeEnum.Bar;
    min = 0;
    max = 100;
    enableMin = false;
    enableMax = false;
    enableBarLines = true;
    useSelectedBarColor = false;

    titleStyles = {
        color: {
            r: 0, g: 0, b: 0, a: 1
        },
        fontFamily: 'Arial',
        fontSize: 12
    }
    barStyles = {
        backgroundColor: {
            r: 7, g: 93, b: 102, a: 1
        },
        fontFamily: 'Arial',
        fontSize: 12,
        color: {
            r: 7, g: 93, b: 102, a: 1
        }
    };
    xAxisStyles = {
        fontFamily: 'Arial',
        fontSize: 12,
        color: {
            r: 7, g: 93, b: 102, a: 1
        }
    };
    yAxisStyles = {
        fontFamily: 'Arial',
        fontSize: 12,
        color: {
            r: 7, g: 93, b: 102, a: 1
        }
    };
    showYAxis = true;
    showLegends = true;
    showLabels = true;
    data = [

    ];
}