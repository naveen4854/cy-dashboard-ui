import { connect } from 'react-redux'
import ComboMetricsSettingsComponent from './combo-metrics-settings.component';
import localize from '../localization/localization.hoc';
import { setSelectedStatisticCategory } from '../data-metrics/data-metrics.reducer';
import { saveComboRealTimeMetrics, saveComboCustomMetricsAction } from '../data-metrics/data-metrics.actions';


const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedStatisticCategory: (selectedStatisticCategory) => {
            dispatch(setSelectedStatisticCategory(selectedStatisticCategory))
        },
        saveComboRealTimeMetrics: () => {
            dispatch(saveComboRealTimeMetrics())
        },
        saveComboCustomMetricsAction: () => {
            dispatch(saveComboCustomMetricsAction())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dataMetrics: state.dataMetrics
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ComboMetricsSettingsComponent))
