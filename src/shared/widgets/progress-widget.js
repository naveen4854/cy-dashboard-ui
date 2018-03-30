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

}