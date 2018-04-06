import { connect } from 'react-redux'
import ComboRealTimeMetricsSettingsComponent from './combo-realtime-metrics-settings.component';
import localize from '../localization/localization.hoc';
import * as Actions from './combo-realtime-metrics-settings.actions'

const mapDispatchToProps = (dispatch) => {
    return {
        updateComboDrillDownOptions: (options) =>{
            dispatch(Actions.updateComboDrillDownOptions(options));
        },
        setStatisticGroupAndDrilldown: (selectedGroup) =>{
            if (selectedGroup && selectedGroup.id) {
                dispatch(Actions.setSelectedComboGroupValue(selectedGroup));
                dispatch(Actions.setStatisticsItems(selectedGroup));
                dispatch(Actions.getComboDrillDownMetaData(selectedGroup));
                dispatch(Actions.addDefaultComboStatisticItems(selectedGroup));
              }
        },
    }
}

const mapStateToProps = (state) => {
    return {
        comboRealTimeSettings: state.comboRealTimeSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize( ComboRealTimeMetricsSettingsComponent))
