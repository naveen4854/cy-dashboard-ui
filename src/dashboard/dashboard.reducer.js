import { WidgetTypeEnum, DashboardModeEnum } from '../shared/enums'
import { WidgetData } from '../shared/lib';
import { TOGGLE_SETTINGS_PANEL } from '../components/widget-configurations/widget-configurations.reducer';

const ADD_WIDGET = 'ADD_WIDGET'
export const UPDATE_WIDGET = 'UPDATE_WIDGET'
export const UPDATE_WIDGETS = 'UPDATE_WIDGETS'
export const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD'

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
export function UpdateWidgets(widgets) {
    return {
        type: UPDATE_WIDGETS,
        widgets
    };
}
export function ToggleSettingsMenu(widget) {
    return (dispatch, getState) => {
        dispatch(getState().configurations.ToggleSettingsMenu(widget))
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
    },
    [UPDATE_WIDGETS]: (state, action) => {
        return Object.assign({}, state, {
            widgets: action.widgets
        })
    },
    [UPDATE_DASHBOARD]: (state, action) => {
        return Object.assign({}, state, {
            Id: action.dashboardData.Id,
            name: action.dashboardData.name,
            isGlobal: action.dashboardData.isGlobal,
            isDefault: action.dashboardData.isDefault,
            category: action.dashboardData.category,
            widgets: action.dashboardData.widgets
        });
    },
}

const initialState = {
    widgets: [],
    mode: DashboardModeEnum.Edit
};

export default function DashboardReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}