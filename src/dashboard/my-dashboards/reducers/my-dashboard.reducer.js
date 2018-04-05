import React from 'react';
import { push, replace } from 'react-router-redux';
import { browserHistory, Router } from 'react-router';
import _ from 'lodash';

import { Constants } from '../../../shared/constants';
import { WidgetTypeEnum, ResponseStatusEnum } from '../../../shared/enums';
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

export function GetDashboardsList() {
  return (dispatch, getState) => {
    dispatch(getState().spinnerStore.BeginTask());
    let state = getState();
    let
      categoryId = state.mydashboard.category,
      pageNumber = state.mydashboard.pageNumber,
      pageSize = state.mydashboard.pageSize,
      globals = state.mydashboard.globals,
      myDashboards = state.mydashboard.myDashboards,
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
      type: UPDATE_GLOBALS,
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
    dispatch({
      type: UPDATE_PAGENUMBER,
      pageSize
    });
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

const initialState = {
  categories: [],
  category: -1,
  userDashboards: [],
  totalPages: 0,
  myDashboards: true,
  globals: false,
  pageNumber: 1,
  pageSize: 2,
  sortColumn: "modifiedTime",
  sortOrder: 1,
  totalDashboards: 0,
};

export const ACTION_HANDLERS = {

  [UPDATE_CATEGORIES]: (state, action) => {
    return Object.assign({}, state, {
      categories: action.categories
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

export default function MyDashboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
