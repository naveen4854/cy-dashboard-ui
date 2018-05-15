import { connect } from 'react-redux'
import ComboMetricsSettingsComponent from './combo-metrics-settings.component';
import localize from '../localization/localization.hoc';
import { setSelectedStatisticCategory } from '../data-metrics/data-metrics.reducer';
import { saveComboRealTimeMetrics, saveComboCustomMetricsAction } from '../data-metrics/data-metrics.actions';
import { StatisticCategoryEnum, PageEnum } from '../../shared/enums';


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
        dataMetrics: state.dataMetrics,
        enableSave: (state.dataMetrics.statisticCategory == StatisticCategoryEnum.RealTime)
            ? (state.comboRealTimeSettings.comboSelectedStatisticColumns.length > 1
                && !_.isEmpty(state.comboRealTimeSettings.selectedDrilldownOptions))
            : (!_.isEmpty(state.comboCustomSettings.columns)
                && state.comboCustomSettings.columns[0]
                && state.comboCustomSettings.columns[0].selectedColumn
                && state.comboCustomSettings.columns[0].selectedColumn.value > 0)
        // Partial fix of enabling 'Save' button in case of custom combo. We have to consider validation of all dropdown values.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ComboMetricsSettingsComponent, PageEnum.DATA_METRICS))
