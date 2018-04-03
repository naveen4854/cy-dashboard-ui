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
export function GetWidget(widgetType, isCombo, zIndex, isHeader = false) {
    switch (widgetType) {
        case WidgetTypeEnum.Box:
            return new BoxWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Bar:
            return new BarWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Pie:
            return new PieWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.CircularProgress:
            return new CircularProgressWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Speedo:
            return new SpeedoWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Progress:
            return new ProgressWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Clock:
            return new ClockWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Text:
            return new TextWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Picture:
            return new PictureWidget(isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Combo:
            return new ComboWidget(isCombo, zIndex, isHeader);
        default:
            return new BoxWidget(isCombo, zIndex, isHeader);
    }
}
