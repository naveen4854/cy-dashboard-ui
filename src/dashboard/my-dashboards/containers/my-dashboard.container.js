import { connect } from 'react-redux';
import * as Reducer from '../reducers/my-dashboard.reducer';

import MyDashboard from '../components/my-dashboard.component'
import localize from '../../../components/localization/localization.hoc';
import { PageEnum } from '../../../shared/enums';

const mapDispatchToProps = (dispatch) => {
    return {
        GetCategories: () => {
            dispatch(Reducer.GetCategoriesAction());
        },
        GetDashboardsList: () => {
            dispatch(Reducer.GetDashboardsList());
        },
        DeleteDashboard: (dashboardId) => {
            dispatch(Reducer.DeleteDashboard(dashboardId))
        },
        ViewDashboard: (dashboardId) => {
            dispatch(Reducer.ViewDashboard(dashboardId))
        },
        GetUserDashboardById: (dashboardId) => {
            dispatch(Reducer.getUserDashboardByIdAction(dashboardId))
        },
        SetMyDashboardsAndGetDashboardsList: (getMyDashboards) => {
            dispatch(Reducer.SetMyDashboards(getMyDashboards))
            dispatch(Reducer.SetPageNumber(1))
            dispatch(Reducer.GetDashboardsList())
        },
        SetGlobalsAndGetDashboardsList: (getGlobals) => {
            dispatch(Reducer.SetGlobals(getGlobals))
            dispatch(Reducer.SetPageNumber(1))
            dispatch(Reducer.GetDashboardsList())
        },
        SetPageNumberAndGetDashboardsList: (pageNum) => {
            dispatch(Reducer.SetPageNumber(pageNum))
            dispatch(Reducer.GetDashboardsList())
        },
        SetPageSizeAndGetDashboardsList: (pageSize) => {
            dispatch(Reducer.SetPageSize(pageSize))
            dispatch(Reducer.GetDashboardsList())
        },
        GetSortedDashboardList: (sortColumn, sortOrder) => {
            dispatch(Reducer.SetSortColumnAndOrder(sortColumn, sortOrder))
            dispatch(Reducer.GetDashboardsList())
        },
        UserLogout: () => {
            dispatch(Reducer.UserLogoutAction());
        },
        clearNotifications: () => {
            dispatch(Reducer.ClearNotificationsAction())
        },
        test: () => {
            dispatch(Reducer.test())
        },
        testU: () => {
            dispatch(Reducer.testU())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        myDashboard: state.mydashboard,
        common: state.common
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(MyDashboard, PageEnum.MY_DASHBOARD))
