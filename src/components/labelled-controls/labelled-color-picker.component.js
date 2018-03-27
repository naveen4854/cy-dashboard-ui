import React, { PureComponent } from 'react';
// import { CustomInputText } from '../input-component';
import LabelledControl from './labelled-control'
import ColorPicker from '../color-picker/color-picker';

export default class LabelledColorPicker extends PureComponent {

    render() {
        return (
            <LabelledControl label={this.props.label}>
                <ColorPicker
                    id="1"
                    key="1"
                    value={this.props.value}
                    updateColor={this.props.updateColor}
                    defaultColor="red"
                />
            </LabelledControl >
        )
    }
}