import React, { PureComponent } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
import 'react-widgets/dist/css/react-widgets.css'

momentLocaliser(moment)

export default class CustomDatePicker extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value && !isNaN(Date.parse(this.props.value)) ? new Date(this.props.value) : new Date()
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, formattedValue) {
        this.setState({
            value
        })
        this.props.onChange(value);
    }

    render() {
        return (
            <div>
                <DateTimePicker
                    value={this.state.value}
                    onChange={this.handleChange}
                    step={30}
                />
                {/* <DatePicker id="example-datepicker" defaultText={this.props.value} inputFormat="MM/DD/YY h:mm A" onChange={this.handleChange} /> */}
            </div>
        )
    }
}