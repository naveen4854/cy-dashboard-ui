import { WidgetTypeEnum, DashboardModeEnum } from '../shared/enums'
import { WidgetData } from '../shared/lib';
import { TOGGLE_SETTINGS_PANEL } from '../components/widget-configurations/widget-configurations.reducer';

const ADD_WIDGET = 'ADD_WIDGET'
export const UPDATE_WIDGET = 'UPDATE_WIDGET'
import { updateDashboardMode, getDashboardById, updateWidgets } from './dashboard.actions';
import { UPDATE_DASHBOARD_MODE, UPDATE_DASHBOARD_WIDGETS } from './dashboard.constants';


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
}

const initialState = {
    widgets: [],
    mode: DashboardModeEnum.Edit,
    updateDashboardMode,
    getDashboardById,
    updateWidgets,
};

export default function DashboardReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}