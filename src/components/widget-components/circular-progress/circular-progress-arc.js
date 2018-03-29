import React from 'react';
import ReactDom from 'react-dom';

import _ from 'lodash';
var d3 = require('d3');

class CircularArc extends React.Component {
    constructor(props) {
        super(props);
        const { titleStyles, valueStyles, widgetBody, appliedSettings } = _.cloneDeep(props);

        widgetBody.arcColor = Color.ToString(widgetBody.arcColor);
        widgetBody.arcLength = widgetBody.arcLength;
        widgetBody.backgroundColor = Color.ToString(props.appliedBackgroundColor);
        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}`;
        this.state = {
            displayValue: this.props.displayValue,
            max: this.props.max,
            min: this.props.min,
            width: this.props.width,
            height: this.props.height,
            borderWidth: this.props.widgetBody.arcLength,
            value: this.props.value,
            label: this.props.displayValue,
            title: this.props.title,
            arcColor: this.props.widgetBody.arcColor,
            showMaxValueOnWidget: this.props.showMaxValueOnWidget,
            titleStyles,
            valueStyles,
            widgetBody,
            appliedSettings
        };
    }
    componentWillReceiveProps(nextProps) {
        const { titleStyles, valueStyles, widgetBody, appliedSettings } = _.cloneDeep(nextProps);
        widgetBody.arcColor = Color.ToString(widgetBody.arcColor);
        widgetBody.backgroundColor = Color.ToString(nextProps.appliedBackgroundColor);
        valueStyles.color = Color.ToString(valueStyles.color);
        valueStyles.fontSize = `${valueStyles.fontSize}`;
        widgetBody.arcLength = widgetBody.arcLength;
        this.setState({
            value: nextProps.value,
            displayValue: nextProps.displayValue,
            title: nextProps.title,
            titleStyles,
            valueStyles,
            widgetBody,
            width: nextProps.width || this.state.width,
            height: nextProps.height || this.state.height,
            min: nextProps.min,
            max: nextProps.max,
            showMaxValueOnWidget: nextProps.showMaxValueOnWidget,
            appliedSettings

        })
    }

    shouldComponentUpdate(newProps, newState) {
        return true;

    }
    componentDidMount() {
        this.renderCircularArc();

    }

    componentDidUpdate() {

        this.renderCircularArc();

    }
    renderCircularArc() {
        const el = ReactDom.findDOMNode(this);
        while (el && el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }

        var padding = 10;

        const diameter = this.state.width < this.state.height ? (this.state.width) - padding : (this.state.height) - padding;

        const titleHeight = diameter * 0.15;


        const radius = (diameter / 2) - titleHeight;

        var twoPi = Math.PI * 2;

        //var boxSize = (radius + padding) * 2;
        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(radius)
            .outerRadius(radius - this.state.widgetBody.arcLength);

        var parent = d3.select(`#circular-widget-${this.props.id}`);

        var svg = parent.append('svg')
            .attr('width', this.state.width)
            .attr('height', this.state.height)
            //  .attr("transform", "translate(" + ( this.state.width / 2 )+ "," + (this.state.height * 0.66 ) + ")")
            ;

        var g = svg.append('g')
            // .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')')
            .attr("transform", "translate(" + (this.state.width / 2) + "," + (this.state.height / 2) + ")")

            ;

        var meter = g.append('g')
            .attr('class', 'progress-meter');

        meter.append('path')
            .attr('class', 'background')
            .attr('fill', '#ccc')
            .attr('fill-opacity', 0.5)

            .attr('d', arc.endAngle(twoPi));


        var foreground = meter.append('path')
            .attr('class', 'foreground')
            .attr('fill', this.state.widgetBody.arcColor)
            .attr('fill-opacity', 1)
            .attr('stroke', this.state.widgetBody.arcColor)
            .attr('stroke-opacity', 1)
        var numberText = meter.append('text');

        var denominatorTextSize = (this.state.valueStyles.fontSize) * 60 / 100;

        var numeratorValue = numberText.append('tspan')
            .attr('fill', this.state.valueStyles.color)
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr("style", `font-family: ${this.state.valueStyles.fontFamily}; font-size:${this.state.valueStyles.fontSize}px`);

        var denominatorValue = numberText.append('tspan')
            .attr('fill', this.state.valueStyles.color)
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr("style", `font-family: ${this.state.valueStyles.fontFamily}; font-size:${denominatorTextSize}px`);

        const yPos = -(padding + radius);
        if (!this.props.isComboWidget) {
            let title = meter.append("text")
                .attr("class", "gauge-title-label")
                .attr("text-anchor", "middle")
                //  .attr("dy", `${0-radius}px`)
                .attr("dy", `${yPos}px`)

                .attr("style", `font-family: ${this.state.titleStyles.fontFamily}; font-size:${this.state.titleStyles.fontSize}px`)
                .attr("fill", this.state.titleStyles.color);

            title.text(this.state.title);
        }

        this.updateProgress(arc, foreground, numeratorValue, denominatorValue, twoPi);

    }
    updateProgress(arc, foreground, numeratorValue, denominatorValue, twoPi) {
        foreground.attr('d', arc.endAngle(twoPi * ((this.state.value - this.state.min) / (this.state.max - this.state.min))));
        numeratorValue.text((this.state.displayValue));
        //Denominator disabled condition check for displayformats, displayFormat.id = 2 for Percentage, displayFormat.id = 3 for Time,displayFormat.id = 4 for Text
        if (this.state.showMaxValueOnWidget == true && this.state.appliedSettings && this.state.appliedSettings.dataMetrics
            && this.state.appliedSettings.dataMetrics.displayFormat && (this.state.appliedSettings.dataMetrics.displayFormat.id == displayFormatEnum.Number)) {

            denominatorValue.text(('/' + this.state.max));
        }
    }

    render() {
        return (
            <div id={`circular-widget-${this.props.id}`} style={{ height: `${this.state.height}px`, backgroundColor: `${this.state.widgetBody.backgroundColor}` }} />
        );
    }
}

export default CircularArc
