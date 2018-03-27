import { connect } from 'react-redux'
import ThresholdContentComponent from './threshold.content.component';
import * as ThresholdAction from '../threshold.actions';
import localize from '../../localization/localization.hoc';
import ThresholdReducer from '../threshold.reducer';


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
        }
    }
}

const mapStateToProps = (state) => {
    return {
        threshold: state.threshold,
        common: state.common
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ThresholdContentComponent))
