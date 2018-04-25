import React from 'react';
import Select from 'react-select';
import './styles.css';
import _ from 'lodash'

export default class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
        this.state = {
            onChangeFromEvent: false
        };
        if (props.value !== undefined && !_.isEqual(props.value, {})) {
            this.props.onChange(props.value);
        }
        else if (props.options && props.options.length == 1) {
            this.props.onChange(props.options[0]);
        }
    }

    componentWillReceiveProps(nextProps) {
        debugger
        if (!this.state.onChangeFromEvent && this.props.value != nextProps.value) {
            this.props.onChange(nextProps.value)
            this.setState({
                onChangeFromEvent: false
            })
        }
        if (!this.state.onChangeFromEvent && nextProps.options && nextProps.options.length == 1 && this.props.value != nextProps.value) {
            this.props.onChange(nextProps.options[0]);
            this.setState({
                onChangeFromEvent: false
            })
        }
    }

    onChange(e) {
        debugger
        this.setState({
            onChangeFromEvent: true
        }, function () {
            this.props.onChange(e);
            this.setState({
                onChangeFromEvent: false
            })
        });

    }

    render() {
        let selectedValue = this.props.value;
        if (selectedValue && !selectedValue.value) {
            selectedValue = _.find(this.props.options, { 'value': this.props.value }) || {};
        }
        // if (_.isEqual(this.props.value, {}))
        //     selectedValue = undefined
        // console.log(this.props.placeholder)
        return (
            <Select value={this.props.options && this.props.options.length == 1 ? this.props.options[0] : selectedValue}
                // placeholder={this.props.placeholder}
                options={this.props.options}
                disabled={this.props.options && this.props.options.length == 1 || this.props.disabled}
                onChange={this.onChange} />
        );
    }
}
