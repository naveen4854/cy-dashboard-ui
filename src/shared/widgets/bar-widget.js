import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";
import { rgba } from '../../utilities'

export default class BarWidget extends Widget {
    constructor(zIndex) {
        //bar widget not avaiable for combo hence iscombo, isheader set to undefined
        super(zIndex)
    }
    widgetType = WidgetTypeEnum.Bar;
    height = 300;
    width = 500;
    min = 0;
    max = 100;
    enableMin = false;
    enableMax = false;
    enableBarLines = true;
    useSelectedBarColor = false;

    titleStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: 12
    }
    barStyles = {
        backgroundColor: rgba(7, 93, 102, 1),
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(7, 93, 102, 1)
    };
    xAxisStyles = {
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(7, 93, 102, 1)
    };
    yAxisStyles = {
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(7, 93, 102, 1)
    };
    showYAxis = true;
    showLegends = true;
    showLabels = true;

    appliedBackgroundColor = rgba(255, 255, 255, 1);
    widgetBody = {
        backgroundColor: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(0, 0, 0, 1)
    };
    data = [];

    applyStyles(styles) {
        this.titleStyles = styles.titleStyles;
        this.min = styles.min;
        this.max = styles.max;
        this.enableMin = styles.enableMin;
        this.enableMax = styles.enableMax;
        this.enableBarLines = styles.enableBarLines;
        this.useSelectedBarColor = styles.useSelectedBarColor;

        this.titleStyles = styles.titleStyles
        this.barStyles = styles.barStyles
        this.xAxisStyles = styles.xAxisStyles
        this.yAxisStyles = styles.yAxisStyles
        this.showYAxis = styles.showYAxis;
        this.showLegends = styles.showLegends;
        this.showLabels = styles.showLabels;

        this.appliedBackgroundColor = styles.appliedBackgroundColor;
        this.widgetBody = styles.widgetBody
    }
}