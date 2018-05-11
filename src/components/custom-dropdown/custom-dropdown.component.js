import React from 'react';
import Select from 'react-select';
import './styles.css';
import _ from 'lodash'

export default class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
        this.state = {
            onChangeFromEvent: false,

        };
        if (props.value !== undefined && !_.isEqual(props.value, {})) {
            this.props.onChange(props.value);
        }
        else if (props.options && props.options.length == 1) {
            this.props.onChange(props.options[0]);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.onChangeFromEvent && this.props.value != nextProps.value) {
            let newValue = nextProps.options && nextProps.options.length == 1 ? nextProps.options[0] : nextProps.value;
            this.props.onChange(newValue)
            this.setState({
                onChangeFromEvent: false
            })
        }
        // if (!this.state.onChangeFromEvent && nextProps.options && nextProps.options.length == 1 && this.props.value != nextProps.value) {
        //     this.props.onChange(nextProps.options[0]);
        //     this.setState({
        //         onChangeFromEvent: false
        //     })
        // }
    }

    onChange(e) {
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
        let options = this.props.options || [];
        let selectedValue = this.props.value;
        if (selectedValue && !selectedValue.value) {
            selectedValue = _.find(this.props.options, { 'value': this.props.value }) || {};
        }
        if (Object.keys(selectedValue).length == 0 && options.length != 0) {
            selectedValue = null
        }

        if (options.length == 1)
            selectedValue = options[0]

        return (
            <Select
                value={selectedValue}
                options={options}
                isDisabled={options.length == 0 || options.length == 1 || this.props.disabled}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
            />
        );
    }
}
