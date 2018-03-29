import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import d3Pie from 'd3Pie';

export default class PieChartComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.clearAndRenderPie = this.clearAndRenderPie.bind(this);
    }

    componentDidMount() {
        this.clearAndRenderPie();
    }

    componentDidUpdate() {
        this.clearAndRenderPie();
    }

    clearAndRenderPie() {
        const el = ReactDOM.findDOMNode(this)
        //.firstChild.firstChild;
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
                content: this.props.content
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
                    color: this.props.widgetBodyStyles.color,
                    fontSize: this.props.widgetBodyStyles.fontSize,
                    font: this.props.widgetBodyStyles.fontFamily
                },
                percentage: {
                    color: "#ffffff",//todo with color invertion
                    decimalPlaces: 2,
                    fontSize: this.props.widgetBodyStyles.fontSize,
                    font: this.props.widgetBodyStyles.fontFamily
                },
                value: {
                    color: this.props.widgetBodyStyles.color,
                    fontSize: this.props.widgetBodyStyles.fontSize,
                    font: this.props.widgetBodyStyles.fontFamily
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
                    fontSize: this.props.widgetBodyStyles.fontSize,
                    font: this.props.widgetBodyStyles.fontFamily
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
        return (
            <div id={`${this.props.id}`} className={this.props.showLegends ? "col-xs-8 rtl-pull-right" : "col-xs-12 rtl-pull-left"}></div>
        )
    }
}