import React, { PropTypes } from 'react';
import _ from 'lodash';
import Scrollbars from 'react-scrollbar';
import RadioButton from './radio-button.component';
import './styles.css';

export default class RadioButtonGroup extends React.Component {
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

    handleChange(item) {
        const newRadioList = _.map(this.state.radioList, (radioOption) => {
            return {
                label: radioOption.label,
                value: radioOption.value,
                checked: radioOption.value === item.value
            }
        });
        this.setState({
            radioList: newRadioList
        });
        this.props.onChange(newRadioList);
    }
    
    render() {
        return (
            <div>
                {
                    this.state.label &&
                    <div className='row'>
                        <div className="col-md-6 radio-list-label">
                            {this.state.label}
                        </div>
                    </div>
                }
                <Scrollbars className="scroll-bar">
                    <div className='row'>
                        <div className='radio-group-list col-md-6'>
                            {
                                _.map(this.state.radioList, (radioOption) =>
                                    <RadioButton key={`${radioOption.value}_${radioOption.label}`} {...radioOption} onChange={(e) => this.handleChange(e)} />
                                )
                            }
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    }

}
