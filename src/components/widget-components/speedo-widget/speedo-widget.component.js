import React, { PureComponent } from 'react'

import Gauge from './gauge.component';
import { Color, interpolate } from '../../../shared/lib';
import { utils } from '../../../utilities';
import { DisplayFormatEnum } from '../../../shared/enums';

export default class SpeedoWidgetComponent extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCss(this.props.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color)
        let valueStyles = utils.stylesObjToCss(this.props.valueStyles)
        let titleStyles = utils.stylesObjToCss(this.props.titleStyles)
        let rangeValueStyles = utils.stylesObjToCss(this.props.rangeValueStyles)

        let displayFormatId = this.props.appliedSettings.dataMetrics.displayFormat ? this.props.appliedSettings.dataMetrics.displayFormat.id : DisplayFormatEnum.Number;
        let formatter = utils.getFormatter(displayFormatId);

        let minText = formatter(this.props.min);
        let maxText = formatter(this.props.max);


        const minOfHeightAndwidth = this.props.height > this.props.width ? this.props.width * 0.75 : this.props.height * 0.75;
        let pcent = (this.props.value - this.props.min) / (this.props.max - this.props.min);
        if (isNaN(pcent)) {
            pcent = 0;
        }
        const value = pcent < 0 ? 0 : pcent > 1 ? 1 : pcent;

        const colors = _.map(this.props.segmentColors, segColor => Color.ToString(segColor));
        debugger
        let interpolateColor = interpolate(_.cloneDeep(colors))
        const arrowColor = interpolateColor(value);

        return (
            <div className="widget-content" style={widgetBodyStyles}>
                <Gauge value={value * 100}
                    size={minOfHeightAndwidth * 0.075}
                    radius={minOfHeightAndwidth * 0.66}
                    sections={colors}
                    arrow={{ height: minOfHeightAndwidth * 0.5, width: minOfHeightAndwidth / 50, color: arrowColor }}
                    label={this.props.label}
                    valueStyles={this.props.valueStyles}
                    title={this.props.title}
                    titleStyles={this.props.titleStyles}
                    rangeValueStyles={this.props.rangeValueStyles}
                    width={this.props.width}
                    height={this.props.height}
                    min={this.props.min}
                    max={this.props.max}
                    minText={minText}
                    maxText={maxText}
                    isComboWidget={this.props.isComboWidget}
                />
            </div>
        );
    }
}