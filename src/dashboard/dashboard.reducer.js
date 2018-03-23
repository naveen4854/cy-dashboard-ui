import { WidgetTypeEnum, DashboardModeEnum } from '../shared/enums'
import { WidgetData } from '../shared/lib';
import { TOGGLE_SETTINGS_PANEL } from '../components/settings/settings.reducer';

const ADD_WIDGET = 'ADD_WIDGET'
export const UPDATE_WIDGET = 'UPDATE_WIDGET'

export function AddWidget(widgetType) {
    let widget = WidgetData.GetWidget(widgetType)
    return {
        type: ADD_WIDGET,
        widget
    }
}

export function UpdateWidget(widget) {
    return {
        type: UPDATE_WIDGET,
        widget
    };
}

export function ToggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        dispatch(getState().settings.ToggleSettingsMenu(widget))
    }
}

export const ACTION_HANDLERS = {
    [ADD_WIDGET]: (state, action) => {
        state.widgets = state.widgets.concat([action.widget])
        return Object.assign({}, state);
    },
    [UPDATE_WIDGET]: (state, action) => {
        let widgets = state.widgets.map((widget) => {
            if (widget.id !== action.widget.id) {
                return widget;
            }

            return {
                ...widget,
                ...action.widget
            };
        })
        return Object.assign({}, state, { widgets });
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