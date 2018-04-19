import { connect } from 'react-redux'

import ViewDashboardComponent from "./view-dashboard.component";
import localize from "../../components/localization/localization.hoc";
import { PageEnum } from "../../shared/enums";
import * as DashboardReducer from '../dashboard.reducer';
import { clearRefreshInterval } from '../dashboard.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        AddWidget: (widgetType) => {
            dispatch(DashboardReducer.AddWidget(widgetType));
        },
        clearRefreshInterval: () => {
            dispatch(clearRefreshInterval());
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ViewDashboardComponent, PageEnum.NEW_DASHBOARD))
