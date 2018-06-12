import { connect } from 'react-redux'

import EditDashboard from "./edit-dashboard.component";
import localize from "../../components/localization/localization.hoc";
import { PageEnum } from "../../shared/enums";
import * as DashboardReducer from '../dashboard.reducer';

const mapDispatchToProps = (dispatch) => {
    return {
        AddWidget: (widgetType) => {
            dispatch(DashboardReducer.AddWidget(widgetType));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(EditDashboard, PageEnum.NEW_DASHBOARD))
