import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export default class BoxWidget extends Widget {
    constructor(zIndex, isCombo, isHeader) {
        super(zIndex, isCombo, isHeader)
    }
    widgetType = WidgetTypeEnum.Box;
    width = 150;
    height = 100;
}