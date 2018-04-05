import { connect } from 'react-redux'
import ComboMetricsSettingsComponent from './combo-metrics-settings.component';

const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        comboSettings: state.comboSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComboMetricsSettingsComponent)
