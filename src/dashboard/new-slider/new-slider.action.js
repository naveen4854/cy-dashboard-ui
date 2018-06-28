import { UPDATE_DASHBOARDS_LIST } from "./new-slider.constants";


export function getDashboards() {
    return (dispatch, getState) => {
        dispatch(getState().mydashboard.GetDashboardsList(true));
    }
}
export function fillDashboard(dashboards) {
    return (dispatch, getState) => {
        let updateList = _.map(dashboards, (dashboard) => {
            return {
                id: dashboard.DashboardId,
                value: dashboard.DashboardId,
                label: dashboard.DashboardName
            }
        })
        dispatch({
            type: UPDATE_DASHBOARDS_LIST,
            updateList
        });
    }

}