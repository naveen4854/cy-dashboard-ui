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
                    displayFormatId={displayFormatId}
                    value={this.state.widget.min}
                    wKey='min'
                    enableInput={this.state.widget.enableMin}
                    updatePropOnChange={this.updateProp}
                />
            </LabelledControl >
        )
    }
}