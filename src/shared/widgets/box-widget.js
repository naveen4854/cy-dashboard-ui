import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";

export default class BoxWidget extends Widget {
    constructor(props) {
       super(props)
    }
    widgetType = WidgetTypeEnum.Box;
    width = 150;
    height = 100;

    applyStyles(styles) {
        super.applyStyles(styles);
    }
}