import * as  widgetBarConstants from "./widgets-bar.constants";
import { Widgets } from '../../shared/constants';


export const ACTION_HANDLERS = {
    [widgetBarConstants.UPDATE_DASHBOARD_PROPERTY]: (state, action) => {
        return Object.assign({}, state, {
            [action.key]: action.value
        })
    }
}
const initialState = {
    name: '',
    isDefault: false,
    isGlobal: false,
    widgets: Widgets
};
export default function WidgetsBarReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}