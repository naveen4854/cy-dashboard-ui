import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export class TextWidget extends Widget {
    constructor() {
        super()
    }
    widgetType = WidgetTypeEnum.Text;
}