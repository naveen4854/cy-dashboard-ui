

import React, { PureComponent } from 'react';
import { browserHistory } from 'react-router';

//TODO: change to container
import { WidgetsBarContainer } from '../../components/widgets-bar';
import DashboardLayoutContainer from '../../components/dashboard-layout';
import WidgetConfigurationsContainer from '../../components/widget-configurations/';
import { DashboardModeEnum } from '../../shared/enums';
import { DefaultDashboardId } from '../../shared/constants/constants';

export default class ViewDashboardComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.redirectToEdit = this.redirectToEdit.bind(this);
    }
    redirectToEdit(event) {
        if (event.keyCode === 27) {
            //browserHistory.push(`/dashboard/edit/${this.props.dashboard.Id}`);
            this.goBack();
        }
    }
    componentWillReceiveProps(nextProps) {
    }
    componentDidUpdate() {
    }
    componentDidMount() {
        document.addEventListener("keydown", this.redirectToEdit, false);
    }

    componentWillUnmount() {
        this.props.clearRefreshInterval();
        document.removeEventListener("keydown", this.redirectToEdit, false);
        // this.goBack();
    }
    goBack() {
        // Navigate to edit page of the dashboard.
        //this.props.navigate();
        if (this.props.dashboard.mode == DashboardModeEnum.EditToLive) {
            if (!this.props.dashboard.Id || this.props.dashboard.Id == DefaultDashboardId) {
                // this.props.updateDashboardMode(DashboardModeEnum.New);
                browserHistory.push(`/dashboard/${DefaultDashboardId}`);
            }
            else {
                // this.props.updateDashboardMode(DashboardModeEnum.Edit);
                browserHistory.push(`/dashboard/edit/${this.props.dashboard.Id}`);
            }
        }
        else {
            this.props.updateDashboardMode(DashboardModeEnum.None);
            // Navigate to my files page.
            this.props.resetDashboard();
            browserHistory.push(`/dashboard/mydashboards`);
        }
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