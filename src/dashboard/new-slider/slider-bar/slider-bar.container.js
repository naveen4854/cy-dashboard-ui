import { connect } from 'react-redux'

import localize from '../localization/localization.hoc';

import { PageEnum } from '../../shared/enums';
import SliderBar from './slider-bar.component';

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

const mapStateToProps = (state) => {

    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(SliderBar, PageEnum.SLIDER_BAR))
