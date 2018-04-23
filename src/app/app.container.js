import { connect } from 'react-redux';

import AppComponent from './app.component';
import * as LocalizationReducer from '../components/localization/localization.reducer';
import * as AppReducer from './app.reducer';
import { UPDATE_REF_TOKEN_TIMEOUT_ID, UPDATE_PING_TOKEN_TIMEOUT_ID } from '../login/login.reducer';
import { clearRefreshTokenTimeout, defaultRedirection } from '../login/login.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        GetLocalizationData: (culture) => {
            dispatch(LocalizationReducer.GetLocalizationData(culture));
        },
        setTabId: () => {
            dispatch(AppReducer.setTabId());
        },
        removeFromTabsList: () => {
            dispatch(AppReducer.removeFromTabsList());
        },
        setRefreshToken: () => {
            dispatch(AppReducer.setRefreshToken());
        },
        triggerRefreshFromOtherTab: () => {
            dispatch(AppReducer.triggerRefreshFromOtherTab())
        },
        logout: () => {
            dispatch(AppReducer.logout());
        },
        cleartimeout: () => {
            dispatch(clearRefreshTokenTimeout())
        },
        clearPingTimeout: () => {
            dispatch({
                type: UPDATE_PING_TOKEN_TIMEOUT_ID,
                pingRefTimeOutId: -1
            })
        },
        defaultRedirection: () => {
            dispatch(defaultRedirection())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        common: state.common
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)