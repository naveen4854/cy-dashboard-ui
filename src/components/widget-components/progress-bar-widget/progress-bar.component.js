import React, { PureComponent } from 'react'
import ReactDom from 'react-dom';
const defaultColor = "rgba(128,128,128,0.15)";

export default class ProgressBarComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }


    componentDidUpdate() {
        if (!this.props.isComboWidget) {
            this.renderTitle();
        }
        this.renderChartBar();
    }

    componentDidMount() {
        if (!this.props.isComboWidget) {
            this.renderTitle();
        }
        this.renderChartBar();
    }

    shouldBeEnabled(ratio, i) {
        return (1 - ratio) * 10 < i;
    }

    getColors(i) {
        let fillColor = this.props.interpolateColor(i / this.props.barCount);
        if (/^rgb\(/.test(fillColor)) {
            let color = [];
            _.map(fillColor.substring(4, fillColor.length - 1).split(','), (col) => color.push(parseInt(col)));
            return [`rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`];
        }
    }

    render() {

        return (
            <div id={`progress-bar${this.props.id}`} className="progress-bar-custom">
                <div id={`progress-bar-title${this.props.id}`} className="progress-bar-title">
                </div>
                <div id={`progress-bar-chart${this.props.id}`} className="progress-bar-chart">
                </div>
            </div>
        )
    }

    renderTitle() {
        const el = ReactDom.findDOMNode(this).children[0];
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }

        let progressBarTitle = d3.select(`#progress-bar-title${this.props.id}`).insert("svg").attr("width", this.props.width).attr("height", _.floor(this.props.height * 0.1));

        let titleDyposition = _.floor(this.props.height * 0.075);

        let title = progressBarTitle.append("text")
            .attr("class", "gauge-label")
            .attr("text-anchor", "middle")
            .attr("dy", `${titleDyposition}`)
            .attr("dx", `${this.props.width / 2}`)
            .attr("style", `font-size:${this.props.titleStyles.fontSize}; font-family:${this.props.titleStyles.fontFamily};`)
            .attr("fill", `${this.props.titleStyles.color}`);

        title.text(`${this.props.title}`);
    }

    renderChartBar() {
        const el = ReactDom.findDOMNode(this).children[1];
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }

        let barChartHeight = this.props.isComboWidget ? _.floor(this.props.height) : _.floor(this.props.height * 0.9);
        let eachBarheight = this.props.isComboWidget ? _.floor(this.props.height * 0.81) : _.floor(this.props.height * 0.9 * 0.88);

        let data = [];
        for (let i = this.props.barCount; i >= 1; i--) {
            data.push({
                x: (1 - (i / this.props.barCount)) * this.props.width,
                y: ((i / this.props.barCount) - 0.1) * eachBarheight,
                w: this.props.width / this.props.barCount,
                h: eachBarheight - (((i / this.props.barCount) - 0.1) * eachBarheight),
                c: this.shouldBeEnabled(this.props.ratio, i) ? this.getColors(i)[1] : defaultColor
            })
        }

        let progressBarChart = d3.select(`#progress-bar-chart${this.props.id}`).insert("svg").attr("width", this.props.width * 0.98).attr("height", barChartHeight);

        _.map(data, (d) =>
            progressBarChart.append("rect")
                .attr("x", d.x)
                .attr("y", d.y)
                .attr("width", d.w)
                .attr("height", d.h)
                .attr("fill", d.c));

        let valueLabel = progressBarChart.append("text")
            .attr("class", "gauge-min-label")
            .attr("text-anchor", "middle")
            .attr("dy", `${this.props.height * 0.25}px`)
            .attr("dx", `${this.props.width * 0.25}px`)
            .attr("style", `font-family: ${this.props.valueStyles.fontFamily}; font-size:${this.props.valueStyles.fontSize}`)
            .attr("fill", this.props.valueStyles.color);

        valueLabel.text(`${this.props.displayValue}`);

        this.renderFooter(progressBarChart);

    }

    renderFooter(progressBarChart) {
        let footerdyPosition = _.floor((this.props.isComboWidget ? ((this.props.height * 0.81)) : this.props.height * 0.88 * 0.9) + this.props.rangeValueStyles.fontSize);
        let maxTextLength = this.props.maxText.toString().length;

        // let size = this.props.height > this.props.width ?
        //     this.props.width * 0.08 > 9 ? this.props.width * 0.08 : 9 :
        //     this.props.height * 0.08 > 9 ? this.props.height * 0.08 : 9;

        // let fatcor = maxTextLength < 6 ? 0.7 : maxTextLength < 12 ? 0.6 : 0.5;

        let maxTextDx =
            this.props.width * 0.98 - (maxTextLength * this.props.rangeValueStyles.fontSize * 0.6);

        progressBarChart.append("text")
            .attr("class", "gauge-min-label")
            //.attr("text-anchor", "middle")
            .attr("dy", `${footerdyPosition}px`)
            .attr("dx", `0px`)
            .attr("style", `font-size:${this.props.rangeValueStyles.fontSize}px; font-family:${this.props.rangeValueStyles.fontFamily};`)
            .attr("fill", this.props.rangeValueStyles.color)
            .text(`${this.props.minText}`);

        progressBarChart.append("text")
            .attr("class", "max-val")
            //.attr("text-anchor", "middle")
            .attr("dy", `${footerdyPosition}px`)
            .attr("dx", `${maxTextDx}px`)
            .attr("style", `font-size:${this.props.rangeValueStyles.fontSize}px; font-family:${this.props.rangeValueStyles.fontFamily};`)
            .attr("fill", this.props.rangeValueStyles.color)
            .text(`${this.props.maxText}`);

    }
}


// defaultColor : "rgba(128,128,128,0.15)"
