import { connect } from 'react-redux'
import ComboMetricsSettingsComponent from './combo-metrics-settings.component';
import localize from '../localization/localization.hoc';
import { setSelectedStatisticCategory } from '../data-metrics/data-metrics.reducer';


const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedStatisticCategory: (selectedStatisticCategory) => {
            dispatch(setSelectedStatisticCategory(selectedStatisticCategory))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dataMetrics: state.dataMetrics
        //statisticCategory: state.dataMetrics.statisticCategory
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ComboMetricsSettingsComponent))
