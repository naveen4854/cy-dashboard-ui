"use srtict"
import React, { PropTypes } from 'react';
import _ from 'lodash';
import ThresholdTabContent from './tabs-threshold-content.component';


export default class ThresholdAccordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ..._.cloneDeep(props)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ..._.cloneDeep(nextProps)
        })
    }

    render() {
        return (
            <div>
                {_.map(this.state.levels, (level) =>
                    <ThresholdTabContent
                        l={this.props.l}
                        key={level.id}
                        removeLevel={this.props.removeLevel.bind(this, level.id)}
                        {...level}
                        
                       
                        
                        
                        
                        validateEmailIds={this.props.validateEmailIds}
                        displayFormat={this.props.displayFormat}
                        column={this.props.column}
                        showNotification={this.props.showNotification}
                        clearNotification={this.props.clearNotification}
                    />
                )}
            </div>
        );
    }
}
ThresholdAccordion.PropTypes = {
    levels: PropTypes.array.isRequired
}