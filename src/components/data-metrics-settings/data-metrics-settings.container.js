import { connect } from 'react-redux'
import DataMetricsSettingsComponent from './data-metrics-settings.component';
import localize from '../localization/localization.hoc';
import * as DataMetricsReducer from '../data-metrics/data-metrics.reducer';


const mapDispatchToProps = (dispatch) => {
    return {
        initializeStatisticMetadata: () => {
            dispatch(DataMetricsReducer.initializeStatisticMetadata());
        },
        setSelectedStatisticCategory: (selectedStatisticCategory) => {
            dispatch(DataMetricsReducer.setSelectedStatisticCategory(selectedStatisticCategory));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dataMetrics: state.dataMetrics
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(DataMetricsSettingsComponent))
