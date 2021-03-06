import { connect } from 'react-redux'
import ThresholdContentComponent from './threshold.content.component';
import * as ThresholdAction from '../threshold.actions';
import localize from '../../localization/localization.hoc';
import ThresholdReducer from '../threshold.reducer';
import { PageEnum } from '../../../shared/enums';


const mapDispatchToProps = (dispatch) => {
    return {
        updateLevel: (id, key, value) => {
            dispatch(ThresholdAction.updateLevel(id, key, value))
        },
        handleClick: (id) => {
            dispatch(ThresholdAction.handleClick(id));
        },
        removeLevel: (id) => {
            dispatch(ThresholdAction.removeLevel(id));
        },
        TestThreshold: (level, widgetId) => {
            dispatch(ThresholdAction.TestThreshold(level, widgetId));
        },
        setIsCopiedForLevel: (id) => {
            dispatch(ThresholdAction.setIsCopiedForLevel(id));
        },
        pasteThresholdValues: (id) => {
            dispatch(ThresholdAction.pasteThresholdValues(id));
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
        widgetId: state.configurations.widgetId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ThresholdContentComponent, PageEnum.DATA_METRICS))
