import React, { PureComponent } from 'react';
import { CustomInputText } from '../input-component';
import LabelledControl from './labelled-control'
import CustomSelect from '../custom-dropdown';

export default class LabelledInput extends PureComponent {

    render() {
        return (
            <div className="marginTop10">
                <LabelledControl label={this.props.label}>
                    <CustomSelect //name="field-group-options"
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        options={this.props.options}
                        onChange={this.props.onChange} />
                </LabelledControl >
            </div>
        )
    }
}