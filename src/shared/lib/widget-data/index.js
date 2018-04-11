import _ from 'lodash';
import { WidgetTypeEnum } from '../../enums';

import { BoxWidget, SpeedoWidget, BarWidget, CircularProgressWidget, PieWidget, ClockWidget, ProgressWidget, TextWidget, PictureWidget, ComboWidget } from '../../widgets';

/**
 * To get the widget based on widget type.
 * @param {WidgetTypeEnum} widgetType 
 * @param {boolean} isComboWidget 
 * @param {int} zIndex 
 * @param {int} isColumnHeader 
 * @param {int} isRowHeader 
 */
export function GetWidget(widgetType, zIndex, isComboWidget, isColumnHeader = false, isRowHeader = false) {
    let props = { zIndex, isComboWidget, isColumnHeader, isRowHeader }
    switch (widgetType) {
        case WidgetTypeEnum.Box:
            return new BoxWidget(props);
        case WidgetTypeEnum.Bar:
            return new BarWidget(props);
        case WidgetTypeEnum.Pie:
            return new PieWidget(props);
        case WidgetTypeEnum.CircularProgress:
            return new CircularProgressWidget(props);
        case WidgetTypeEnum.Speedo:
            return new SpeedoWidget(props);
        case WidgetTypeEnum.Progress:
            return new ProgressWidget(props);
        case WidgetTypeEnum.Clock:
            return new ClockWidget(props);
        case WidgetTypeEnum.Text:
            return new TextWidget(props);
        case WidgetTypeEnum.Picture:
            return new PictureWidget(props);
        case WidgetTypeEnum.Combo:
            return new ComboWidget(props);
        default:
            return new BoxWidget(props);
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
