import { WidgetTypeEnum, DashboardModeEnum } from '../shared/enums'
import { WidgetData } from '../shared/lib';
import { TOGGLE_SETTINGS_PANEL } from '../components/settings/settings.reducer';

const ADD_WIDGET = 'ADD_WIDGET'

export function AddWidget(widgetType) {
    let widget = WidgetData.GetWidget(widgetType)
    return {
        type: ADD_WIDGET,
        widget
    }
}

export function ToggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        dispatch({
            type: TOGGLE_SETTINGS_PANEL,
            widgetId: widget.id,
            widgetType: widget.widgetType
        })
    }
}


export const ACTION_HANDLERS = {
    [ADD_WIDGET]: (state, action) => {
        state.widgets = state.widgets.concat([action.widget])
        return Object.assign({}, state);
    }
}

const initialState = {
    widgets: [],
    mode: DashboardModeEnum.Edit
};

export default function DashboardReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}