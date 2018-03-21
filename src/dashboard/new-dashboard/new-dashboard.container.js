import { connect } from 'react-redux'

import NewDashboard from "./new-dashboard.component";
import localize from "../../components/localization/localization.hoc";
import { PageEnums } from "../../shared/enums/page-enum";
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

export default connect(mapStateToProps, mapDispatchToProps)(localize(NewDashboard, PageEnums.NEW_DASHBOARD))
