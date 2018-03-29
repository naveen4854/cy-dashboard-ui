var React = require('react');
var ReactDom = require('react-dom');
var ArcGauge = require('./arc-gauge.component');


let Gauge = React.createClass({
  getDefaultProps() {
    return {
      value: 0,
      size: 15,
      radius: 25,
      sections: ['#ccc', '#999', '#444'],
      arrow: null,
      label: null,
      legend: null
    }
  },

  propTypes: {
    value: React.PropTypes.number.isRequired,
    sections: React.PropTypes.any,
    size: React.PropTypes.number,
    radius: React.PropTypes.number,
    arrow: React.PropTypes.object,
    label: React.PropTypes.string,
    legend: React.PropTypes.any,
    width: React.PropTypes.any,
    height: React.PropTypes.any,
    max: React.PropTypes.any,
    min: React.PropTypes.any,
    labelColor: React.PropTypes.any
  },

  getInitialState() {
    return {
      width: this.props.width,
      height: this.props.height,
      value: this.props.value,
      size: this.props.size,
      radius: this.props.radius,
      sections: this.props.sections,
      arrow: this.props.arrow,
      label: this.props.label,
      legend: this.props.legend,
      min: this.props.min,
      max: this.props.max,
      valueStyles: this.props.valueStyles,
      title: this.props.title,
      titleStyles: this.props.titleStyles,
      isComboWidget: this.props.isComboWidget,
      rangeValueStyles:this.props.rangeValueStyles
    }
  },

  componentDidMount() {
    this.setState({
      width: this.props.width,
      height: this.props.height
    })
  },

  componentWillReceiveProps(nextProps) {
    let history = this.state.history || _.fill(new Array(100), 0);

    if (history.length > 100) {
      history.shift();
    }

    history.push(nextProps.value);

    this.setState({
      history: history,
      width: nextProps.width,
      height: nextProps.height,
      value: nextProps.value,
      size: nextProps.size,
      radius: nextProps.radius,
      sections: nextProps.sections,
      arrow: nextProps.arrow,
      label: nextProps.label,
      legend: nextProps.legend,
      min: nextProps.min,
      max: nextProps.max,
      valueStyles: nextProps.valueStyles,
      title: nextProps.title,
      titleStyles: nextProps.titleStyles,
      isComboWidget: nextProps.isComboWidget,
      rangeValueStyles:nextProps.rangeValueStyles
    })
  },

  render() {
    let cls = 'gauge';
    return (
      <section className={cls}>
        <ArcGauge value={this.state.value}
          size={this.state.size}
          radius={this.state.radius}
          sections={this.state.sections}
          arrow={this.state.arrow}
          label={this.state.label}
          legend={this.state.legend}
          width={this.state.width}
          height={this.state.height}
          min={this.state.min}
          max={this.state.max}
          valueStyles={this.state.valueStyles}
          title={this.state.title}
          titleStyles={this.state.titleStyles}
          isComboWidget={this.state.isComboWidget}
          rangeValueStyles={this.state.rangeValueStyles}
          minText={this.props.minText}
          maxText={this.props.maxText}
        />
      </section>
    );
  }
});


module.exports = Gauge;