import { connect } from 'react-redux'
import CyReportSettingsComponent from './cy-report-settings.component';
import * as CyReportSettingsActions from './cy-report-settings.actions'
import localize from '../localization/localization.hoc';

const mapDispatchToProps = (dispatch) => {
    return {
        setStatisticGroupAndGetItems: (statisticGroup) => {
            dispatch(CyReportSettingsActions.setSelectedGroupValue(statisticGroup));
            dispatch(CyReportSettingsActions.setStatisticsItems());
        },
        setItemAndGetFunctions: (selectedItem) => {
            dispatch(CyReportSettingsActions.setSelectedSatisticItem(selectedItem));
            dispatch(CyReportSettingsActions.setStatisticFunctions());
        },
        setFunctionAndGetDisplayFormat: (selectedFunction) => {
            dispatch(CyReportSettingsActions.setSelectedFunction(selectedFunction));
            dispatch(CyReportSettingsActions.getDisplayFormat());
        },
        setSelectedDisplayFormat: (selectedDisplayFormat) => {
            if (selectedDisplayFormat)
                dispatch(CyReportSettingsActions.setSelectedDisplayFormatAction(selectedDisplayFormat));
        },
        saveMetrics: (dataMetrics) => {
            dispatch(CyReportSettingsActions.saveCyReportMetrics(dataMetrics));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cyReportSettings: state.cyReportSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(CyReportSettingsComponent))
