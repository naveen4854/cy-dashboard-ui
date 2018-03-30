import React, { PureComponent } from 'react'
import CircularArc from './circular-progress-arc';
import { utils } from '../../../utilities';

export default class CircularProgressComponent extends PureComponent {
    render() {
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCss(this.props.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color)
        let valueStyles = utils.stylesObjToCss(this.props.valueStyles)
        let titleStyles = utils.stylesObjToCss(this.props.titleStyles)
        return (
            <CircularArc {...this.props} widgetBodyStyles={widgetBodyStyles} titleStyles={titleStyles} valueStyles={valueStyles}/>
        )
    }
}