import { connect } from 'react-redux'
import ComboRealTimeMetricsSettingsComponent from './combo-realtime-metrics-settings.component';

const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        //comboSettings: state.comboSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComboRealTimeMetricsSettingsComponent)
