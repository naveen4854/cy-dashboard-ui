import { connect } from 'react-redux'
import localize from '../localization/localization.hoc';
import * as DataMetricsReducer from '../data-metrics/data-metrics.reducer';
import RealTimeSettingsComponent from './real-time-settings.component';


const mapDispatchToProps = (dispatch) => {
    return {
        setStatisticGroupAndGetItems: (statisticGroup) => {
            dispatch(DataMetricsReducer.setSelectedGroupValue(statisticGroup));
            dispatch(DataMetricsReducer.setStatisticsItems());
        },
        setItemAndGetFunctions: (selectedItem) => {
            dispatch(DataMetricsReducer.setSelectedSatisticItem(selectedItem));
            dispatch(DataMetricsReducer.setStatisticFunctions());
        },
        setFunctionAndGetDisplayFormat: (selectedFunction) => {
            dispatch(DataMetricsReducer.setSelectedFunction(selectedFunction));
            dispatch(DataMetricsReducer.getDisplayFormat());
        },
        setSelectedDisplayFormat: (selectedDisplayFormat) => {
            if (selectedDisplayFormat) {
                dispatch(DataMetricsReducer.setSelectedDisplayFormatAction(selectedDisplayFormat));
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dataMetrics: state.dataMetrics
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(RealTimeSettingsComponent))
