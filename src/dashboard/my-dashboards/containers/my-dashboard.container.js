import { connect } from 'react-redux';
import * as Reducer from '../reducers/my-dashboard.reducer';

import MyDashboard from '../components/my-dashboard.component'
import localize from '../../../components/localization/localization.hoc';
import { PageEnums } from '../../../shared/enums/page-enum';

const mapDispatchToProps = (dispatch) => {
    return {
        GetCategories: () => {
            dispatch(Reducer.GetCategoriesAction());
        },
        GetDashboardsList: () => {
            dispatch(Reducer.GetDashboardsList());
        },
        DeleteConfirmation: (config) => {
            dispatch(Reducer.DeleteConfirmation(config))
        },
        DeleteDashboard: (dashboardId) => {
            dispatch(Reducer.DeleteDashboard(dashboardId))
        },
        ViewDashboard: () => {
            dispatch(Reducer.ViewDashboardAction())
        },
        GetUserDashboardById: (dashboardId) => {
            dispatch(Reducer.getUserDashboardByIdAction(dashboardId))
        },
        SetMyDashboardsAndGetDashboardsList: (_getMyDashboards) => {
            dispatch(Reducer.SetMyDashboardsAndGetDashboardsList(_getMyDashboards))
        },
        SetGlobalsAndGetDashboardsList: (_getGlobals) => {
            dispatch(Reducer.SetGlobalsAndGetDashboardsList(_getGlobals))
        },
        SetPageNumberAndGetDashboardsList: (_pageNum) => {
            dispatch(Reducer.SetPageNumberAndGetDashboardsList(_pageNum))
        },
        SetPageSizeAndGetDashboardsList: (_pageSize) => {
            dispatch(Reducer.SetPageSizeAndGetDashboardsList(_pageSize))
        },
        SetSortAndGetDashboardList: (_sortColumn, _sortOrder) => {
            dispatch(Reducer.SetSortAndGetDashboardList(_sortColumn, _sortOrder))
        },
        UserLogout: () => {
            dispatch(Reducer.UserLogoutAction());
        },
        ClearNotifications: () => {
            dispatch(Reducer.ClearNotificationsAction())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        myDashboard: state.mydashboard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(MyDashboard, PageEnums.MY_DASHBOARD))
