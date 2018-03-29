var React = require('react');
var ReactDom = require('react-dom');
var d3 = require('d3');
import * as color from '../../../../lib/color-conversion';


let ArcGauge = React.createClass({
    getDefaultProps() {
        return {
            width: '100%'
        }
    },

    propTypes: {
        value: React.PropTypes.number.isRequired,
        size: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        radius: React.PropTypes.number,
        sections: React.PropTypes.any,
        arrow: React.PropTypes.object,
        label: React.PropTypes.string,
        legend: React.PropTypes.any
    },

    getInitialState() {
        return {
            arrow: this.props.arrow || {
                height: 55,
                width: 5,
                color: '#a5a5a5'
            },
            radius: this.props.radius,
            sections: this.props.sections,
            sectionsNum: this.props.sections.length,
            sectionWidth: this.props.size,
            legend: this.props.legend,
            width: this.props.width,
            height: this.props.height,
            value: this.props.value,
            label: this.props.label,
            min: this.props.min,
            max: this.props.max,
            valueStyles: this.props.valueStyles,
            title: this.props.title,
            titleStyles: this.props.titleStyles,
            oldValue: 0,
            isComboWidget: this.props.isComboWidget,
            rangeValueStyles: this.props.rangeValueStyles
        }
    },

    componentDidMount() {
        return this.renderArcGauge();
    },

    componentDidUpdate() {
        return this.renderArcGauge();
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            arrow: nextProps.arrow || {
                height: 55,
                width: 5,
                color: '#a5a5a5'
            },
            radius: nextProps.radius,
            sections: nextProps.sections,
            sectionsNum: nextProps.sections.length,
            sectionWidth: nextProps.size,
            legend: nextProps.legend,
            width: nextProps.width,
            height: nextProps.height,
            value: nextProps.value,
            label: nextProps.label,
            min: nextProps.min,
            max: nextProps.max,
            valueStyles: nextProps.valueStyles,
            title: nextProps.title,
            titleStyles: nextProps.titleStyles,
            oldValue: this.state.value,
            isComboWidget: nextProps.isComboWidget,
            rangeValueStyles: nextProps.rangeValueStyles
        })
    },

    render() {
        return <div style={{ height: this.state.height }} />;
},

renderArcGauge() {
    const el = ReactDom.findDOMNode(this);

    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
    // Values: provided styles || default styles
    let
      rotateAngle = .75,
      sectionFill = 1 / this.state.sectionsNum / 2,
      sectionSpaces = 0.06,
      arcStart, arcEnd, padStart, padEnd;

    // Draw svg
    let arc = d3.svg.arc()
      .startAngle(this._deg2rad(-80))
      .endAngle(this._deg2rad(80))
      .outerRadius(this.state.height);

    let svg = d3.select(el).append("svg")
      .attr("width", this.state.width)
      .attr("height", this.state.height)
      .append("g")
      .attr("transform", "translate(" + this.state.width / 2 + "," + this.state.height * 0.66 + ")");

    var meter = svg.append("g")
      .attr("class", "progress-meter");


    if (!this.state.isComboWidget) {
        let title = meter.append("text")
          .attr("class", "gauge-min-label")
          .attr("text-anchor", "middle")
          .attr("dy", `-${this.state.radius * 1.1}px`)
          .attr("style", `font-family: ${this.state.titleStyles.fontFamily}; font-size:${this.state.titleStyles.fontSize}`)
          .attr("fill", this.state.titleStyles.color);

        title.text(this.state.title);
    }

    // Generate path
    this.state.sections.map((section, sectionIndex) => {
        arcStart = this._percToRad(rotateAngle);
        arcEnd = arcStart + this._percToRad(sectionFill);
        rotateAngle += sectionFill;
        padStart = 0 ? 0 : sectionSpaces / 2;
        padEnd = this.state.sectionsNum ? 0 : sectionSpaces / 2;

        arc = d3.svg.arc()
          .outerRadius(this.state.radius)
          .innerRadius(this.state.radius - this.state.sectionWidth)
          .startAngle(arcStart + padStart)
          .endAngle(arcEnd - padEnd);

        meter.append("path")
          .attr("d", arc)
          .attr("id", "gauge-path-" + (sectionIndex + 1))
          .attr('class', "gauge-section-" + (sectionIndex + 1))
          .attr("fill", section);
    });

    // let minMaxTextSize = this.state.sectionWidth * 0.2 > 12 ? this.state.sectionWidth * 0.5 : 12;
    let minTextDx = this.state.radius * 0.93;// * (1 - (this.props.minText.toString().length * 0.0005));

    let minText = meter.append("text")
      .attr("class", "gauge-label")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("dx", `-${minTextDx}px`)
      .attr("style", `font-family: ${this.state.rangeValueStyles.fontFamily}; font-size:${this.state.rangeValueStyles.fontSize}`)
      .attr("fill", this.state.rangeValueStyles.color);

    minText.text(`${this.props.minText}`);

    // If label
    if (this.state.label) {
        let r = this.state.radius * 0.2;
        let f = _.parseInt(this.state.valueStyles.fontSize.substring(0, this.state.valueStyles.fontSize.length - 2));
        let dy = r > f ? r : f;
        let valueLabel = meter.append("text")
          .attr("class", "gauge-min-label")
          .attr("text-anchor", "middle")
          .attr("dy", `${dy}px`)
          .attr("style", `font-family: ${this.state.valueStyles.fontFamily}; font-size:${this.state.valueStyles.fontSize}`)
          .attr("fill", this.state.valueStyles.color);

        valueLabel.text(this.state.label);
    }
    let maxTextDx = this.state.radius * 0.95// - (this.props.maxText.toString().length * this.state.rangeValueStyles.fontSize * 0.18);
    let maxText = meter.append("text")
      .attr("class", "gauge-label")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("dx", `${maxTextDx}px`)
      .attr("style", `font-family: ${this.state.rangeValueStyles.fontFamily}; font-size:${this.state.rangeValueStyles.fontSize}px`)
      .attr("fill", this.state.rangeValueStyles.color);

    maxText.text(`${this.props.maxText}`);

    // Draw and animate arrow with default or provided styles
    this._drawArrow(meter, this.state.oldValue * 0.01, this.state.arrow.color, this.state.arrow.width, this.state.arrow.height);
    this._animateArrow(meter, this.state.value * 0.01, this.state.arrow.width, this.state.arrow.height);

    meter.transition();

    return meter;
},

  _animateArrow(el, perc, width, height) {
      var scope = this;
      return el.transition()
        .delay(100)
        .ease("elastic")
        .duration(2000)
        .select('.gauge-arrow')
        .tween('progress', () => {
            return function (percentOfPercent) {
                return d3.select(this)
                  .attr('d', scope._mkCmd(width, height, perc));
            };
        });
  },

  _drawArrow(el, perc, color, width, height) {
      el.append('circle')
        .attr('class', 'gauge-arrow-center')
        .attr('cx', 0).attr('cy', 0)
        .attr("fill", color)
        .attr('r', width);

      return el.append('path')
        .attr('class', 'gauge-arrow')
        .attr("fill", color)
        .attr('d', this._mkCmd(width, height, perc));
  },

  _mkCmd(width, height, perc) {
      let centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;

      thetaRad = this._percToRad(perc / 2);
      centerX = 0;
      centerY = 0;
      topX = centerX - height * Math.cos(thetaRad);
      topY = centerY - height * Math.sin(thetaRad);
      leftX = centerX - width * Math.cos(thetaRad - Math.PI / 2);
      leftY = centerY - width * Math.sin(thetaRad - Math.PI / 2);
      rightX = centerX - width * Math.cos(thetaRad + Math.PI / 2);
      rightY = centerY - width * Math.sin(thetaRad + Math.PI / 2);
      return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
  },

  _percToDeg(perc) {
      return perc * 360;
  },

  _percToRad(perc) {
      return this._degToRad(this._percToDeg(perc));
  },

  _degToRad(deg) {
      return deg * Math.PI / 180.5;
  },

  _deg2rad(deg) {
      return deg / 180 * Math.PI;
  }
});

module.exports = ArcGauge;
