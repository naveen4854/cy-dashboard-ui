import { Widget } from "./widget";
import { ScrollTypeEnum, WidgetTypeEnum } from "../enums";
import { rgba } from "../../utilities";

export default class TextWidget extends Widget {
    constructor(zIndex, isCombo, isHeader) {
        super(zIndex, isCombo, isHeader)
    }

    widgetType = WidgetTypeEnum.Text;
    width = 150;
    height = 70;
    styleEditorTitle = 'Text Styles';
    titleStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: '12'
    };
    scrollType = { value: ScrollTypeEnum.None, label: 'No Scroll' };
    scrollSpeed = 10;
}