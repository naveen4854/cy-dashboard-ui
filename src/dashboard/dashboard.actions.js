import { UPDATE_DASHBOARD_WIDGETS } from "./dashboard.reducer";

export function PreviewActionPicture(dashboardId, widgetid) {
    return (dispatch, getState) => {
        dashboardService.viewWidgetData(dashboardId, widgetid).then((response) => {
            if (response.status === 200) {
                //TODO: find a better way
                // const widget = _.find(getState().newdashboard.widgets, widget => widget.id === widgetid);
                // widget.picturePath = response.data.pblob,
                //     widget.pictureStretch = response.data.wps == 1 ? { value: PictureStretchEnum.ActualSize, label: 'Actual Size' } : { value: PictureStretchEnum.Fill, label: 'Fill' };
                // dispatch({
                //     type: UPDATE_WIDGET,
                //     widget
                // });
            }
        });
    }
}

export function toggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        dispatch(getState().configurations.toggleSettingsMenu(widget))
    }
}

export function updateWidgetZIndex(currentWidget) {
    return (dispatch, getState) => {
        let allWidgets = getState().dashboard.widgets
        let updatedWidget = { ...currentWidget, z: allWidgets.length }

        let updatedWidgets = _.map(allWidgets, (widget) => {
            if (widget.id == currentWidget.id)
                return updatedWidget;

            if (widget.z > currentWidget.z)
                return { ...widget, z: widget.z - 1 };

            return widget;
        })

        dispatch({
            type: UPDATE_DASHBOARD_WIDGETS,
            widgets: updatedWidgets
        })
        
        dispatch(getState().configurations.updateConfigurationsWidget(updatedWidget))
    }
}

export function UpdateWidgetPositionAction(x, y, widgetId) {
    return (dispatch, getState) => {

        let allWidgets = getState().dashboard.widgets

        let newWidgets = _.map(allWidgets, (widget) => {
            if (widget.id == currentWidget.id)
                return { ...currentWidget, x, y }

            return widget;
        })

        dispatch({
            type: UPDATE_WIDGET,
            widget: selectedWidget
        });
    }
}