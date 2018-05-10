import { connect } from 'react-redux'
import DataMetricsSettingsComponent from './data-metrics-settings.component';
import localize from '../localization/localization.hoc';
import * as DataMetricsReducer from '../data-metrics/data-metrics.reducer';
import { saveCustomMetrics } from '../custom-metrics-settings/custom-metrics-settings.actions';
import { saveCyReportMetrics } from '../cy-report-settings/cy-report-settings.actions';
import { saveRealTimeMetrics } from '../real-time-settings/real-time-settings.actions';
import { StatisticCategoryEnum } from '../../shared/enums';
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
    let isDiabledApply = true;
    switch (state.dataMetrics.statisticCategory) {
        case StatisticCategoryEnum.RealTime:
            let ops = _.filter(state.realTimeSettings.drillDownOptions, i => i.checked == true);
            isDiabledApply = !(ops.length > 0 && state.realTimeSettings.selectedDisplayFormat && Object.keys(state.realTimeSettings.selectedDisplayFormat).length > 0)
            break;
        case StatisticCategoryEnum.CyReport:
            isDiabledApply = !(state.cyReportSettings.selectedDisplayFormat && Object.keys(state.cyReportSettings.selectedDisplayFormat).length > 0)
            break;
        default:
            isDiabledApply = !(state.customSettings.query && _.trim(state.customSettings.query) != '')
            break;
    }
    return {
        dataMetrics: state.dataMetrics,
        isDiabledApply
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(DataMetricsSettingsComponent))
