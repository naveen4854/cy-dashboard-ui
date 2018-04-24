import { connect } from 'react-redux'
import ThresholdComponent from './threshold.component';
import localize from '../localization/localization.hoc';
import * as ThresholdActions from './threshold.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        addLevels: (item) => {
            dispatch(ThresholdActions.addLevels(item))
        },
        addSelectedLevels: () => {
            dispatch(ThresholdActions.addSelectedLevels());
        },
        updateBasedColumn: (basedColumn) => {
            dispatch(ThresholdActions.updateBasedColumn(basedColumn));
        },
        updateLevels: (levels) => {
            dispatch(ThresholdActions.updateLevels(levels));
        },
        setBasedOnColumn: (basedColumn) => {
            dispatch(ThresholdActions.setBasedOnColumn(levels));
        }
    }
}

const mapStateToProps = (state) => {
    debugger;
    let threshold = state.threshold;
    threshold.statisticItems=state.comboRealTimeSettings.statisticItems;
    threshold.functionOptions=state.comboRealTimeSettings.functionOptions;
    threshold.displayFormatOptions=state.comboRealTimeSettings.displayFormatOptions;
    return {
        threshold: threshold,
        common: state.common,
        displayFormat: state.configurations.widget.appliedSettings.dataMetrics.displayFormat,
        isComboWidget: state.configurations.widget.isComboWidget,
        statisticCategory: state.configurations.widget.appliedSettings.dataMetrics.statisticCategory,
        comboRealTimeSettings: state.comboRealTimeSettings
        // basedColumn: state.configurations.widget.appliedSettings.basedColumn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ThresholdComponent))
