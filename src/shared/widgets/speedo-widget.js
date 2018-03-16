import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export class SpeedoWidget extends Widget {
    constructor() {
        super()
    }
    widgetType = WidgetTypeEnum.Speedo;
}