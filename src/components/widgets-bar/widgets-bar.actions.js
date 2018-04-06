import * as  widgetBarConstants from "./widgets-bar.constants";

import _ from 'lodash';
import { UPDATE_WIDGETS, UPDATE_DASHBOARD } from "../../dashboard/dashboard.reducer";
import { TOGGLE_CONFIGURATIONS_PANEL } from "../widget-configurations/widget-configurations.reducer";
import { WidgetTypeEnum, ResponseStatusEnum } from "../../shared/enums";
import { DashboardUtilities } from "../../shared/lib";
import * as dashboardService from '../../dashboard/dashboard-service';
import { browserHistory, Router } from 'react-router';


export function updateProperty(key, value) {
    return (dispatch, getState) => {
        dispatch({
            type: widgetBarConstants.UPDATE_DASHBOARD_PROPERTY,
            key,
            value
        })
    }
}
export function CollapseAllSettingsMenus() {
    return (dispatch, getState) => {
        let widgets = getState().dashboard.widgets;
        _.forEach(widgets, (w) => {
            dispatch({
                type: TOGGLE_CONFIGURATIONS_PANEL,
                widget: w,
                widgetId: w.id,
                widgetType: w.widgetType,
                showPanel: false
            });

        });

    }
}
export function SaveDashboard() {
    return (dispatch, getState) => {
        let name = _.trim(getState().widgetsBar.name);
        dispatch(getState().spinnerStore.BeginTask());
        const dashboard = getState().dashboard;
        if (dashboard && dashboard.widgets) {
            let imageWidgets = _.filter(dashboard.widgets, function (widget, i) {
                if (widget.widgetType == WidgetTypeEnum.Picture) {
                    let mspid = "MSP" + i;
                    widget.UniqueId = mspid;
                    return true;
                }
            });
            const dashboardData = MapDashboard(dashboard, getState(), false, name)
            dashboardService.saveDashboard(dashboardData).then((response) => {
                //TODO: Need to add enums to display success and error messages.eg:response.data[0].Success.
                if (response.data.Status == true) {
                    let savedDashboardId = response.data.Messages[0].Info1;

                    let images = _.filter(getState().dashboard.widgets, function (widget, i) {
                        return (widget.widgetType == WidgetTypeEnum.Picture);
                    });
                    let len = images.length;
                    let dashboard = getState().dashboard;
                    dashboard.Id = savedDashboardId;
                    dashboard.name = name
                    dashboard.isDefault = dashboardData.didf;
                    dashboard.isGlobal = dashboardData.dig;
                    dispatch({
                        type: UPDATE_DASHBOARD,
                        dashboardData: dashboard
                    });
                    if (len <= 0) {
                        dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Success));
                    }
                    else {
                        _.map(images, (widget, key) => {

                            if (widget.file) {
                                DashboardPictureSave(widget, key, len, savedDashboardId, dispatch, getState, false);
                            }
                            else {
                                let mediaStorageInput = {};
                                mediaStorageInput.did = savedDashboardId;
                                //mediaStorageInput.oid = 1;
                                let blobData = [];

                                dispatch(getState().spinnerStore.BeginTask());
                                blobData.push({
                                    pbd: widget.picturePath,
                                    mspid: widget.UniqueId
                                });
                                mediaStorageInput.pblobs = blobData;
                                DashboardPictureSave(widget, key, len, savedDashboardId, dispatch, getState, true, mediaStorageInput);
                            }
                            if (key == images.length - 1) {
                                dispatch(getState().notificationStore.ShowNotification({
                                    type: ResponseStatusEnum.Success,
                                    messages: dashboardUtils.returnMessages(response.data.Messages, ResponseStatusEnum.Success)
                                }));

                            }

                        })
                    }
                    dispatch(getState().spinnerStore.EndTask());
                    NavigateToRequiredPage(getState().dashboard.fromAction, savedDashboardId, dispatch);

                } else {

                    if (response.data.Messages[0].MessageCode == 'DE') {
                        let existingDashboardId = response.data.Messages[0].Info1
                        let notifyMessage = response.data.Messages[0]
                        let finalNotifyMessage = { Message: notifyMessage.Message, NormalizedMessage: notifyMessage.NormalizedMessage, params: { dashboardName: name } }
                        let buttons = [
                            {
                                text: 'Yes',
                                handler: () => {
                                    let dashboard = getState().dashboard;
                                    dashboard.Id = existingDashboardId;
                                    dashboard.name = name;
                                    dispatch({
                                        type: UPDATE_DASHBOARD,
                                        dashboardData: dashboard
                                    });
                                    dispatch(UpdateDashboardAction(name))
                                }
                            },
                            {
                                text: 'No',
                                handler: () => { dispatch(HandleModalPopup(true)) },
                            }]
                        dispatch(getState().spinnerStore.EndAllTasks());
                        return dispatch(getState().notificationStore.confirm(finalNotifyMessage, buttons));
                    }
                    else {
                        dispatch(getState().spinnerStore.EndAllTasks());
                        return dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Error));
                    }
                }
            }).catch((err) => {
                dispatch(getState().spinnerStore.EndTask());
            });
        }
    }
}




export function UpdateDashboardAction() {
    return (dispatch, getState) => {
        const dashboard = getState().dashboard;
        let messagesConfig = {};
        messagesConfig.messages = [];
        let name = _.trim(getState().widgetsBar.name);
        if (!name) {
            dispatch(getState().spinnerStore.EndTask());
            return dispatch({
                type: MODAL_POPUP,
                showModalPopup: true
            });
        }
        //const dataMetricsMetadata = getState().dataMetrics.datametricMetadata;
        if (dashboard && dashboard.widgets) {
            let imageWidgets = _.filter(dashboard.widgets, function (widget, i) {
                if (widget.widgetType == WidgetTypeEnum.Picture) {
                    let mspid = "MSP" + i;
                    widget.UniqueId = mspid;
                    return true;
                }
            });
            const dashboardData = MapDashboard(dashboard, getState(), true, name)
            dashboardService.updateDashboard(dashboardData).then((response) => {
                //TODO: Need to add enums to display success and error messages.eg:response.data[0].Success.
                if (response.data.Status == true) {
                    let savedDashboardId = response.data.Messages[0].Info1;
                    dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Success));
                    let dashboardState = getState().dashboard;
                    dashboardState.name = name;
                    dispatch({
                        type: UPDATE_DASHBOARD,
                        dashboardData: dashboardState
                    });
                    let images = _.filter(dashboard.widgets, function (widget, i) {
                        return (widget.widgetType == WidgetTypeEnum.Picture);
                    });
                    let len = images.length;
                    _.map(images, (widget, key) => {
                        if (widget.file) {
                            DashboardPictureSave(widget, key, len, savedDashboardId, dispatch, getState);

                        }
                        else {
                            let blobData = [];
                            let mediaStorageInput = {};
                            mediaStorageInput.did = savedDashboardId;
                            // mediaStorageInput.oid = 1;

                            dispatch(getState().spinnerStore.BeginTask());
                            blobData.push({
                                pbd: widget.picturePath,
                                mspid: widget.UniqueId
                            });
                            mediaStorageInput.pblobs = blobData;
                            DashboardPictureSave(widget, key, len, savedDashboardId, dispatch, getState, true, mediaStorageInput);
                        }
                    });
                    if (len <= 0) {
                        NavigateToRequiredPage(getState().dashboard.fromAction, savedDashboardId, dispatch);
                    }
                } else {
                    dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Error));
                }
            })
        }
    }
}


export function HandleSaveAsPopUpAction(showSaveAsPopUp) {
    return (dispatch, getState) => {
        dispatch({
            type: widgetBarConstants.SAVE_AS_MODAL_POPUP,
            showSaveAsModalPopup: showSaveAsPopUp
        });
    }
}

export function HandleModalPopup(showModalPopup) {
    return (dispatch, getState) => {
        dispatch({
            type: widgetBarConstants.MODAL_POPUP,
            showModalPopup: showModalPopup
        });
    }
}

/**
 * This method is used to map dashboard data and is being used in multiple places.
 * @param {*} dashboard 
 * @param {*} getState 
 * @param {*} isUpdate 
 */
function MapDashboard(dashboard, getState, isUpdate, name) {
    const dataMetricsMetadata = getState.dataMetrics.datametricsMetadata;
    return {
        di: isUpdate ? dashboard.Id : Date.now(),
        dn: name,
        dc: undefined,
        // dci: dashboard.category.value, //Commented as no category selection
        dig: getState.widgetsBar.isGlobal,
        did: getState.widgetsBar.isDeleted,
        didf: getState.widgetsBar.isDefault,
        doi: 1,
        dsd: 0,
        dws: _.map(getState.dashboard.widgets, (widget) => {
            return DashboardUtilities.WidgetMapper(widget, dataMetricsMetadata);
        })

    }
}

function NavigateToRequiredPage(action, savedDashboardId, dispatch) {
    if (action == 'Save_and_exit') {
        dispatch({
            type: UPDATE_ACTION,
            fromAction: null
        });
        dispatch({
            type: UPDATE_DASHBOARD,
            dashboardData: _.cloneDeep(initialState)
        });
        browserHistory.push(`/dashboard/mydashboards`);
    }
    else {
        browserHistory.push(`/dashboard/edit/${savedDashboardId}`);
    }
}
