import { UPDATE_CONFIGURATIONS_WIDGET, TOGGLE_CONFIGURATIONS_PANEL } from "./widget-configurations.constants";

export function updateConfigurationsWidget(updatedWidget) {
    return (dispatch, getState) => {
        if (updatedWidget.id == getState().configurations.widget.id) {
            dispatch({
                type: UPDATE_CONFIGURATIONS_WIDGET,
                widget: updatedWidget
            })
        }
    }
}

export function closeConfigurations(closePanel = true) {
    return (dispatch, getState) => {
        dispatch(getState().dataMetrics.clearSelectedDM())
        return dispatch({
            type: TOGGLE_CONFIGURATIONS_PANEL,
            showPanel: !closePanel,
            widget: {}
        })
    }
}