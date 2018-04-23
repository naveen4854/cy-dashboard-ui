import { widgetList } from '../../shared/constants';
import { UPDATE_DASHBOARD_PROPERTY, MODAL_POPUP, SAVE_AS_MODAL_POPUP, UPDATE_IS_EXPANDED, UPDATE_ACTION } from './widgets-bar.constants';


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
    },
    [UPDATE_IS_EXPANDED]: (state, action) => {
        return Object.assign({}, state, {
            isExpanded: action.isExpanded
        })
    },
    [UPDATE_ACTION]: (state, action) => {
        return Object.assign({}, state, {
            fromAction: action.fromAction
        });
    }
}
const initialState = {
    showModalPopup: false,
    showSaveAsModalPopup: false,
    widgetList: widgetList,
    fromAction: undefined,
    isExpanded: false,
};
export default function WidgetsBarReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}