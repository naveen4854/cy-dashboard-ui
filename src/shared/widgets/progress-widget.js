import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export class ProgressWidget extends Widget {
    constructor() {
        super()
    }
    widgetType = WidgetTypeEnum.ProgressWidget;
}