import { connect } from 'react-redux'
import CustomMetricsSettingsComponent from './custom-metrics-settings.component';
import localize from '../localization/localization.hoc';
import { PageEnum } from '../../shared/enums';
import * as CustomMetricsSettingsActions from './custom-metrics-settings.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedStoreProc: (selectedStoreProc) => {
            dispatch(CustomMetricsSettingsActions.setSelectedStoreProc(selectedStoreProc))
        },
        setCustomQuery: (query) => {
            dispatch(CustomMetricsSettingsActions.setCustomQuery(query))
        },
        updateParamValue: (value, index) => {
            dispatch(CustomMetricsSettingsActions.updateParamValue(value, index))
        },
        saveCustomMetrics: (settings) => {
            dispatch(CustomMetricsSettingsActions.saveCustomMetrics(settings))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        customSettings: state.customSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(CustomMetricsSettingsComponent, PageEnum.DATA_METRICS))
