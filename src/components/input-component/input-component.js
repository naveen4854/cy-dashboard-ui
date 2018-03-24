import React, { PureComponent } from 'react';

export default class CustomInputText extends PureComponent {

  render() {
    return (
      <input
        type="text"
        className="form-control"
        value={this.props.value}
        onChange={(e) => this.props.onCustomInputChange(e.target.value, this.props.updateKey)}
      />
    )
  }
}