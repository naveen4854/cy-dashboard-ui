import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";
import { rgba } from '../../utilities'

export class PieWidget extends Widget {
    constructor(zIndex) {
        //CircularProgressWidget not avaiable for combo hence iscombo, isheader set to undefined
        super(zIndex)
    }
    widgetType = WidgetTypeEnum.Pie;
    width = 675;
    height = 300;
    showEditor = false;
    showIcons = true;
    showLegends = true;
    showLabels = true;

    appliedBackgroundColor = rgba(255, 255, 255, 1);
    widgetBody = {
        backgroundColor: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(0, 0, 0, 1)
    };
    titleStyles = {
        color: rgba(0, 0, 0, 1),
        fontFamily: 'Arial',
        fontSize: 14
    };
    data = [
        {
            label: 'data',
            data: [100]
        }
    ];
}