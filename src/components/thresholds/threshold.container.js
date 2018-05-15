import { connect } from 'react-redux'
import ThresholdComponent from './threshold.component';
import localize from '../localization/localization.hoc';
import * as ThresholdActions from './threshold.actions';
import { PageEnum } from '../../shared/enums';

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
        },
        setStatisticItem: (item) => {
            dispatch(ThresholdActions.setStatisticItem(item));
        },
        setStatisticFunction: (func) => {
            dispatch(ThresholdActions.setStatisticFunction(func));
        },
        setDisplayFormat: (displayFormat) => {
            dispatch(ThresholdActions.setDisplayFormat(displayFormat));
        }

    }
}

const mapStateToProps = (state) => {
    return {
        threshold: state.threshold,
        common: state.common,
        displayFormat: state.configurations.widget.appliedSettings.dataMetrics.displayFormat,
        isComboWidget: state.configurations.widget.isComboWidget,
        statisticCategory: state.configurations.widget.appliedSettings.dataMetrics.statisticCategory,
        comboRealTimeSettings: state.comboRealTimeSettings
        // basedColumn: state.configurations.widget.appliedSettings.basedColumn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ThresholdComponent, PageEnum.DATA_METRICS))
