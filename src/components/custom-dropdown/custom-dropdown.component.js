import React from 'react';
import Select from 'react-select';
import './styles.css';

export default class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options) {
            if (nextProps.options.length === 1) {
                this.setState({
                    value: nextProps.options[0]
                });
                console.log('single option for ', nextProps.options[0])
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
        if (this.props.options.length === 1) {
            debugger
        }
        return (
            <Select value={this.state.value}
                placeholder={this.props.placeholder}
                options={this.props.options}
                disabled={this.props.options.length == 1 || this.props.disabled}
                onChange={this.onChange} />
        );
    }
}
