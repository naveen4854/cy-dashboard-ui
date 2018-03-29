import React, { PureComponent } from 'react'
import ReactDom from 'react-dom';

import ArcGauge from './arc-gauge.component';

export default class Gauge extends PureComponent {
  render() {
    return (
      <section className='gauge'>
        <ArcGauge value={this.props.value}
          size={this.props.size}
          radius={this.props.radius}
          sections={this.props.sections}
          arrow={this.props.arrow}
          label={this.props.label}
          legend={this.props.legend}
          width={this.props.width}
          height={this.props.height}
          min={this.props.min}
          max={this.props.max}
          valueStyles={this.props.valueStyles}
          title={this.props.title}
          titleStyles={this.props.titleStyles}
          isComboWidget={this.props.isComboWidget}
          rangeValueStyles={this.props.rangeValueStyles}
          minText={this.props.minText}
          maxText={this.props.maxText}
        />
      </section>
    )
  }
}
