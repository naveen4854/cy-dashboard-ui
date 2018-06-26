import { connect } from 'react-redux';
import * as Reducer from '../reducers/my-dashboard.reducer';

import MySliderList from '../components/my-slider.component'
import localize from '../../../components/localization/localization.hoc';
import { PageEnum } from '../../../shared/enums';

const mapDispatchToProps = (dispatch) => {
    return {
      
        GetSlidersList: () => {
            dispatch(Reducer.GetSlidersList());
        },
        DeleteSlider: (dashboardId) => {
            dispatch(Reducer.DeleteSlider(dashboardId))
        },
        SetMySlidersAndGetSlidersList: (getMySliders) => {
            dispatch(Reducer.SetMySlider(getMySliders))
            dispatch(Reducer.SetSliderPageNumber(1))
            dispatch(Reducer.GetSlidersList())
        },
        SetGlobalsAndGetSlidersList: (getGlobals) => {
            dispatch(Reducer.SetSliderGlobals(getGlobals))
            dispatch(Reducer.SetSliderPageNumber(1))
            dispatch(Reducer.GetSlidersList())
        },
        SetPageNumberAndGetSlidersList: (pageNum) => {
            dispatch(Reducer.SetSliderPageNumber(pageNum))
            dispatch(Reducer.GetSlidersList())
        },
        SetPageSizeAndGetDashboardsList: (pageSize) => {
            dispatch(Reducer.SetSliderPageSize(pageSize))
            dispatch(Reducer.GetSlidersList())
        },
        GetSortedSliderList: (sortColumn, sortOrder) => {
            dispatch(Reducer.SetSliderSortColumnAndOrder(sortColumn, sortOrder))
            dispatch(Reducer.GetSlidersList())
        },
        clearNotifications: () => {
            dispatch(Reducer.ClearNotificationsAction())
        }
      
    }
}

const mapStateToProps = (state) => {
    return {
        mySlider: state.mydashboard,
        common: state.common,
        user:state.user
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(MySliderList, PageEnum.MY_DASHBOARD))
