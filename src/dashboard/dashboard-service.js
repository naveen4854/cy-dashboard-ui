import {service}  from "../utilities/";
import { ApiUrl } from "../shared/constants";

export function getSliderDashboards(userId) {
    return service.axiosGet(
        ApiUrl.SLIDER_DASHBOARD, userId
    )
}

export function getWidgetData(dashboardId, widgetId) {
    return service.axiosGet(
        `${ApiUrl.WIDGET_DATA}/${dashboardId}/${widgetId}`
    )
}
export function viewWidgetData(dashboardId, widgetId, previousData) {
    return service.axiosPost(
        `${ApiUrl.WIDGET_VIEW_DATA}/${dashboardId}/${widgetId}`, previousData
    )
}


export function getDashboardCategories() {
    return service.axiosGet(
        `${ApiUrl.DASHBOARD_CATEGORIES}`
    )
}

export function getDashboardsByCategory(categoryId, myDashboards, globals, pageNumber, pageSize, sortColumn, sortingOrder) {
    return service.axiosGet(
        `${ApiUrl.GET_DASHBOARDS_BY_CATEGORY}/${categoryId}/${myDashboards}/${globals}/${pageNumber}/${pageSize}/${sortColumn}/${sortingOrder}`
    )
}
export function getDashboardById(dashboardId, toEdit) {
    return service.axiosGet(
        `${ApiUrl.GET_DASHBOARD_BY_ID}/${dashboardId}/${toEdit}`
    )
}
export function getDefaultRefreshInterval() {
    return service.axiosGet(
        `${ApiUrl.DEFAULT_REFRESHINTERVAL}`
    )
}
export function saveDashboard(dashboard) {
    return service.axiosPost(
        ApiUrl.SVAE_DASHBOARD, dashboard
    )
}

export function deleteDashboard(dashboardId) {
    return service.axiosPost(
        `${ApiUrl.DELETE_DASHBOARD}/${dashboardId}`

    )
}

export function pictureSave(pictureData) {
    return service.axiosPost(ApiUrl.PICTURE_SAVE, pictureData)
}

export function updateDashboard(dashboard) {
    debugger;
    return service.axiosPost(
        ApiUrl.UPDATE_DASHBOARD, dashboard
    )
}
export function testThreshold(threshold) {
    return service.axiosPost(
        ApiUrl.TEST_THRESHOLD, threshold
    )
}
