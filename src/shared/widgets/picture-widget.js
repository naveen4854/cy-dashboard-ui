import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export class PrictureWidget extends Widget {
    constructor() {
        super()
    }
    widgetType = WidgetTypeEnum.Picture;
}