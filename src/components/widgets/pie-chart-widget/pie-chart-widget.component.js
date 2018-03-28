import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom';
import Scrollbars from 'react-scrollbar';
import { utils } from '../../../utilities';
import { segments } from '../../../shared/constants/constants';
import { DisplayFormatEnum } from '../../../shared/enums';
import d3Pie from 'd3Pie';

export default class PieChartWidgetComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.clearAndRenderPie = this.clearAndRenderPie.bind(this)
        this.getContent = this.getContent.bind(this)
        this.getLegends = this.getLegends.bind(this)
        this.clearAndRenderPie = this.clearAndRenderPie.bind(this)
    }

    componentDidMount() {
        this.clearAndRenderPie();
    }

    componentDidUpdate() {
        this.clearAndRenderPie();
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

    getLegends() {
        let content = this.getContent()
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

    clearAndRenderPie() {
        const el = ReactDOM.findDOMNode(this).firstChild.firstChild;
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }
        var chart = this.renderPie();
    }

    renderPie() {
        let pie = new d3Pie(`${this.props.id}`, {
            header: {
                title: {
                    text: this.props.title,
                    color: this.props.titleStyles.color,
                    fontSize: this.props.titleStyles.fontSize,
                    font: this.props.titleStyles.fontFamily,
                    location: "middle-middle"
                },
            },
            size: {
                canvasHeight: this.props.height,
                canvasWidth: this.props.width,
                pieOuterRadius: "90%",
                // "pieInnerRadius": "55%",
            },
            data: {
                //sortOrder: "value-desc",
                content: this.getContent()
            },
            labels: {
                outer: {
                    "format": this.props.showLabels ? "label" : "none",
                    pieDistance: 11
                },
                inner: {
                    hideWhenLessThanPercentage: 1
                },
                mainLabel: {
                    color: this.props.widgetBody.color,
                    fontSize: this.props.widgetBody.fontSize,
                    font: this.props.widgetBody.fontFamily
                },
                percentage: {
                    color: "#ffffff",//todo with color invertion
                    decimalPlaces: 2,
                    fontSize: this.props.widgetBody.fontSize,
                    font: this.props.widgetBody.fontFamily
                },
                value: {
                    color: this.props.widgetBody.color,
                    fontSize: this.props.widgetBody.fontSize,
                    font: this.props.widgetBody.fontFamily
                },
                lines: {
                    enabled: true
                },
                truncation: {
                    enabled: true
                }
            },
            tooltips: {
                enabled: true,
                type: "placeholder",
                string: "{label}: {value}, {percentage}%",
                styles: {
                    color: "#ffffff",
                    fontSize: this.props.widgetBody.fontSize,
                    font: this.props.widgetBody.fontFamily
                }
            },
            effects: {
                load: {
                    effect: "none"
                },
                pullOutSegmentOnClick: {
                    effect: "linear",
                    speed: 400,
                    size: 8
                },
                highlightSegmentOnMouseover: true,
                highlightLuminosity: -0.4
            },
            misc: {
                gradient: {
                    enabled: false,
                    percentage: 75
                },
                colors: {
                    // background: this.props.widgetBody.backgroundColor
                },
            }
        });
    }

    render() {
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCss(this.props.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color)

        let legends = this.getLegends();
        debugger
        return (
            <div className="widget-content">
                <div dir="ltr" className="row" style={{ height: '100%', background: widgetBody.backgroundColor }}>
                    <div id={`${this.props.id}`} className={this.props.showLegends ? "col-xs-8 rtl-pull-right" : "col-xs-12 rtl-pull-left"}></div>
                    {/* {
                        this.props.showLegends ? <div className="col-xs-4 rtl-pull-left" style={{ height: '100%' }}>
                            <div id="legend">
                                <text>Legend:</text>
                                <Scrollbars style={{ width: '90%', height: '90%' }}>
                                    <div style={{ border: "3px solid #eee", fontSize: this.props.widgetBody.fontSize, fontFamily: this.props.widgetBody.fontFamily }}>
                                        {
                                            _.map(this.props.legends, (legend, i) =>
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
                    } */}
                </div>
            </div>
        )
    }
}