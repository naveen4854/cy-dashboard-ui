import React from 'react'
import { DashboardModeEnum } from '../../shared/enums';
import { Constants } from '../../shared/constants';

export default class MainDashBoard extends React.Component {
    componentWillMount() {
        localStorage.setItem(Constants.mode, this.props && this.props.routeParams && this.props.routeParams.id
            ? DashboardModeEnum.Edit : DashboardModeEnum.New)
    }
    componentWillReceiveProps(nextProps) {
        localStorage.setItem(Constants.mode, this.props && this.props.routeParams && this.props.routeParams.id
            ? DashboardModeEnum.Edit : DashboardModeEnum.New)
    }
    componentDidUpdate(prevProps) {
       
    }
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}