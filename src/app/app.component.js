import React, { PropTypes, PureComponent } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.css';
import '../public/assets/vendors/bootstrap/css/bootstrap.min.css';
import '../public/assets/styles/cx-main.css';
import '../public/assets/styles/cx-skin-default.css';
import '../public/assets/styles/cx-bones.css';


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
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router history={browserHistory} children={routes} />
                </div>
            </Provider >
        )
    }
}
