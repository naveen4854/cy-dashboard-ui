import { UPDATE_CONFIGURATIONS_WIDGET } from "./widget-configurations.reducer";

export function updateConfigurationsWidget(updatedWidget) {
    return (dispatch, getState) => {
        if (updatedWidget.id == getState().configurations.widget.id){
            dispatch({
                type: UPDATE_CONFIGURATIONS_WIDGET,
                widget: updatedWidget
            })}
    }
}
