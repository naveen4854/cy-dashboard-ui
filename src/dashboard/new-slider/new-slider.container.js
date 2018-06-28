import { connect } from 'react-redux'

import NewSlider from "./new-slider.component";
import localize from "../../components/localization/localization.hoc";
import { PageEnum } from "../../shared/enums";
import * as NewSliderAction from './new-slider.action';

const mapDispatchToProps = (dispatch) => {
    return {
        getDashboards:()=>{
            dispatch(NewSliderAction.getDashboards());
        }
    }
}

const mapStateToProps = (state) => {
    return {
        
        newslider:state.newslider,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(NewSlider, PageEnum.SLIDER))
