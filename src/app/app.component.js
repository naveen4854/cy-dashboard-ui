import React, { PropTypes, PureComponent } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.css';
import '../public/assets/vendors/bootstrap/css/bootstrap.min.css';
import '../public/assets/styles/cx-bones.css';
import '../public/assets/styles/cx-skin-default.css';
import '../public/assets/styles/cx-main.css';

import NotificationContainer from '../components/notifications/notification.container';
import SpinnerContainer from '../components/spinner/spinner.container';

export default class AppComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let culture = "en-AU";
        //let culture = navigator.language;
        this.props.GetLocalizationData(culture);
    }

    render() {
        const { routes, store } = this.props;
        return (
            <div>
                <Provider store={store}>
                    <div style={{ height: '100%' }}>
                        <Router history={browserHistory} children={routes} />
                        <NotificationContainer />
                        <SpinnerContainer />
                    </div>

                </Provider >
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div dir="ltr" className="navbar-nav mr-auto fixed-bottom">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button onClick={() => this.props.GetLocalizationData("en-us")}>en-us</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => this.props.GetLocalizationData("en-AU")}>en-AU</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => this.props.GetLocalizationData("he-IL")}>he</button>
                            </li>
                            {/* <li className="nav-item">
                                <h1 style={{ backgroundColor: 'white' }}>{this.props.app.currentTabId}</h1>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
