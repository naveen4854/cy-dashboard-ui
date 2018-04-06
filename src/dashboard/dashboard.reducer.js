import { WidgetTypeEnum, DashboardModeEnum } from '../shared/enums'
import { WidgetData } from '../shared/lib';
import { TOGGLE_SETTINGS_PANEL } from '../components/widget-configurations/widget-configurations.reducer';


import { updateDashboardMode, getDashboardById, updateWidgets, updateWidget, updateDashboard, updateShowIcons, pullWidget } from './dashboard.actions';
import { UPDATE_DASHBOARD_MODE, UPDATE_DASHBOARD_WIDGETS, UPDATE_DASHBOARD_WIDGET, ADD_WIDGET, UPDATE_DRAGGABLE, UPDATE_DASHBOARD, UPDATE_SHOW_ICONS } from './dashboard.constants';


export function AddWidget(widgetType) {
    return (dispatch, getState) => {
        let widgets = getState().dashboard.widgets;
        let widget = WidgetData.GetWidget(widgetType, widgets.length + 1)
        dispatch({
            type: ADD_WIDGET,
            widget
        })
    }
}

export function UpdateWidget(widget) {
    return {
        type: UPDATE_DASHBOARD_WIDGET,
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
    [UPDATE_DASHBOARD_WIDGET]: (state, action) => {
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
    [UPDATE_DASHBOARD_MODE]: (state, action) => {
        return Object.assign({}, state, {
            mode: action.mode,

        })
    },
    [UPDATE_DASHBOARD_WIDGETS]: (state, action) => {
        return Object.assign({}, state, {
            widgets: action.widgets,
        })
    },
    [UPDATE_DRAGGABLE]: (state, action) => {
        return Object.assign({}, state, {
            disableDrag: action.draggable,
        })
    },
    [UPDATE_DASHBOARD]:(state, action) => {
        return Object.assign({}, state, {...action.dashboard}); 
    },
    [UPDATE_SHOW_ICONS]: (state, action) => {
        return Object.assign({}, state, {
            showIcons: action.showIcons,

        })
    },
}

const initialState = {
    widgets: [],
    mode: DashboardModeEnum.Edit,
    updateDashboardMode,
    getDashboardById,
    updateWidgets,
    updateWidget,
    disableDrag: false,
    updateDashboard,
    Id: -1,
    updateShowIcons,
    showIcons: true,
    pullWidget,
};

export default function DashboardReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}