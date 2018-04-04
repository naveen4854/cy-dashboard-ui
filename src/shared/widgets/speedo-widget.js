import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";
import { rgba } from "../../utilities";

export default class SpeedoWidget extends Widget {
    constructor(zIndex, isCombo, isHeader) {
        super(zIndex, isCombo, isHeader)
    }
    widgetType = WidgetTypeEnum.Speedo;
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
        ...this.widgetBody,
        backgroundColor: rgba(255, 255, 255, 1),
    };
    segmentColors = [
        rgba(140, 193, 82, 1),
        rgba(255, 190, 70, 1),
        rgba(242, 62, 62, 1)
    ];
    titleStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: 12
    };
    valueStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: 12
    };
}