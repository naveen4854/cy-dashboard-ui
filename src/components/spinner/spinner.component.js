

import React from 'react'
import _ from 'lodash';
import './custom-spinner.css'
import SpinnerImage from './loading_ripple.svg';

export default class Dashboard extends React.Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }
    render() {
        return (
            <div>
                {(this.props.spinner.pendingTasks > 0) &&
                    <div className="parent">
                        <div className="child"><img src={SpinnerImage} alt="loading...." /></div>
                    </div>
                }
            </div>
        )
    }
}
