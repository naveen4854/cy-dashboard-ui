import { WidgetTypeEnum, DashboardModeEnum } from '../shared/enums'
import { WidgetData } from '../shared/lib';

const ADD_WIDGET = 'ADD_WIDGET'

export function AddWidget(widgetType) {
    let widget = WidgetData.GetWidget(widgetType)
    return {
        type: ADD_WIDGET,
        widget
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