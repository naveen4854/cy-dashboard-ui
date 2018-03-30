import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import ReactDom from 'react-dom';
import '../styles.css';
import * as Color from '../../../shared/lib/color-conversion';
import { Scrollbars } from 'react-custom-scrollbars';
import { DisplayFormatEnum } from '../../../shared/enums';
import { Constants, segments } from '../../../shared/constants';
import { utils } from '../../../utilities';

var d3 = require('d3');

export default class BarChart extends React.Component {

    componentDidUpdate() {
        this.clearAndRenderBar();
    }

    componentDidMount() {
        this.clearAndRenderBar();
    }

    clearAndRenderBar() {
        const el = ReactDom.findDOMNode(this).firstChild.firstChild;
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }
        var chart = this.renderBarChart();
    }

    getContent(props) {
        let data = props.data
        if (!data || data.length == 0) {
            return [{
                color: props.barStyles && props.useSelectedBarColor ? Color.ToString(props.barStyles.backgroundColor) : segments[0],
                label: "data",
                data: 100,
                displaydata: this.getFormatter(this.getDisplayFormat())(100),
            }]
        }

        return _.map(data, (d, i) => {
            let _label = {
                label: d.label,
                data: _.sum(d.data),
                color: props.barStyles && props.useSelectedBarColor ? Color.ToString(props.barStyles.backgroundColor) : segments[i % segments.length],
                displaydata: this.getFormatter(this.getDisplayFormat())(d.data),
            }
            return _label;
        })
    }

    getLegends(content) {
        return content;
    }

    renderBarChart() {

        let barStyles = this.props.barStyles;
        let updatedBarStyles = utils.stylesObjToCssSVG(barStyles);

        let updatedXAxisStyles = utils.stylesObjToCssSVG(this.props.xAxisStyles);
        let updatedYAxisStyles = utils.stylesObjToCssSVG(this.props.yAxisStyles);

        let calculatedHeight = this.props.height - (this.props.titleStyles.fontSize);


        let propsWidth = this.props.showLegends ? this.props.width * 2 / 3 : this.props.width; //Note: please match this percentage with the column class applied on chart in render
        let content = this.getContent(this.props)
        //let legends = this.getLegends(content)
        var contentData = content;
        let displayFormatid = this.getDisplayFormat();
        var data = _.map(contentData, (d) => {

            let actualValue = d.data;

            actualValue = this.props.enableMax && (d.data > this.props.max) ? this.props.max : this.props.enableMin && (d.data < this.props.min) ? this.props.min : d.data;

            return {
                label: d.label,
                data: actualValue,
                displaydata: d.displaydata,
                color: d.color,
                isValueGreater: this.props.enableMax && (d.data > this.props.max)

            }
        });

        var labels = _.map(data, (d) => {
            return d.label
        });
        let maxValue = _.maxBy(data, function (o) { return o.data; });
        var margin = this.getMargin(data, maxValue, displayFormatid, calculatedHeight); //{ top: calculatedHeight * 0.1 > 60 ? calculatedHeight * 0.1 : 60, right: 10, bottom: 50, left: 50 };

        var width = propsWidth - margin.right - margin.left;
        var height = calculatedHeight - margin.top - margin.bottom;
        const node = ReactDom.findDOMNode(this).firstChild;
        var svg = d3.select(node.firstChild).append('svg')
            .attr('width', propsWidth)
            .attr('height', calculatedHeight)
            //.style('background-color', this.state.widgetBody.backgroundColor)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        var labelScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], .25)
            .domain(labels);

        var bandwidth = labelScale.rangeBand();

        var dataScale = d3.scale.linear()
            .range([height, 0])
            .domain([this.props.enableMin ? this.props.min : 0
                , this.props.enableMax ? this.props.max : maxValue.data //(maxv%10) == 0 ? maxv:  maxv + (maxv/10)   //d3.max(data, function (d) { return d.data; })
            ]);


        // Get ticks
        var ticks = dataScale.ticks();

        let maxFromTicks = _.max(ticks);
        if (maxFromTicks <= maxValue.data) {

            //ticks.splice(-1, 1);
            ticks.push(maxValue.data);
        }

        if (this.props.enableMax) {
            if (+this.props.max > maxFromTicks) {

                // ticks.splice(-1, 1);
                ticks.push(+this.props.max);
            }
        }
        let minFromTicks = _.min(ticks);
        if (this.props.enableMin) {
            if (+this.props.min < minFromTicks) {
                //ticks.splice(0, 1);
                ticks.unshift(+this.props.min);
            }
        }

        var xAxis = d3.svg.axis()
            .scale(labelScale)
            .orient("bottom");

        var yAxis = '';
        let formatter = this.getFormatter(displayFormatid);
        let innerTickSizeCustom = this.props.enableBarLines ? -width : 5


        yAxis =
            d3.svg.axis()
                .scale(dataScale)
                .orient("left").tickFormat(formatter)
                .innerTickSize(innerTickSizeCustom)
                .tickPadding(10)
                .tickValues(ticks)

        var xAxisEle = svg.append('g')
            .classed('x axis', true)
            .attr('transform', `translate(0,${height})`)
            .attr('fill', updatedXAxisStyles.color)
            .style('font-size', updatedXAxisStyles.fontSize)
            .style('font-family', updatedXAxisStyles.fontFamily)
            .style('display', this.props.showLabels ? 'block' : 'none')
            .call(xAxis);

        const maxLabelLength = _.reduce(xAxisEle.selectAll('.tick text')[0], (maxLen, x) => {
            return maxLen > x.getComputedTextLength() ? maxLen : x.getComputedTextLength();
        }, 0);

        const xLabelsAngle = this.getAngle(maxLabelLength, bandwidth);

        if (xLabelsAngle > 0) {
            const xTrans = (xLabelsAngle / 90) * bandwidth * 0.75;
            const yTrans = (xLabelsAngle / 90) * maxLabelLength * 0.67;
            xAxisEle.selectAll('.tick text')
                .attr('transform', `translate(-${xTrans}, ${yTrans})rotate(-${xLabelsAngle})`)
        }


        svg.append('g')
            .classed('y axis', true)
            .attr('fill', updatedYAxisStyles.color)
            .style('font-size', updatedYAxisStyles.fontSize)
            .style('font-family', updatedYAxisStyles.fontFamily)
            .call(yAxis);
        var barHolder = svg.append('g')
            .classed('bar-holder', true);



        barHolder.selectAll('rect.bar')
            .data(data)
            .enter().append("path")
            .attr("d", (d, i) => {
                return this.drawCustomBar(
                    labelScale(d.label),
                    dataScale(d.data) - 1,
                    bandwidth,
                    height - dataScale(d.data),
                    0,
                    d.isValueGreater
                )
            })
            .attr('fill', (d, i) => {
                return d.color;
            });

        barHolder.selectAll('rect.bar')
            .data(data)
            .enter()
            .append("text")
            .attr('fill', (d, i) => {
                return updatedBarStyles.color;
            })
            .style('font-size', updatedBarStyles.fontSize)
            .style('font-family', updatedBarStyles.fontFamily)
            //.style('font-weight','bolder')
            .attr("text-anchor", "middle")
            .attr("x", (d, i) => {
                return labelScale(d.label) + (bandwidth / 2);
            })
            .attr("y", (d, i) => {
                return dataScale(d.data) - 15; // this is configured as 15 so that it will not overlap on bar.
            })
            .text((d, i) => {
                return d.displaydata;
            });

    }

    getDisplayFormat() {
        let displayFormatid = this.props.appliedSettings.dataMetrics.displayFormat ?
            this.props.appliedSettings.dataMetrics.displayFormat.id : DisplayFormatEnum.Text;
        return displayFormatid;
    }

    getMargin(data, maxValue, displayFormatid, calculatedHeight) {

        let updatedYAxisStyles = utils.stylesObjToCssSVG(this.props.yAxisStyles);
        let maxValueToCheck = this.props.enableMax ? this.props.max : (maxValue ? maxValue.data : 100); // if bar data is not present, just assuming max value to be 100
        let xValue = 1;
        if (displayFormatid == DisplayFormatEnum.HH_MM_SS || displayFormatid == DisplayFormatEnum.MM_SS) {
            xValue = 2;
        }


        let maxValueLength = (maxValueToCheck + '').length > 2 ? (maxValueToCheck + '').length : 2.5;
        let leftMargin = updatedYAxisStyles.fontSize * maxValueLength * xValue;
        var margin = { top: calculatedHeight * 0.07 > 50 ? calculatedHeight * 0.07 : 50, right: 10, bottom: 50, left: leftMargin }; //{ top: calculatedHeight * 0.1 > 60 ? calculatedHeight * 0.1 : 60, right: 10, bottom: 50, left: 50 };
        return margin;
    }

    getFormatter = (displayFormatid) => {
        switch (displayFormatid) {
            case DisplayFormatEnum.HH_MM_SS:
            case DisplayFormatEnum.MM_SS:
                let valuee = _.find(Constants.customCombotimeFormat, f => f.displayFormatId == displayFormatid);
                return valuee.convert;
                break;
            case DisplayFormatEnum.Number:
                return d3.format("d");
                break;
            case DisplayFormatEnum.Percentage:
                return (value) => value;
                break;
            default:
                return (value) => value;
                break;
        }
    }
    drawCustomBar(x, y, w, h, r, isValueGreater) {

        var retval;

        if (isValueGreater) {
            retval = `M${x},${y} C${x + w / 4},${y + 30} ${x + 3 * w / 4},${y - 30} ${x + w},${y}`
        }
        else {
            retval = "M" + (x) + "," + y;
            retval += "h" + (w);

            retval = `M${(x)},${(y)} h${(w)}`;
        }

        retval += ` v${(h)} h${(-w)} v${(-h)} z`;
        return retval;
    }


    getAngle(labelWidth, bandwidth) {
        if (labelWidth <= bandwidth) {
            return 0;
        }
        const r = (labelWidth / bandwidth) >= 2 ? 1 : (labelWidth / bandwidth) % 1;
        return Math.asin(r) * (180 / Math.PI);
    }

    render() {
        let content = this.getContent(this.props);
        let legends = this.getLegends(content);
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCssSVG(this.props.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color);

        return (
            <div className="widget-content">
                <div className="row" style={{ height: '100%' }}>
                    <div id={`${this.props.id}`} className={this.props.showLegends ? "col-xs-8 rtl-pull-right" : "col-xs-12 rtl-pull-left"}></div>
                    {
                        this.props.showLegends ? <div className="col-xs-4 rtl-pull-left" style={{ height: '100%' }}>
                            <div id="legend">
                                <label>Legend:</label>
                                <Scrollbars style={{ width: '90%', height: '90%' }}>
                                    <div style={{ border: "3px solid #eee", fontSize: widgetBodyStyles.fontSize, fontFamily: widgetBodyStyles.fontFamily }}>
                                        {
                                            _.map(legends, (legend, i) =>
                                                <div key={i} className="legend-item row" style={{ "color": legend.color }}>
                                                    <div className="col-xs-2 rtl-pull-right" style={{ padding: '10px 0 6px 8%' }}>
                                                        <div style={{ "background": legend.color, height: '10px', width: '20px' }}></div>
                                                    </div>
                                                    <div className="col-xs-10 rtl-pull-left">
                                                        <text className="col-xs-12">{legend.label}</text>
                                                        <div className="legend-value col-xs-12">{'( ' + legend.displaydata + ' )'}</div>
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
        );
    }
}

BarChart.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    titleStyles: PropTypes.object,
    widgetBody: PropTypes.object,
}
