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
        }
    }
}

const mapStateToProps = (state) => {
    return {
        widgetsBar: state.widgetsBar
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(WidgetsBar))
