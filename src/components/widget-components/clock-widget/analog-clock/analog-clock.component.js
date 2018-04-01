import React, { PureComponent } from 'react';

import d3 from 'd3';
import { DateZone } from '../../../../shared/lib';


export default class AnalogClockWidgetComponent extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.clockInterval && clearInterval(this.clockInterval);
    }

    componentDidMount() {
        this.InitializeSvg(`myCanvas${this.props.id}`);
        setTimeout(() => {
            this.clockInterval = setInterval(() => {
                this.ReInitializeSvg(`myCanvas${this.props.id}`);
            }, 1000)
        }, 1000 - DateZone.timezoneDate(this.props.selectedTimeZoneItem).getUTCMilliseconds())
    }

    componentDidUpdate() {
        document.getElementById(`myCanvas${this.props.id}`).innerHTML = "";
        this.InitializeSvg(`myCanvas${this.props.id}`);
    }

    ReDrawNeeddle(gTopGroupId, niddle, angle) {

        var svg = d3.select("#" + gTopGroupId);
        var line = svg.select('#' + niddle);
        var offsetX, offsetY;
        var savedX2 = parseFloat(line.attr("x2Saved"));
        var savedY2 = parseFloat(line.attr("y2Saved"));
        var lineLength = parseFloat(line.attr("lineLength"));
        offsetX = savedX2 - (lineLength * Math.cos(angle + Math.PI / 2));
        offsetY = savedY2 - (lineLength * Math.sin(angle + Math.PI / 2));
        line
            .transition()
            .duration(100)
            .attr("x2", offsetX)
            .attr("y2", offsetY);
    }

    DrawNumbers(granularity, radius, cx, cy, gTopGroupId) {
        var fontsize = parseInt(this.props.numberStyles.fontSize);
        var hourLabelRadius = radius - fontsize * 0.75;
        var hourScale = d3.scale.linear()
            .range([0, 330])
            .domain([0, 11]);
        var radians = 0.0174532925;

        var labels = d3.select("#" + gTopGroupId).append("g").attr("id", "clock-labels");

        _.map(d3.range(0, 12), d => {
            labels.
                append("text")
                .attr("font-size", fontsize + 'px')
                .attr("text-anchor", "middle")
                .attr("fill", this.props.numberStyles.color)
                .attr('x', cx + hourLabelRadius * Math.sin(hourScale(d) * radians))
                .attr('y', cy - hourLabelRadius * Math.cos(hourScale(d) * radians) + fontsize * 0.33)
                .text(d == 0 ? 12 : d);
        });
    }

    InitializeSvg(containerId) {

        var cx;
        var cy;

        var gCanvasId;
        var gTopGroupId, lineLength, seconds, hours, minutes;
        var radius;

        var granularity = 30;

        var height = this.props.height;
        var width = this.props.width;

        gCanvasId = containerId + '_canvas';
        gTopGroupId = containerId + '_topGroup';
        var svg = d3.select("#" + containerId).append("svg")
            .attr("id", gCanvasId)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("id", gTopGroupId)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            ;

        lineLength = (height / 2) - 100;
        cx = width / 2;
        cy = (2 * height / 5);

        var radiusNumber = width - height > 0 ? height : width;
        radius = radiusNumber / 2 - (13 / 100) * radiusNumber;

        svg.append("circle")
            .attr("id", "outerCircle")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", radius)
            .attr("stroke-width", 4)
            .attr('stroke', this.props.widgetBodyStyles.clockRoundingColor)
            .attr('fill', this.props.widgetBodyStyles.clockbackgroundColor)
            ;


        var twoHands = height > width ? width : height;
        lineLength = (twoHands / 2);
        svg.append("line")
            .attr("id", "secondNiddle")
            .attr("x1", cx)
            .attr("y1", cy)
            .attr("x2", cx)
            .attr("y2", (cy - lineLength))
            .attr("lineLength", radius - 10)
            .attr("x2Saved", cx)
            .attr("y2Saved", (cy))
            .attr("stroke-width", 2)
            .attr("stroke-linecap", "round")
            .attr("stroke", this.props.hands.secondhandcolor)
            ;

        lineLength = (twoHands / 2);
        svg.append("line")
            .attr("id", "minuteNiddle")
            .attr("x1", cx)
            .attr("y1", cy)
            .attr("x2", cx)
            .attr("y2", (cy - lineLength))
            .attr("lineLength", radius - 10)
            .attr("x2Saved", cx)
            .attr("y2Saved", (cy))
            .attr("stroke-width", 4)
            .attr("stroke", this.props.hands.minutehandcolor)
            .attr("stroke-linecap", "round")
            ;

        lineLength = (twoHands / 2);
        svg.append("line")
            .attr("id", "hourNiddle")
            .attr("x1", cx)
            .attr("y1", cy)
            .attr("x2", cx)
            .attr("y2", (cy - lineLength))
            .attr("lineLength", radius / 2)
            .attr("x2Saved", cx)
            .attr("y2Saved", (cy))
            .attr("stroke-width", 4)
            .attr("stroke", this.props.hands.hourhandcolor)
            .attr("stroke-linecap", "round")
            ;

        svg.append("circle")
            .attr("id", "centerBall")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", 5)
            .attr("fill", "black")
            ;

        var currentDateTime = DateZone.timezoneDate(this.props.selectedTimeZoneItem);
        seconds = currentDateTime.getSeconds();
        minutes = currentDateTime.getMinutes();
        hours = currentDateTime.getHours() % 12;

        this.ReDrawNeeddle(gTopGroupId, 'secondNiddle', seconds * Math.PI / granularity);
        this.ReDrawNeeddle(gTopGroupId, 'minuteNiddle', minutes * Math.PI / granularity);

        var hourPos = hours * 10;
        hourPos += (minutes * 10) / 60;

        this.ReDrawNeeddle(gTopGroupId, 'hourNiddle', hourPos * Math.PI / 60);
        this.DrawNumbers(granularity, radius, cx, cy, gTopGroupId);

        return svg;
    }

    ReInitializeSvg(containerId) {

        var gTopGroupId;
        var granularity = 30;

        gTopGroupId = containerId + '_topGroup';

        var d = DateZone.timezoneDate(this.props.selectedTimeZoneItem);
        // console.log(d, 'analog', this.props.selectedTimeZoneItem.tz)

        var seconds = d.getSeconds();
        var minutes = d.getMinutes();
        var hours = d.getHours() % 12;

        this.ReDrawNeeddle(gTopGroupId, 'secondNiddle', seconds * Math.PI / granularity);
        this.ReDrawNeeddle(gTopGroupId, 'minuteNiddle', minutes * Math.PI / granularity);

        var hourPos = hours * 10;
        hourPos += (minutes * 10) / 60;

        this.ReDrawNeeddle(gTopGroupId, 'hourNiddle', hourPos * Math.PI / 60);
    }

    render() {
        return (
            <div style={{ backgroundColor: this.props.widgetBodyStyles.clockOuterbackgroundColor }}>
                <div id="clockTitle" style={{ fontSize: this.props.timezoneStyles.fontSize, color: this.props.timezoneStyles.color, padding: "5px", fontFamily: this.props.timezoneStyles.fontFamily }} className="clock-title">
                    {this.props.title}
                </div>
                <div id={`myCanvas${this.props.id}`} ref="myCanvas" className="clock-widget" />
            </div>
        );
    }
}