import React, { PropTypes } from 'react';

export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        })
    }

    render() {
        return (
            <div className='radio-button' onClick={() => this.handleChange(this.state)} >
                <input type="radio"
                    checked={this.state.checked}
                    value={this.state.value}                    
                />
                <label>
                    {this.state.label}
                </label>
            </div>
        );
    }

    handleChange(e) {
        this.props.onChange(e);
    }
} 