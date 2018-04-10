import { connect } from 'react-redux'
import ComboRealTimeMetricsSettingsComponent from './combo-realtime-metrics-settings.component';
import localize from '../localization/localization.hoc';
import * as Actions from './combo-realtime-metrics-settings.actions'

const mapDispatchToProps = (dispatch) => {
    return {
        updateComboDrillDownOptions: (options) => {
            dispatch(Actions.updateComboDrillDownOptions(options));
        },
        setStatisticGroupAndDrilldown: (selectedGroup) => {
            if (selectedGroup && selectedGroup.id) {
                dispatch(Actions.setSelectedComboGroupValue(selectedGroup));
                dispatch(Actions.setStatisticsItems(selectedGroup));
                dispatch(Actions.getComboDrillDownMetaData(selectedGroup));
                dispatch(Actions.addDefaultComboStatisticItems(selectedGroup));
                dispatch(Actions.toggleDrillDown(true));
            }
        },
        setItemAndGetFunctions: (selectedItem) => {
            dispatch(Actions.setSatisticItem(selectedItem));
            dispatch(Actions.setStatisticFunctions());
        },
        setFunctionAndGetDisplayFormat: (selectedFunction) => {
            dispatch(Actions.setSelectedFunction(selectedFunction));
            dispatch(Actions.getDisplayFormatOptions());
        },
        getApplicableWidget: (selectedDisplayFormat) => {
            if (selectedDisplayFormat) {
                dispatch(Actions.setSelectedDisplayFormat(selectedDisplayFormat));
                dispatch(Actions.getApplicableWidget(selectedDisplayFormat));
            }
        },
        setApplicableWidget: (selectedWidget) => {
            if (selectedWidget) {
                dispatch(Actions.setApplicableWidget(selectedWidget));
            }
        },
        updateDisplayName: (displayName) => {
            dispatch(Actions.updateDisplayName(displayName));
        },
        toggleAddEdit: (toggleAddEdit) => {
            dispatch(Actions.toggleAddEdit(toggleAddEdit));
        },
        addComboStatisticItem: (toggleAddEdit) => {
            dispatch(Actions.addComboStatisticItem(toggleAddEdit));
        },
        applyComboRealTimeMetrics: () => {
            dispatch(Actions.applyComboRealTimeMetrics());
        },
        removeComboStatisticItems: (selectedStatisticItem) => {
            if (selectedStatisticItem) {
                dispatch(Actions.removeComboStatisticItemAction(selectedStatisticItem));
            }
        },
        editComboSelectedColumn: (selectedStatisticItem) => {
            if (selectedStatisticItem) {
                dispatch(Actions.editComboSelectedColumn(selectedStatisticItem));
            }
        },
        updatedComboStatisticColumn: () => {
            dispatch(Actions.updatedComboStatisticColumn());
        },
        toggleDrillDown: (toggleDrillDown) => {
            dispatch(Actions.toggleDrillDown(toggleDrillDown));
        },
        updateComboSelectedStatisticColumns: (comboSelectedStatisticColumns) => {
            dispatch(Actions.updateComboSelectedStatisticColumns(comboSelectedStatisticColumns));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        comboRealTimeSettings: state.comboRealTimeSettings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ComboRealTimeMetricsSettingsComponent))
