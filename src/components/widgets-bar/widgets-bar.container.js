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
        DeleteDashboardInHeader: (dashboardId) => {
            dispatch(WidgetsBarActions.DeleteDashboardInHeader(dashboardId))
        },
        DeleteConfirmation: (config) => {
            dispatch(WidgetsBarActions.DeleteConfirmation(config))
        },
        ResetDashboard: () => {
            dispatch(WidgetsBarActions.ResetDashboard())
        }
    }
}

const mapStateToProps = (state) => {
    debugger;
    return {
        widgetsBar: state.widgetsBar,
        common: state.common,
        name: state.dashboard.name,
        isDefault: state.dashboard.isDefault,
        isGlobal: state.dashboard.isGlobal,
        mode: state.dashboard.mode,
        dashboardId:state.dashboard.Id,
        dashboardName:state.dashboard.name
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(WidgetsBar))
