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
        }
    }
}

const mapStateToProps = (state) => {
    return {
        threshold: state.threshold,
        common: state.common,
        displayFormat: state.configurations.widget.appliedSettings.dataMetrics.displayFormat,
        isComboWidget: state.configurations.widget.isComboWidget,
        statisticCategory: state.configurations.widget.appliedSettings.dataMetrics.statisticCategory
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ThresholdComponent))
