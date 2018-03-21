import _ from 'lodash';
import { WidgetTypeEnum } from '../../enums';

import { BoxWidget } from '../../widgets';

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
        default:
            return new BoxWidget(widgetType, isCombo, zIndex, isHeader);
    }
}
