import * as  widgetBarConstants from "./widgets-bar.constants";
import _ from 'lodash';


export function updatePropertyAction(key, value) {
    return (dispatch, getState) => {
        dispatch({
            type: widgetBarConstants.UPDATE_DASHBOARD_PROPERTY,
            key,
            value
        })
    }
}

export function saveDashboardAction() {
    return (dispatch, getState) => {
       // let dashboardData = MapDashboard(getState().widgetsBar, getState().dashboard);
        // dispatch({
        //     type: widgetBarConstants.UPDATE_DASHBOARD_PROPERTY,
        // })
    }
}
  