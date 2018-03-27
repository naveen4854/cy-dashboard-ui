import { connect } from 'react-redux'
import DashboardLayoutComponent from './dashboard-layout.component';
import { PageEnum } from '../../shared/enums';
import localize from "../localization/localization.hoc";
import * as DashboardReducer from '../../dashboard/dashboard.reducer';


const mapDispatchToProps = (dispatch) => {
    return {
        ToggleSettingsMenu: (widget) => {
            dispatch(DashboardReducer.ToggleSettingsMenu(widget))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(DashboardLayoutComponent, PageEnum.NEW_DASHBOARD))
