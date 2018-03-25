import { connect } from 'react-redux'
import ThresholdContentComponent from './threshold.content.component';
import localize from '../localization/localization.hoc';
import ThresholdReducer from '../threshold.reducer';


const mapDispatchToProps = (dispatch) => {
    return {
        updateLevel: (id, key, value) => {
            dispatch(ThresholdReducer.updateLevel(id, key, value))
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
