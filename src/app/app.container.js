import { connect } from 'react-redux';

import AppComponent from './app.component';
import * as LocalizationReducer from '../components/localization/localization.reducer';
import * as AppReducer from './app.reducer';

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
            dispatch({
                type: UPDATE_REF_TOKEN_TIMEOUT_ID,
                tokenRefTimeOutId: -1
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)