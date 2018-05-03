import { connect } from 'react-redux'
import DataMetricsSettingsComponent from './data-metrics-settings.component';
import localize from '../localization/localization.hoc';
import * as DataMetricsReducer from '../data-metrics/data-metrics.reducer';
import { saveCustomMetrics } from '../custom-metrics-settings/custom-metrics-settings.actions';
import { saveCyReportMetrics } from '../cy-report-settings/cy-report-settings.actions';
import { saveRealTimeMetrics } from '../real-time-settings/real-time-settings.actions';
const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedStatisticCategory: (selectedStatisticCategory) => {
            dispatch(DataMetricsReducer.setSelectedStatisticCategory(selectedStatisticCategory));
        },
        saveCustomMetrics: () => {
            dispatch(saveCustomMetrics())
        },
        saveRealTimeMetrics: () => {
            dispatch(saveRealTimeMetrics())
        },
        saveCyreportMetrics: () => {
            dispatch(saveCyReportMetrics())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dataMetrics: state.dataMetrics
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(DataMetricsSettingsComponent))
