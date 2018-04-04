import React, { PureComponent } from 'react'
import { utils } from '../../../utilities';

export default class BoxWidgetComponent extends PureComponent {

    render() {
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCss(this.props.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color)
        let valueStyles = utils.stylesObjToCss(this.props.valueStyles)
        let titleStyles = utils.stylesObjToCss(this.props.titleStyles)
        return (
            <div className="widget-content" style={widgetBodyStyles}>
                <div className="boxCenterAlign" style={valueStyles}>
                    <span>{this.props.displayValue}</span>
                </div>
                {
                    (!this.props.isComboWidget) &&
                    <div className="widget-content-footer" style={titleStyles}>
                        <span>{this.props.title}</span>
                    </div>
                }
            </div>
        )
    }
}