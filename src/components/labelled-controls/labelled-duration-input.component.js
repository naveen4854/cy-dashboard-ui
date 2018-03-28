import React, { PureComponent } from 'react';
import { CustomInputText } from '../input-component';
import LabelledControl from './labelled-control'
import CustomSelect from '../custom-dropdown';
import DurationInput from '../duration-input'

export default class LabelledDurationInput extends PureComponent {

    render() {
        return (
            <LabelledControl label={this.props.label}>
                <DurationInput
                    displayFormatId={this.props.displayFormatId}
                    value={this.props.value}
                    wKey={this.props.wKey}
                    enableInput={this.props.enableInput}
                    updatePropOnChange={this.props.updatePropOnChange}
                />
            </LabelledControl >
        )
    }
}