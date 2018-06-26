

import React, { Component } from 'react';
import { WidgetsBarContainer } from '../../components/widgets-bar';
import DashboardLayoutContainer from '../../components/dashboard-layout';
import WidgetConfigurationsContainer from '../../components/widget-configurations/';

export default class NewSlider extends Component {

    constructor(props) {
        super(props)
    }

   
    render() {
        return (
            <div className='background' >
                {/* <WidgetsBarContainer l={this.props.l} AddWidget={this.props.AddWidget} /> */}
                <div className="row">
                    <div className="col-md-12  col-sm-12  col-xs-12">
                        <h1 >
                            In progres...
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}