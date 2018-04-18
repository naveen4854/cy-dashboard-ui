import React, { PureComponent } from 'react'

import ProgressBarComponent from './progress-bar.component';
import { Color, interpolate } from '../../../shared/lib';
import { utils } from '../../../utilities';
import { DisplayFormatEnum } from '../../../shared/enums';

export default class ProgressBarWidgetComponent extends PureComponent {
    render() {
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCss(this.props.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color)
        let valueStyles = utils.stylesObjToCss(this.props.valueStyles)
     //   let titleStyles = utils.stylesObjToCss(this.props.titleStyles)
     //   let rangeValueStyles = utils.stylesObjToCssSVG(this.props.rangeValueStyles)

        let displayFormatId = this.props.appliedSettings.dataMetrics.displayFormat ? this.props.appliedSettings.dataMetrics.displayFormat.id : DisplayFormatEnum.Number;
        let formatter = utils.getFormatter(displayFormatId);

        let minText = formatter(this.props.min);
        let maxText = formatter(this.props.max);

        //let label = 50 ;//`${this.props.displayValue}`;
        let ratio = (this.props.value - this.props.min) / (this.props.max - this.props.min);

        const colors = _.map(this.props.segmentColors, segColor => Color.ToString(segColor));
        let interpolateColor = interpolate(_.cloneDeep(colors))
        return (
            <div className="widget-content" style={widgetBodyStyles}>
                <ProgressBarComponent
                    {...this.props}
                    ratio={ratio}
                    interpolateColor={interpolateColor}
                    valueStyles={valueStyles}
                  //  titleStyles={titleStyles}
                  //  rangeValueStyles={rangeValueStyles}
                    minText={minText}
                    maxText={maxText}
                    barCount={10} />
            </div>
        )
    }
}
