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
        backgroundColor: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(0, 0, 0, 1)
    };

    applyStyles(styles) {
        this.min = styles.min;
        this.max = styles.max;
        this.showMaxValueOnWidget = styles.showMaxValueOnWidget;
        this.titleStyles = styles.titleStyles;
        this.arcColor = styles.arcColor;
        this.arcWidth = styles.arcWidth;
        super.applyStyles(styles);
    }
}