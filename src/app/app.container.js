import { connect } from 'react-redux';

import AppComponent from './app.component';
import * as LocalizationReducer from '../components/localization/localization.reducer';
import * as AppReducer from './app.reducer';

const mapDispatchToProps = (dispatch) => {
    return {
        GetLocalizationData: (culture) => {
            dispatch(LocalizationReducer.GetLocalizationData(culture));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)