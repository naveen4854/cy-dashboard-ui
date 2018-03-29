import React, { PureComponent } from 'react'

import Gauge from './gauge.component';

export default class SpeedoWidgetComponent extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCss(this.props.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color)
        let valueStyles = utils.stylesObjToCss(this.props.valueStyles)
        let titleStyles = utils.stylesObjToCss(this.props.titleStyles)
        
        return (
            <div className="widget-content" style={widgetBodyStyles}>
                {this.renderGauge()}
            </div>
        );
    }

    renderGauge() {

        const minOfHeightAndwidth = this.state.height > this.state.width ? this.state.width * 0.75 : this.state.height * 0.75;
        let pcent = (this.state.value - this.state.min) / (this.state.max - this.state.min);
        if (isNaN(pcent)) {
            pcent = 0;
        }
        const value = pcent < 0 ? 0 : pcent > 1 ? 1 : pcent;
        const arrowColor = this.state.interpolateColor(value);

        return (
            <Gauge value={value * 100}
                size={minOfHeightAndwidth * 0.075}
                radius={minOfHeightAndwidth * 0.66}
                sections={this.state.colors}
                arrow={{ height: minOfHeightAndwidth * 0.5, width: minOfHeightAndwidth / 50, color: arrowColor }}
                label={this.state.label}
                valueStyles={this.state.valueStyles}
                title={this.state.title}
                titleStyles={this.state.titleStyles}
                rangeValueStyles={this.state.rangeValueStyles}
                width={this.state.width}
                height={this.state.height}
                min={this.state.min}
                max={this.state.max}
                minText={this.state.minText}
                maxText={this.state.maxText}
                isComboWidget={this.state.isComboWidget}
            />
        );
    }
}