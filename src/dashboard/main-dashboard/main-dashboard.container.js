import { connect } from 'react-redux'

import MainDashBoard from "./main-dashboard.component";
import localize from "../../components/localization/localization.hoc";
import { PageEnum } from "../../shared/enums";
import { cleanFunction } from './main-dashboard.reducer';

const mapDispatchToProps = {
    cleanFunction
}

const mapStateToProps = (state) => {
    return {
        maindashboard: state.maindashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(MainDashBoard, PageEnum.MY_DASHBOARD))
