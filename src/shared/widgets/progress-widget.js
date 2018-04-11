import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";
import { rgba } from "../../utilities";

export default class ProgressWidget extends Widget {
    constructor() {
        super()
    }
    widgetType = WidgetTypeEnum.Progress;

    width = 300; height = 200;
    min = 0;
    max = 100;
    rangeValueStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: 12
    };
    appliedBackgroundColor = rgba(255, 255, 255, 1);
    widgetBody = {
        backgroundColor: rgba(255, 255, 255, 1)
    };
    titleStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: 12
    };
    valueStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: 12
    }
    segmentColors = [
        rgba(255, 0, 0, 1),
        rgba(255, 232, 0, 1),
        rgba(0, 255, 0, 1)
    ];
    value = 0;
    //defaultColor = rgba(128,128,128,0.15);
    // ["#FF0000", "rgb(255, 232, 0)", "#00FF00"]

    applyStyles(styles) {
        this.rangeValueStyles = styles.rangeValueStyles;
        this.segmentColors = styles.segmentColors;
        this.titleStyles = styles.titleStyles;
        this.min = styles.min;
        this.max = styles.max;
        super.applyStyles(styles);
    }
}