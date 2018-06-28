
import _ from 'lodash';


import { ResponseStatusEnum } from '../../../shared/enums';
import * as dashboardService from '../../dashboard-service';

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const GET_DASHBOARDS_LIST = "GET_DASHBOARDS_BY_CATEGORY";
export const CATEGORY_CHANGE = "CATEGORY_CHANGE";
export const DELETE_DASHBOARD = "DELETE_DASHBOARD";
export const VIEW_DASHBOARD = "VIEW_DASHBOARD";
export const UPDATE_MYDASHBOARD = "UPDATE_MYDASHBOARD";
export const UPDATE_GLOBALS = "UPDATE_GLOBALS";
export const UPDATE_PAGENUMBER = "UPDATE_PAGENUMBER";
export const UPDATE_PAGESIZE = "UPDATE_PAGESIZE";
export const UPDATE_SORT = "UPDATE_SORT";
export const GET_SLIDERS_LIST = "GET_DASHBOARDS_LIST";
export const UPDATE_SLIDER_PAGENUMBER = 'UPDATE_SLIDER_PAGENUMBER';
export const UPDATE_MYSLIDER = 'UPDATE_MYSLIDER';
export const UPDATE_SLIDER_GLOBALS = 'UPDATE_SLIDER_GLOBALS';
export const UPDATE_SLIDER_PAGESIZE = 'UPDATE_SLIDER_PAGESIZE';
export const UPDATE_SLIDER_SORT = 'UPDATE_SLIDER_SORT';

export function GetDashboardsList(isFromSlider) {
  debugger;
  return (dispatch, getState) => {
    dispatch(getState().spinnerStore.BeginTask());
    let state = getState();
    let
      categoryId = state.mydashboard.category,
      pageNumber = isFromSlider ? -1 : state.mydashboard.pageNumber,
      pageSize = isFromSlider ? -1 : state.mydashboard.pageSize,
      globals = isFromSlider ? true : state.mydashboard.globals,
      myDashboards = isFromSlider ? true : state.mydashboard.myDashboards,
      sortColumn = state.mydashboard.sortColumn,
      sortingOrder = state.mydashboard.sortOrder == 0 ? 'asc' : 'desc';

    dashboardService.getDashboardsByCategory(categoryId, myDashboards, globals, pageNumber, pageSize, sortColumn, sortingOrder).then((response) => {
      if (response.status === 200) {
        let _userDashboards = _.map(response.data, (d) => {
          return {
            DashboardName: d.udn,
            ModifiedDate: d.udim,
            DashboardId: d.udid,
            IsGlobal: d.udig,
            IsOwner: d.udio,
            IsDeleted: d.udid,
            CategoryId: d.udcid
          };
        });
        let _totalDashboards = response.data[0] ? response.data[0].udtr : 0;
        let _totalPages = Math.ceil(_totalDashboards / pageSize);
        dispatch(getState().spinnerStore.EndTask());
        if (isFromSlider) {
          dispatch(getState().newslider.fillDashboard(_userDashboards));
        }
        dispatch({
          type: GET_DASHBOARDS_LIST,
          userDashboards: _userDashboards,
          totalPages: _totalPages,
          totalDashboards: _totalDashboards
        });
      }

    }).catch((err) => {
      dispatch(getState().spinnerStore.EndTask());
    });
  }
}


export function SetMySlider(getMySliders) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_MYSLIDER,
      mySliders: getMySliders
    });
  }
}
export function SetSliderGlobals(getGlobals) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SLIDER_GLOBALS,
      sliderGlobals: getGlobals
    });
  }
}
export function SetSliderPageNumber(pageNumber) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SLIDER_PAGENUMBER,
      pageNumber
    });
  }

}
export function SetSliderPageSize(pageSize) {
  return (dispatch, getState) => {
    let mySlider = getState().mydashboard,
      reqPagesize = pageSize,
      currentPage = mySlider.sliderPageNumber,
      totalDashboards = mySlider.totalSliders,
      setCurrentPage = reqPagesize * currentPage > totalDashboards ? Math.ceil(totalDashboards / reqPagesize) : currentPage;
    dispatch({
      type: UPDATE_SLIDER_PAGESIZE,
      pageSize
    });
    dispatch(SetSliderPageNumber(setCurrentPage));
  }
}
export function SetSliderSortColumnAndOrder(sortColumn, sortOrder) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SLIDER_SORT,
      sortColumn,
      sortOrder
    });
  }
}
export function DeleteSlider(sliderId) {
  return (dispatch, getState) => {
    let mydashboard = getState().mydashboard,
      pageStart = (mydashboard.sliderPageNumber - 1) * mydashboard.sliderPageSize + 1,
      pageEnd = mydashboard.totalSliders,
      pageNum = mydashboard.sliderPageNumber;
    dispatch(getState().spinnerStore.BeginTask());
    dashboardService.deleteSlider(sliderId).then((response) => {
      dispatch(getState().spinnerStore.EndTask());
      if (response.data.Status === true) {
        dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Success));

        if (pageStart == pageEnd) {
          dispatch({
            type: UPDATE_PAGENUMBER,
            pageNumber: pageNum == 1 ? pageNum : pageNum - 1
          })
        }
        dispatch(GetSlidersList());
      }
      else {
        dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Error))
      }
    });
  }
}
export function GetSlidersList() {
  return (dispatch, getState) => {
    dispatch(getState().spinnerStore.BeginTask());
    let state = getState();
    let

      pageNumber = state.mydashboard.sliderPageNumber,
      pageSize = state.mydashboard.sliderPageSize,
      globals = state.mydashboard.sliderGlobals,
      mySliders = state.mydashboard.mySliders,
      sortColumn = state.mydashboard.sliderSortColumn,
      sortingOrder = state.mydashboard.sliderSortOrder == 0 ? 'asc' : 'desc';
    dashboardService.getUserSlidersList(mySliders, globals, pageNumber, pageSize, sortColumn, sortingOrder).then((response) => {
      if (response.status === 200) {
        let _userSliders = _.map(response.data, (d) => {
          return {
            sliderName: d.sn,
            modifiedDate: d.smt,
            sliderId: d.sid,
            isGlobal: d.sig,
            isOwner: d.sio,
            isDeleted: d.sidd,

          };
        });
        let _totalSliders = response.data[0] ? response.data[0].str : 0;
        let _totalPages = Math.ceil(_totalSliders / pageSize);
        dispatch(getState().spinnerStore.EndTask());
        dispatch({
          type: GET_SLIDERS_LIST,
          userSliders: _userSliders,
          totalPages: _totalPages,
          totalSliders: _totalSliders
        });
      }

    }).catch((err) => {
      dispatch(getState().spinnerStore.EndTask());
    });
  }
}
export function SetGlobals(getGlobals) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_GLOBALS,
      globals: getGlobals
    });
  }
}

export function SetMyDashboards(getMyDashboards) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_MYDASHBOARD,
      myDashboards: getMyDashboards
    });
  }
}

export function SetPageNumber(pageNumber) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PAGENUMBER,
      pageNumber
    });
  }
}

export function SetPageSize(pageSize) {
  return (dispatch, getState) => {
    let mydashboard = getState().mydashboard,
      reqPagesize = pageSize,
      currentPage = mydashboard.pageNumber,
      totalDashboards = mydashboard.totalDashboards,
      setCurrentPage = reqPagesize * currentPage > totalDashboards ? Math.ceil(totalDashboards / reqPagesize) : currentPage;
    dispatch({
      type: UPDATE_PAGESIZE,
      pageSize
    });
    dispatch(SetPageNumber(setCurrentPage));
  }
}

export function SetSortColumnAndOrder(sortColumn, sortOrder) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SORT,
      sortColumn,
      sortOrder
    });
  }
}

export function test() {
  return (dispatch, getState) => {
    dispatch({
      type: 'same'
    })
  }
}

export function testU() {
  return (dispatch, getState) => {
    dispatch({
      type: 'newversion'
    })
  }
}

// export function ViewDashboard() {
//   return (dispatch, getState) => {
//    // Dispatch mode of dashboard from here.
//    // Dispatch an API to get dashboard data from an API and set it in dashboard store which contains only widgets
//   }
// }

export function DeleteDashboard(dashboardId) {
  return (dispatch, getState) => {
    let mydashboard = getState().mydashboard,
      pageStart = (mydashboard.pageNumber - 1) * mydashboard.pageSize + 1,
      pageEnd = mydashboard.totalDashboards,
      pageNum = mydashboard.pageNumber;
    dispatch(getState().spinnerStore.BeginTask());
    dashboardService.deleteDashboard(dashboardId).then((response) => {
      dispatch(getState().spinnerStore.EndTask());
      if (response.data.Status === true) {
        dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Success));

        if (pageStart == pageEnd) {
          dispatch({
            type: UPDATE_PAGENUMBER,
            pageNumber: pageNum == 1 ? pageNum : pageNum - 1
          })
        }
        dispatch(GetDashboardsList());
      }
      else {
        dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Error))
      }
    });
  }
}
export function userLogout() {
  return (dispatch, getState) => {
    dispatch(getState().user.logout());
  }
}

export const ACTION_HANDLERS = {

  [UPDATE_CATEGORIES]: (state, action) => {
    return Object.assign({}, state, {
      categories: action.categories
    })
  },
  [UPDATE_SLIDER_PAGESIZE]: (state, action) => {
    return Object.assign({}, state, {
      sliderPageSize: action.pageSize
    })
  },
  [UPDATE_SLIDER_GLOBALS]: (state, action) => {
    return Object.assign({}, state, {
      sliderGlobals: action.sliderGlobals
    })
  },
  [UPDATE_MYSLIDER]: (state, action) => {
    return Object.assign({}, state, {
      mySliders: action.mySliders
    })
  },
  [UPDATE_SLIDER_PAGENUMBER]: (state, action) => {

    return Object.assign({}, state, {
      sliderPageNumber: action.pageNumber
    })
  },
  [GET_DASHBOARDS_LIST]: (state, action) => {
    return Object.assign({}, state, {
      userDashboards: action.userDashboards,
      totalPages: action.totalPages,
      totalDashboards: action.totalDashboards
    });
  },
  [DELETE_DASHBOARD]: (state, action) => {
    //state.widgets = _.filter(state.widgets, (widget) => widget.id !== action.widgetId);
    state.userDashboards = _.filter(state.userDashboards.DashboardId, (dashboard) => dashboard.id !== action.userDashboards.DashboardId);
    return Object.assign({}, state);
  },
  [VIEW_DASHBOARD]: (state, action) => {
    return Object.assign({}, state, {
      dashboard: action.dashboardData
    })
  },
  [UPDATE_MYDASHBOARD]: (state, action) => {
    return Object.assign({}, state, {
      myDashboards: action.myDashboards
    })
  },
  [UPDATE_GLOBALS]: (state, action) => {
    return Object.assign({}, state, {
      globals: action.globals
    })
  },
  [UPDATE_PAGENUMBER]: (state, action) => {
    return Object.assign({}, state, {
      pageNumber: action.pageNumber
    });
  },
  [UPDATE_PAGESIZE]: (state, action) => {
    return Object.assign({}, state, {
      pageSize: action.pageSize
    });
  },
  [GET_SLIDERS_LIST]: (state, action) => {
    return Object.assign({}, state, {
      userSliders: action.userSliders,
      sliderTotalPages: action.totalPages,
      totalSliders: action.totalSliders
    })
  },
  [UPDATE_SLIDER_SORT]: (state, action) => {
    return Object.assign({}, state, {
      sliderSortColumn: action.sortColumn,
      sliderSortOrder: action.sortOrder
    });
  },
  [UPDATE_SORT]: (state, action) => {
    return Object.assign({}, state, {
      sortColumn: action.sortColumn,
      sortOrder: action.sortOrder
    });
  },
  'same': (state, action) => {
    return state;
  },
  'newversion': (state, action) => {
    return _.cloneDeep(state);
  }
}

export const initialState = {
  categories: [],
  category: -1,
  userDashboards: [],
  totalPages: 0,
  myDashboards: true,
  globals: false,
  pageNumber: 1,
  pageSize: 10,
  userSliders: [],
  sliderTotalPages: 0,
  mySliders: true,
  sliderGlobals: false,
  sliderPageNumber: 1,
  sliderPageSize: 10,
  sortColumn: "modifiedTime",
  sliderSortColumn: "modifiedTime",
  sortOrder: 1,
  sliderSortOrder: 1,
  totalDashboards: 0,
  totalSliders: 0,
  DeleteDashboard,
  userLogout,
  GetDashboardsList
};

export default function MyDashboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
