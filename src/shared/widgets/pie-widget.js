import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export class PieWidget extends Widget {
    constructor() {
        super()
    }
    widgetType = WidgetTypeEnum.Pie;
}