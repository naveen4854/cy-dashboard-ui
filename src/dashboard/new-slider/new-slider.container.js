import { connect } from 'react-redux'

import NewSlider from "./new-slider.component";
import localize from "../../components/localization/localization.hoc";
import { PageEnum } from "../../shared/enums";
import * as DashboardReducer from '../dashboard.reducer';

const mapDispatchToProps = (dispatch) => {
    return {
        AddWidget: ()=>{}
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(NewSlider, PageEnum.SLIDER))
