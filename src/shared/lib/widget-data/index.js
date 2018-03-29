import _ from 'lodash';
import { WidgetTypeEnum } from '../../enums';

import { BoxWidget, SpeedoWidget, BarWidget, CircularProgressWidget, PieWidget, ProgressWidget } from '../../widgets';

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
            return new BoxWidget(widgetType, isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Bar:
            return new BarWidget(widgetType, isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Pie:
            return new PieWidget(widgetType, isCombo, zIndex, isHeader);
        case WidgetTypeEnum.CircularProgress:
            return new CircularProgressWidget(widgetType, isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Speedo:
            return new SpeedoWidget(widgetType, isCombo, zIndex, isHeader);
        case WidgetTypeEnum.Progress:
            return new ProgressWidget(widgetType, isCombo, zIndex, isHeader);
        default:
            return new BoxWidget(widgetType, isCombo, zIndex, isHeader);
    }
}
