import { connect } from 'react-redux'
import WidgetsBar from './widgets-bar.component';
import localize from '../localization/localization.hoc';
import * as WidgetsBarActions from './widgets-bar.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        UpdateProperty: (key, value) => {
            dispatch(WidgetsBarActions.updateProperty(key, value))
        },
        SaveDashboard: () => {
            dispatch(WidgetsBarActions.SaveDashboard())
        },
        CollapseAllSettingsMenus: () => {
            dispatch(WidgetsBarActions.CollapseAllSettingsMenus());
        },
        HandleModalPopup: (showModalPopup) => {
            dispatch(WidgetsBarActions.HandleModalPopup(showModalPopup))
        },
        HandleSaveAsPopUp: (showSaveAsPopup) => {
            dispatch(WidgetsBarActions.HandleSaveAsPopUpAction(showSaveAsPopup))
        },
        SaveAsPopUpAction: (showSaveAsPopup) => {
            dispatch(WidgetsBarActions.HandleSaveAsPopUpAction(showSaveAsPopup))
        },
        SaveAsDashboard: () => {
            dispatch(WidgetsBarActions.SaveDashboard());
        },
        UpdateDashboard: () => {
            dispatch(WidgetsBarActions.UpdateDashboard())
        },
        deleteDashboardInHeader: (dashboardId) => {
            dispatch(WidgetsBarActions.deleteDashboardInHeader(dashboardId))
        },
        resetDashboard: () => {
            dispatch(WidgetsBarActions.resetDashboard())
        },
        updateDashboardMode: () => {
            dispatch(WidgetsBarActions.updateDashboardMode())
<<<<<<< HEAD

        },
        toggleWidgetBar: (isExpanded) => {
            dispatch(WidgetsBarActions.toggleWidgetBar(isExpanded))
=======
>>>>>>> b5aaf85d1be3355f6020921232632f798a42458a
        }
    }
}

const mapStateToProps = (state) => {

    return {
        widgetsBar: state.widgetsBar,
        common: state.common,
        name: state.dashboard.name,
        isDefault: state.dashboard.isDefault,
        isGlobal: state.dashboard.isGlobal,
        mode: state.dashboard.mode,
        dashboardId: state.dashboard.Id,
        dashboardName: state.dashboard.name
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(WidgetsBar))
