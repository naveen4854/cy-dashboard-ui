import { widgetList } from '../../shared/constants';
import { UPDATE_DASHBOARD_PROPERTY, MODAL_POPUP, SAVE_AS_MODAL_POPUP } from './widgets-bar.constants';


export const ACTION_HANDLERS = {
    [MODAL_POPUP]: (state, action) => {
        return Object.assign({}, state, {
            showModalPopup: action.showModalPopup
        })
    },
    [SAVE_AS_MODAL_POPUP]: (state, action) => {
        return Object.assign({}, state, {
            showSaveAsModalPopup: action.showSaveAsModalPopup
        })
    }
}
const initialState = {
    showModalPopup: false,
    showSaveAsModalPopup: false,
    widgetList: widgetList,
    fromAction: undefined   
};
export default function WidgetsBarReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}