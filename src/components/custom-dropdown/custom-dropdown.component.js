import React from 'react';
import Select from 'react-select';
import './styles.css';

export default class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
        this.state = {
            value: props.value,
        };
        if (props.value !== undefined && props.value !== {}) {
            this.props.onChange(props.value);
        }
    }

    componentWillReceiveProps(nextProps) {   
        //TODO: work on this to stop double change trigger 
        // this causes double onchange..but not having this doesnt trigger default on change, hence checking value to undefined
        // if ((_.isEqual(this.props.value == {}) || this.props.value == undefined) && nextProps.value !== undefined && this.props.value !== nextProps.value) {
        if (nextProps.value !== undefined && this.props.value !== nextProps.value) {
            this.props.onChange(nextProps.value);
        }

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
            // debugger
        }
        return (
            <Select value={this.props.value}
                placeholder={this.props.placeholder}
                options={this.props.options}
                disabled={this.props.options.length == 1 || this.props.disabled}
                onChange={this.onChange} />
        );
    }
}
