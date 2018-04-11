import { connect } from 'react-redux'
import ComboCustomMetricsSettingsComponent from './combo-custom-metrics-settings.component';
import localize from '../localization/localization.hoc';
import * as Actions from './combo-custom-metrics-settings.actions'

const mapDispatchToProps = (dispatch) => {
    return {
        updateComboDrillDownOptions: (options) => {
            dispatch(Actions.updateComboDrillDownOptions(options));
        },
        updateCustomQuery: (query) => {
            dispatch(Actions.updateCustomQuery(query));
        },
        loadColumns: () => {
            dispatch(Actions.loadColumns());
        },
        toggleExpandQuery: () => {
            dispatch(Actions.toggleExpandQuery());
        },
        updateCustomComboColumn: (id, key, value) => {
            dispatch(Actions.updateCustomComboColumn(id, key, value));
        },
        addCustomColumn: () => {
            dispatch(Actions.addCustomColumn());
        },
        toggleAddColumn: () => {
            dispatch(Actions.toggleAddColumn());
        },
        saveComboCustomMetrics: () => {
            dispatch(Actions.saveComboCustomMetrics());
        },
        updateCustomComboColumns: (columns)=>{
            dispatch(Actions.updateCustomComboColumns(columns));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        comboCustomSettings: state.comboCustomSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ComboCustomMetricsSettingsComponent))
