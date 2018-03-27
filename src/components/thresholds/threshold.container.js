import { connect } from 'react-redux'
import ThresholdComponent from './threshold.component';
import localize from '../localization/localization.hoc';
import * as ThresholdActions from './threshold.actions';

const mapDispatchToProps = (dispatch) => {
    return {

        addLevels: (item) => {
            dispatch(ThresholdActions.addLevels(item))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        threshold: state.threshold,
        common: state.common
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ThresholdComponent))
