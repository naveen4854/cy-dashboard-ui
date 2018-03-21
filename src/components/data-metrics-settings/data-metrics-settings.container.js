import { connect } from 'react-redux'
import DataMetricsSettingsComponent from './data-metrics-settings.component';
import localize from '../localization/localization.hoc';


const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(DataMetricsSettingsComponent))
