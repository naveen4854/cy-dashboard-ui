import React, { PureComponent } from 'react';

export default class CustomInputText extends PureComponent {

  render() {
    return (
      <input
        type="text"
        className="form-control"
        value={this.props.value}
        onChange={this.props.onCustomInputChange}
      />
    )
  }
}