import _ from 'lodash';
import { WidgetTypeEnum } from '../../enums';

import { BoxWidget, SpeedoWidget, BarWidget, CircularProgressWidget, PieWidget, ClockWidget, ProgressWidget, TextWidget, PictureWidget, ComboWidget } from '../../widgets';

/**
 * To get the widget based on widget type.
 * @param {WidgetTypeEnum} widgetType 
 * @param {boolean} isCombo 
 * @param {int} zIndex 
 * @param {int} isHeader 
 */
export function GetWidget(widgetType, zIndex, isCombo, isHeader = false) {
    switch (widgetType) {
        case WidgetTypeEnum.Box:
            return new BoxWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.Bar:
            return new BarWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.Pie:
            return new PieWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.CircularProgress:
            return new CircularProgressWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.Speedo:
            return new SpeedoWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.Progress:
            return new ProgressWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.Clock:
            return new ClockWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.Text:
            return new TextWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.Picture:
            return new PictureWidget(zIndex, isCombo, isHeader);
        case WidgetTypeEnum.Combo:
            return new ComboWidget(zIndex, isCombo, isHeader);
        default:
            return new BoxWidget(zIndex, isCombo, isHeader);
    }
}

export function getWidgetByEnum(widgetType) {
    switch (widgetType) {
        case WidgetTypeEnum.Box:
            return "Box"
        case WidgetTypeEnum.Progress:
            return "Step"
        case WidgetTypeEnum.Speedo:
            return "Speedo"
        case WidgetTypeEnum.Text:
            return "Text"
        case WidgetTypeEnum.CircularProgress:
            return "Circular Progress"
        default:
            return "None"
    }
}
