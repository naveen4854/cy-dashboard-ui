import React, { PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import LoginPage from '../login';
import LoginComponent from '../login/login.component';
import LoginComponent2 from '../dashboard/dashboard.component';

export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { routes, store } = this.props;
        return (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router history={browserHistory} children={routes} />
                </div>
            </Provider >
        )
    }
}
