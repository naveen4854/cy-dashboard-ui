import React from 'react';
import ReactDOM from 'react-dom';
import InputMask from 'react-input-mask';

class MaskedInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {

    }

    handleChange(e) {
        let value = e.target.value;
        let isValid = this.isValid(this.props.regex, value);

        // if (isValid)
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
        let valid = this.isValid(this.props.regex, this.props.value)
        return (
            <InputMask
                disabled={this.props.disabled}
                className={valid ? "form-control" : "form-control is-inValid"}
                value={this.props.value}
                alwaysShowMask={true}
                onChange={(e) => this.handleChange(e)}
                maskChar=" "
            />
        );
    }
}

export default MaskedInput;