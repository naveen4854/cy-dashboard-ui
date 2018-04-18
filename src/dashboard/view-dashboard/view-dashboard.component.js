

import React, { PureComponent } from 'react';

//TODO: change to container
import { WidgetsBarContainer } from '../../components/widgets-bar';
import DashboardLayoutContainer from '../../components/dashboard-layout';
import WidgetConfigurationsContainer from '../../components/widget-configurations/';

export default class NewDashboard extends PureComponent {

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }
    componentDidUpdate() {
    }
    goBack() {
      }
    render() {
        return (
            <div className='background' >
                <div className="row">
                    <div onClick={this.goBack} id="corner-triangle" className="pointer">
                        <div className="corner-triangle-text text-capitalize">
                            <a target="_blank">
                                <i className="fa fa-angle-down fa-rotate-45" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-12  col-sm-12  col-xs-12">
                        <DashboardLayoutContainer />
                        Yes this is new
                    </div>
                </div>
            </div>
        )
    }
}