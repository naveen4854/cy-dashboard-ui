import React, { PureComponent } from 'react'
import Scrollbars from 'react-scrollbar';
import { utils } from '../../../utilities';
import { segments } from '../../../shared/constants/constants';
import { DisplayFormatEnum } from '../../../shared/enums';
import PiechartComponent from './pie-chart'
import * as color from '../../../shared/lib/color-conversion';

export default class PieChartWidgetComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.getContent = this.getContent.bind(this)
        this.getLegends = this.getLegends.bind(this)
    }

    //TODO: move this into props somehow
    getContent() {
        let data = this.props.data
        if (!data || data.length == 0) {
            return [{
                color: "#0c6197",
                label: "data",
                value: 100
            }]
        }
        return _.map(data, (d, i) => {
            let _label = {
                label: d.label,
                value: _.reduce(d.data, (sum, x) => sum + x, 0),
                color: segments[i % segments.length]
            }
            return _label;
        })
    }

    getLegends(content) {
        let displayFormatId = this.props.appliedSettings.dataMetrics.displayFormat ?
            this.props.appliedSettings.dataMetrics.displayFormat.id : DisplayFormatEnum.Number;

        let formatter = this.getFormatter(displayFormatId);

        let sum = _.sumBy(content, 'value');
        let legends = _.map(content, (c, i) => {
            let displayValue = formatter(c.value)
            let percentage = sum == 0 ? 100 : (c.value * 100 / sum).toFixed(2);
            return Object.assign({}, c, { percentage, displayValue })
        });

        return legends
    }

    getFormatter(displayFormatid) {
        switch (displayFormatid) {
            case DisplayFormatEnum.HH_MM_SS:
            case DisplayFormatEnum.MM_SS:
                let valuee = _.find(ConstantValues.customCombotimeFormat, f => f.displayFormatId == displayFormatid);
                return valuee.convert;
                break;
            case DisplayFormatEnum.Number:
            case DisplayFormatEnum.Percentage:
                return (value) => value;
                break;
            default:
                return (value) => value;
                break;
        }
    }

    legendClick() {
    }

    render() {
        let content = this.getContent()
        let legends = this.getLegends(content);

        let widgetBodyStyles = utils.stylesObjToCssSVG(this.props.widgetBody)
        let titleStyles = utils.stylesObjToCssSVG(this.props.titleStyles)
        let bgColor = color.ToString(this.props.widgetBody.backgroundColor)
        
        return (
            <div className="widget-content">
                <div dir="ltr" className="row" style={{ height: '100%', backgroundColor: bgColor }}>
                    <PiechartComponent
                        {...this.props}
                        content={content}
                        legends={legends}
                        widgetBodyStyles={widgetBodyStyles}
                        titleStyles={titleStyles} />
                    {
                        this.props.showLegends ? <div className="col-xs-4 rtl-pull-left" style={{ height: '100%' }}>
                            <div id="legend">
                                <label>Legend:</label>
                                <Scrollbars style={{ width: '90%', height: '90%' }}>
                                    <div style={{ border: "3px solid #eee", fontSize: widgetBodyStyles.fontSize, fontFamily: widgetBodyStyles.fontFamily }}>
                                        {
                                            _.map(legends, (legend, i) =>
                                                <div key={i} className="legend-item row" onClick={this.legendClick.bind(this, i)} style={{ "color": legend.color }}>
                                                    <div className="col-xs-2 rtl-pull-right" style={{ padding: '10px 0 6px 8%' }}>
                                                        <div style={{ "background": legend.color, height: '10px', width: '20px' }}></div>
                                                    </div>
                                                    <div className="col-xs-10 rtl-pull-left">
                                                        <text className="col-xs-12">{legend.label}</text>
                                                        <div className="legend-value col-xs-12">{'( ' + legend.displayValue + ' | ' + legend.percentage + '% )'}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </Scrollbars>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        )
    }
}