import * as  ThresholdConstants from "./threshold.constants";
import { initializeThresholddata } from './threshold.actions'

export const ACTION_HANDLERS = {
    [ThresholdConstants.UPDATE_LEVELS]: (state, action) => {
        return Object.assign({}, state, {
            levels: action.levels
        })
    },
    [ThresholdConstants.HANDLE_CLICK]: (state, action) => {
        return Object.assign({}, state, {
            levels: action.levels
        })
    },
    [ThresholdConstants.DEFAULT_THRESHOLD]: (state, action) => {
        return Object.assign({}, state, {
            basedColumn: action.basedColumn,
            column: action.column,
            statisticsCategoryId: action.statisticsCategoryId,
            widgetId: action.widgetId,
            dataType: action.dataType,
            columnOptions: action.columnOptions,


        })
    }
}
const initialState = {
    initializeThresholddata
};
export default function ThresholdReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}