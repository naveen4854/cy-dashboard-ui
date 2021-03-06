import { connect } from 'react-redux'
import localize from '../localization/localization.hoc';
import * as RealTimeSettingsActions from './real-time-settings.actions';
import RealTimeSettingsComponent from './real-time-settings.component';
import { PageEnum } from '../../shared/enums';


const mapDispatchToProps = (dispatch) => {
    return {
        initiateRealTimeSettings: () => {

        },
        setStatisticGroupAndGetItems: (statisticGroup) => {
            dispatch(RealTimeSettingsActions.setSelectedGroupValue(statisticGroup));
            dispatch(RealTimeSettingsActions.setStatisticsItems());
        },
        setItemAndGetFunctions: (selectedItem) => {
            dispatch(RealTimeSettingsActions.setSelectedSatisticItem(selectedItem));
            dispatch(RealTimeSettingsActions.setStatisticFunctions());
        },
        setFunctionAndGetDisplayFormat: (selectedFunction) => {
            dispatch(RealTimeSettingsActions.setSelectedFunction(selectedFunction));
            dispatch(RealTimeSettingsActions.getDisplayFormat());
        },
        setSelectedDisplayFormat: (selectedDisplayFormat) => {
            if (selectedDisplayFormat) {
                dispatch(RealTimeSettingsActions.setSelectedDisplayFormatAction(selectedDisplayFormat));
            }
        },
        saveMetrics: (dataMetrics) => {
            dispatch(RealTimeSettingsActions.saveRealTimeMetrics(dataMetrics));
        },
        getDrillDownMetaData: (selectedItem) => {
            if (selectedItem) {
                dispatch(RealTimeSettingsActions.getDrillDownMetaData(selectedItem));
            }
        },
        updateDrillDownOptions: (options) => {
            if (options) {
                dispatch(RealTimeSettingsActions.updateDrillDownOptions(options));
            }
        },
        toggleDrillDown: (shouldOpen) => {
            dispatch(RealTimeSettingsActions.toggleDrillDown(shouldOpen))
        },
        setDrillDownDefaulted: () => {
            dispatch(RealTimeSettingsActions.setDrillDownDefaulted(false))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        realTimeSettings: state.realTimeSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(RealTimeSettingsComponent, PageEnum.DATA_METRICS))
