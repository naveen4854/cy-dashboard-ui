import { connect } from 'react-redux'
import ThresholdComponent from './threshold.component';
import localize from '../localization/localization.hoc';


const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        threshold: state.threshold,
        common: state.common
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ThresholdComponent))
