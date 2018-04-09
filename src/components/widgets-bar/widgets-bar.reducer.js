import * as  widgetBarConstants from "./widgets-bar.constants";
import { Widgets } from '../../shared/constants';


export const ACTION_HANDLERS = {
    [widgetBarConstants.UPDATE_DASHBOARD_PROPERTY]: (state, action) => {
        return Object.assign({}, state, {
            [action.key]: action.value
        })
    },
    [widgetBarConstants.MODAL_POPUP]: (state, action) => {

        return Object.assign({}, state, {
            showModalPopup: action.showModalPopup
        })
    },
    [widgetBarConstants.SAVE_AS_MODAL_POPUP]: (state, action) => {
        return Object.assign({}, state, {
            showSaveAsModalPopup: action.showSaveAsModalPopup
        })
    }
}
const initialState = {
    name: '',
    isDefault: false,
    isGlobal: false,
    widgets: Widgets,
    showModalPopup: false,
    showSaveAsModalPopup: false,
    Id: undefined
};
export default function WidgetsBarReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}