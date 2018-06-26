import React, { PureComponent } from 'react';
import { browserHistory, Router } from 'react-router';
import ReactPaginate from 'react-paginate';
import Header from '../../components/header';
import { pagesList } from '../../shared/constants/constants';
import { Tab, Tabs } from 'react-bootstrap';
import MyDashboardContainer from './containers/my-dashboard.container';
import MySliderListContainer from './containers/my-slider.container';

export default class ListComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <Tabs id="topMain">
                    <Tab eventKey="f" id='dashboardTab' title={this.props.l.t('Dashboards', 'Dashboards')}>
                        <MyDashboardContainer />
                    </Tab>
                    <Tab eventKey="se" title={this.props.l.t('Sliders', 'Sliders')}>
                        <MySliderListContainer />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}


