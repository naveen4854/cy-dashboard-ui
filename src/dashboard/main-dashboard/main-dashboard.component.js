import React from 'react'
import { DashboardModeEnum } from '../../shared/enums';

export default class MainDashBoard extends React.Component {
    componentWillMount() {
        console.log(this.props, 'main')
        localStorage.setItem('mode', this.props && this.props.routeParams && this.props.routeParams.id
            ? DashboardModeEnum.Edit : DashboardModeEnum.New)
        console.log(this.props, 'after')
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, 'main recieve')
        // this.props.clearFunction();
        localStorage.setItem('mode', this.props && this.props.routeParams && this.props.routeParams.id
            ? DashboardModeEnum.Edit : DashboardModeEnum.New)
    }
    componentDidUpdate(prevProps) {
        console.log(prevProps,'prevProps')
    }
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}