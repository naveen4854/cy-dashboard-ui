

import React, { PureComponent } from 'react';

//TODO: change to container
import { WidgetsBar } from '../../components/widgets-bar';
import DashboardLayoutContainer from '../../components/dashboard-layout';
import WidgetConfigurationsContainer from '../../components/widget-configurations/';

export default class NewDashboard extends PureComponent {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
    }
    componentDidUpdate() {
    }
    render() {
        return (
            <div className='background' >
                <div>
                    <WidgetsBar l={this.props.l} AddWidget={this.props.AddWidget} />
                </div>
                <div className="row">
                    <div className="col-md-12  col-sm-12  col-xs-12">
                        <DashboardLayoutContainer />
                        <WidgetConfigurationsContainer />
                    </div>
                </div>
            </div>
        )
    }
}