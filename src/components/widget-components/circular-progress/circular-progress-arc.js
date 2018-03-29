import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';

import _ from 'lodash';
import { DisplayFormatEnum } from '../../../shared/enums';
var d3 = require('d3');

class CircularArc extends PureComponent {
    constructor(props) {
        super(props);
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

        const diameter = this.props.width < this.props.height ? (this.props.width) - padding : (this.props.height) - padding;

        const titleHeight = diameter * 0.15;


        const radius = (diameter / 2) - titleHeight;

        var twoPi = Math.PI * 2;

        //var boxSize = (radius + padding) * 2;
        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(radius)
            .outerRadius(radius - this.props.arcWidth);

        var parent = d3.select(`#circular-widget-${this.props.id}`);

        var svg = parent.append('svg')
            .attr('width', this.props.width)
            .attr('height', this.props.height)
            //  .attr("transform", "translate(" + ( this.props.width / 2 )+ "," + (this.props.height * 0.66 ) + ")")
            ;

        var g = svg.append('g')
            // .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')')
            .attr("transform", "translate(" + (this.props.width / 2) + "," + (this.props.height / 2) + ")")

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
            .attr('fill', this.props.arcColor)
            .attr('fill-opacity', 1)
            .attr('stroke', this.props.arcColor)
            .attr('stroke-opacity', 1)
        var numberText = meter.append('text');

        var denominatorTextSize = (this.props.valueStyles.fontSize) * 60 / 100;

        var numeratorValue = numberText.append('tspan')
            .attr('fill', this.props.valueStyles.color)
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr("style", `font-family: ${this.props.valueStyles.fontFamily}; font-size:${this.props.valueStyles.fontSize}px`);

        var denominatorValue = numberText.append('tspan')
            .attr('fill', this.props.valueStyles.color)
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr("style", `font-family: ${this.props.valueStyles.fontFamily}; font-size:${denominatorTextSize}px`);

        const yPos = -(padding + radius);
        if (!this.props.isComboWidget) {
            let title = meter.append("text")
                .attr("class", "gauge-title-label")
                .attr("text-anchor", "middle")
                //  .attr("dy", `${0-radius}px`)
                .attr("dy", `${yPos}px`)

                .attr("style", `font-family: ${this.props.titleStyles.fontFamily}; font-size:${this.props.titleStyles.fontSize}px`)
                .attr("fill", this.props.titleStyles.color);

            title.text(this.props.title);
        }

        this.updateProgress(arc, foreground, numeratorValue, denominatorValue, twoPi);

    }
    updateProgress(arc, foreground, numeratorValue, denominatorValue, twoPi) {
        foreground.attr('d', arc.endAngle(twoPi * ((this.props.value - this.props.min) / (this.props.max - this.props.min))));
        numeratorValue.text((this.props.displayValue));
        //Denominator disabled condition check for displayformats, displayFormat.id = 2 for Percentage, displayFormat.id = 3 for Time,displayFormat.id = 4 for Text
        if (this.props.showMaxValueOnWidget == true && this.props.appliedSettings && this.props.appliedSettings.dataMetrics
            && this.props.appliedSettings.dataMetrics.displayFormat && (this.props.appliedSettings.dataMetrics.displayFormat.id == DisplayFormatEnum.Number)) {

            denominatorValue.text(('/' + this.props.max));
        }
    }

    render() {
        return (
            <div id={`circular-widget-${this.props.id}`} style={{ height: `${this.props.height}px`, backgroundColor: `${this.props.widgetBody.backgroundColor}` }} />
        );
    }
}

export default CircularArc
