import React from 'react';
import ReactDOM from 'react-dom';
import InputMask from 'react-input-mask';

class MaskedInput extends React.Component {
    constructor(props) {
        super(props);
              
        this.state = {
            value: this.props.value,
            mask: this.props.mask,
            inValid: !this.isValid(this.props.regex, this.props.value)
        };
        this.handleChange = this.handleChange.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.value != nextProps.value || this.props.disabled != nextProps.disabled) {
            this.state = {
                value: nextProps.value,
                mask: nextProps.mask,
                inValid: !this.isValid(this.props.regex, nextProps.value)
            };
        }
    }
    // shouldComponentUpdate(newProps, newState) {
    //     return (
    //         this.state.value !== newState.value
    //         || this.props.disabled != newProps.disabled
    //     );
    // }
    componentDidMount() {

    }
    handleChange(e) {
        let value = e.target.value;

        let isValid = this.isValid(this.props.regex, value);
        this.setState({
            value,
            inValid: !isValid
        });

        if (isValid)
            this.props.onChange(value);

    }

    isValid(regex, value) {
        // No Regex passed
        if (!regex) {
            return true
        }

        if (regex) {
            return value.toString().match(new RegExp(regex)) ? true : false
        }
    }

    render() {
        return (<InputMask disabled={this.props.disabled} className={this.state.inValid ? "form-control is-inValid" : "form-control"} value={this.state.value} alwaysShowMask={true} onChange={(e) => this.handleChange(e)} maskChar=" " />);
    }
}

export default MaskedInput;