import React, { PureComponent } from 'react';
import { CustomInputText } from '../input-component';
import LabelledControl from './labelled-control'

export default class LabelledTextArea extends PureComponent {

  render() {
    return (
      <LabelledControl label={this.props.label}>
        <textarea
          rows="4"
          cols="50"
          className="form-control"
          value={this.props.value}
          onChange={this.props.onCustomInputChange}>
        </textarea>

      </LabelledControl>
    )
  }
}