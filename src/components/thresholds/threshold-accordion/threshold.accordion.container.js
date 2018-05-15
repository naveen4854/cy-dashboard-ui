import { connect } from 'react-redux'
import ThresholdAccordionComponent from './threshold.accordion.component';
import localize from '../../localization/localization.hoc';
import { PageEnum } from '../../../shared/enums';


const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        threshold: state.threshold
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ThresholdAccordionComponent, PageEnum.DATA_METRICS))
