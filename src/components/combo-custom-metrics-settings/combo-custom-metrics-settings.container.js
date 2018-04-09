import { connect } from 'react-redux'
import ComboCustomMetricsSettingsComponent from './combo-custom-metrics-settings.component';
import localize from '../localization/localization.hoc';
import * as Actions from './combo-custom-metrics-settings.actions'

const mapDispatchToProps = (dispatch) => {
    return {
        updateComboDrillDownOptions: (options) => {
            dispatch(Actions.updateComboDrillDownOptions(options));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        combocustomSettings: state.combocustomSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ComboCustomMetricsSettingsComponent))
