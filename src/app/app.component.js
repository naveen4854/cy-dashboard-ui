import React, { PropTypes, PureComponent } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'

// import 'bootstrap/dist/css/bootstrap.css';
import '../public/assets/vendors/bootstrap/css/bootstrap.min.css';
import '../public/assets/styles/cx-bones.css';
import '../public/assets/styles/cx-skin-default.css';
import '../public/assets/styles/cx-main.css';
import * as authMan from "../authentication/auth-manager";

import NotificationContainer from '../components/notifications/notification.container';
import SpinnerContainer from '../components/spinner/spinner.container';
import { Constants } from '../shared/constants';

export default class AppComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        authMan.setAuthTokenRefreshInitialized(false);

        window.addEventListener("beforeunload", (event) => {
            this.props.removeFromTabsList();
            this.props.triggerRefreshFromOtherTab();
        });

        window.addEventListener("storage", (event) => {
            if (event.key === Constants.setNewRt) {
                this.props.setRefreshToken();
                
                if (!event.oldValue && event.newValue)
                    this.props.defaultRedirection();

                if (!event.newValue)
                    this.props.logout();
            }
            if (event.key === Constants.cleartimeout) {
                if (this.props.app.currentTabId != localStorage.getItem(Constants.refreshTabId))
                    this.props.cleartimeout();
                this.props.clearPingTimeout();
            }
        });
        this.props.setTabId();

        let culture = navigator.language;
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
                        <ReduxToastr
                            transitionIn="fadeIn"
                            transitionOut="fadeOut"
                            preventDuplicates
                        />
                    </div>
                </Provider >
                {/* <div dir="ltr" className="navbar-fixed-bottom">
                    <button onClick={() => { this.props.common.notify('en-us'); this.props.GetLocalizationData("en-us") }}>en-us</button>
                    <button onClick={() => { this.props.common.notify('en-AU'); this.props.GetLocalizationData("en-AU") }}>en-AU</button>
                    <button onClick={() => { this.props.common.notify('he'); this.props.GetLocalizationData("he") }}>he</button>
                    <button style={{ backgroundColor: 'white' }}>{this.props.app.currentTabId}</button>
                </div> */}
            </div>
        )
    }
}
