import { connect } from 'react-redux'
import DashboardLayoutComponent from './dashboard-layout.component';
import { PageEnum } from '../../shared/enums';
import localize from "../localization/localization.hoc";
import * as DashboardActions from '../../dashboard/dashboard.actions';


const mapDispatchToProps = (dispatch) => {
    return {
        // toggleSettingsMenu: (widget) => {
        //     dispatch(DashboardActions.toggleSettingsMenu(widget))
        // },
        
    }
}

const mapStateToProps = (state) => {
    return {
        widgets: state.dashboard.widgets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(DashboardLayoutComponent, PageEnum.NEW_DASHBOARD))
