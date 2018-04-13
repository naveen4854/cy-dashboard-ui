import React from 'react';
import Select from 'react-select';
import './styles.css';
import _ from 'lodash'

export default class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
        this.state = {
            value: props.value,
        };
        if (props.value !== undefined && !_.isEqual(props.value, {})) {
            this.props.onChange(props.value);
        }
    }

    componentWillReceiveProps(nextProps) {
        //TODO: work on this to stop double change trigger 
        // this causes double onchange..but not having this doesnt trigger default on change, hence checking value to undefined
        //      if ((_.isEqual(this.props.value, {}) || this.props.value == undefined) && ( !_.isEqual(this.props.value, {}) || nextProps.value !== undefined) &&  (!_.isEqual(this.props.value, nextProps.value))) {
        //   // if (nextProps.value !== undefined &&  !_.isEqual(nextProps.value, {}) && this.props.value !== nextProps.value) {
        //         debugger
        //         this.props.onChange(nextProps.value);
        //     }

        if (nextProps.options) {
            if (nextProps.options.length === 1) {
                this.setState({
                    value: nextProps.options[0]
                });
                // this.props.onChange(nextProps.options[0])
            } else {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }

    onChange(e) {
        this.props.onChange(e)
    }

    render() {

        let selectedValue = this.props.value;
        if (selectedValue && !selectedValue.value) {
            selectedValue = _.find(this.props.options, { 'value': this.props.value }) || {};
        }

        if (this.props.options.length === 1) {
            // debugger
        }
        return (
            <Select value={selectedValue}
                placeholder={this.props.placeholder}
                options={this.props.options}
                disabled={this.props.options.length == 1 || this.props.disabled}
                onChange={this.onChange} />
        );
    }
}
