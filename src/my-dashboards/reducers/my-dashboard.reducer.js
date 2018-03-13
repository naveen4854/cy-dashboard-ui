import React from 'react';
import { push, replace } from 'react-router-redux';
import { browserHistory, Router } from 'react-router';
import WidgetType from '../../../../lib/enums/widget-type.enum';
import * as dashboardService from '../../../../api/dashboard.service';
import * as dashboardUtils from '../../../../lib/dashboard';
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
import * as dataMetricsAPI from '../../../../api/data-metrics.service';
import * as authMan from "../../../../authentication/auth-manager";
import * as authService from '../../../../api/auth.service';
import ResponseStatusEnum from '../../../../lib/enums/response-status-enum';
import * as Constants from '../../../../constants/constantValues';
const initialState = {
  categories: [],
  category: -1,
  userDashboards: [],
  totalPages: 0,
  myDashboards: true,
  globals: false,
  pageNumber: 1,
  pageSize: 10,
  sortColumn: "modifiedTime",
  sortOrder: 1,
  totalDashboards: 0,
  DeleteDashboard
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
  }

}

export function GetCategoriesAction() {
  return (dispatch, getState) => {

    dashboardService.getDashboardCategories(1).then((response) => {
      if (response.status === 200) {
        let _categories = _.uniqBy(_.map(response.data, (d) => {
          return {
            value: d.ci,
            label: d.cn
          }
        }), "value");
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: _categories
        });
      }
    })
  }
}

export function ViewDashboardAction() {
  return (dispatch, getState) => {
    dispatch(getState().viewdashboard.ViewDashboard());
  }
}

export function GetDashboardsList() {
  return (dispatch, getState) => {
    dispatch(getState().spinnerStore.BeginTask());
    let s = getState();
    let
      categoryId = s.mydashboard.category,
      pageNumber = s.mydashboard.pageNumber,
      pageSize = s.mydashboard.pageSize,
      globals = s.mydashboard.globals,
      myDashboards = s.mydashboard.myDashboards,
      sortColumn = s.mydashboard.sortColumn,
      sortingOrder = s.mydashboard.sortOrder == 0 ? 'asc' : 'desc';

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

export function DeleteConfirmation(config) {
  return (dispatch, getState) => {
    return dispatch(getState().notificationStore.ShowNotification(config));
  }
}

export function DeleteDashboard(dashboardId) {
  return (dispatch, getState) => {
    let s = getState(),
      pageStart = (s.mydashboard.pageNumber - 1) * s.mydashboard.pageSize + 1,
      pageEnd = s.mydashboard.totalDashboards,
      pageNum = s.mydashboard.pageNumber;
    dispatch(getState().spinnerStore.BeginTask());
    dashboardService.deleteDashboard(dashboardId).then((response) => {
      dispatch(getState().spinnerStore.EndTask());
      if (response.data.Status === true) {
        dispatch(getState().notificationStore.ShowNotification({
          type: ResponseStatusEnum.Success,
          messages: dashboardUtils.returnMessages(response.data.Messages, ResponseStatusEnum.Success)
        }));
        if (pageStart == pageEnd) {
          dispatch({
            type: UPDATE_PAGENUMBER,
            pageNumber: pageNum == 1 ? pageNum : pageNum - 1
          })
        }
        dispatch(GetDashboardsList());
      }
      else {
        dispatch(getState().notificationStore.ShowNotification({
          type: ResponseStatusEnum.Error,
          messages: dashboardUtils.returnMessages(response.data.Messages, ResponseStatusEnum.Error)
        }));
      }
    });
  }
}

export function getUserDashboardByIdAction(dashboardId) {
  return (dispatch, getState) => {
    dashboardService.getDashboardById(dashboardId).then((response) => {
      if (response.status === 200) {
        let dashboard = response.data;

        //getState().dataMetrics.getMetaDataAction(WidgetType.Box);

        //var datametricMetadata = getState().dataMetrics.datametricMetadata;

        dataMetricsAPI.getStatisticCategories().then(function (response) {
          if (response.status === 200) {
            const statisticCategories = response.data;
            const statisticCategoryOptions =
              _.map(_.filter(statisticCategories, x => x.WidgetType === WidgetType.Box), (obj) => {
                return {
                  label: obj.StatisticCategoryName,
                  value: obj.StatisticCategory
                };
              });
            dataMetricsAPI.getStatisticGroups().then(function (response) {
              if (response.status === 200) {
                const datametricsMetaData = _.map(response.data, (obj) => {
                  return {
                    StatisticGroupId: obj.StatisticGroupId,
                    StatisticGroup: obj.StatisticGroup,
                    StatisticItemId: obj.StatisticItemId,
                    StatisticItem: obj.StatisticItem,
                    StatisticFunctionId: obj.StatisticFunctionId,
                    StatisticFunction: obj.StatisticFunction,
                    DisplayFormatId: obj.DisplayFormatId,
                    DisplayFormat: obj.DisplayFormat,
                    StatisticCategory: obj.StatisticCategory,
                    WidgetType: obj.WidgetType,
                    AllowMultiSelect: obj.AllowMultiSelect,
                    IsDrillDownFilter: obj.IsDrillDownFilter,
                    Id: obj.Id,
                  };
                });

                const dashboardData = dashboardUtils.dashboard(dashboard, datametricsMetaData, true);

                dispatch(getState().newdashboard.BindDashboardAction(dashboardData));

              }
            });
          }
        });
      }
    })
  }
}

export function SetMyDashboardsAndGetDashboardsList(_getMyDashboards) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PAGENUMBER,
      pageNumber: 1
    });
    dispatch({
      type: UPDATE_MYDASHBOARD,
      myDashboards: _getMyDashboards
    });
    dispatch(GetDashboardsList());
  }
}

export function SetGlobalsAndGetDashboardsList(_getGlobals) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PAGENUMBER,
      pageNumber: 1
    });
    dispatch({
      type: UPDATE_GLOBALS,
      globals: _getGlobals
    });
    dispatch(GetDashboardsList());
  }
}

export function SetPageNumberAndGetDashboardsList(_pageNum) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PAGENUMBER,
      pageNumber: _pageNum
    });
    dispatch(GetDashboardsList());
  }
}

export function SetPageSizeAndGetDashboardsList(_pageSize) {
  return (dispatch, getState) => {
    let s = getState(),
      reqPagesize = _pageSize,
      currentPage = s.mydashboard.pageNumber,
      totalDashboards = s.mydashboard.totalDashboards,
      setCurrentPage = reqPagesize * currentPage > totalDashboards ? Math.ceil(totalDashboards / reqPagesize) : currentPage;

    dispatch({
      type: UPDATE_PAGENUMBER,
      pageNumber: setCurrentPage
    });

    dispatch({
      type: UPDATE_PAGESIZE,
      pageSize: _pageSize
    });
    dispatch(GetDashboardsList());
  }
}

export function SetSortAndGetDashboardList(_sortColumn, _sortOrder) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SORT,
      sortColumn: _sortColumn,
      sortOrder: _sortOrder
    });

    dispatch(GetDashboardsList());
  }
}

export function UserLogoutAction() {
  // TODO move this to logout reducer
  return (dispatch, getState) => {
    dispatch(getState().user.logout());
  }
}
export function ClearNotificationsAction() {
  return (dispatch, getState) => {
   dispatch(getState().notificationStore.ClearNotifications());
      
  }
}

export default function MyDashboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
