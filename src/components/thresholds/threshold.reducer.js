import * as  ThresholdConstants from "./threshold.constants";
import { initializeThresholddata, updateDisplayFormat, clearThresholds } from './threshold.actions'


export const ACTION_HANDLERS = {
    [ThresholdConstants.UPDATE_LEVEL]: (state, action) => {
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
            levels: action.levels,
            basedColumn: action.basedColumn,
            column: action.column,
            statisticsCategoryId: action.statisticsCategoryId,
            widgetId: action.widgetId,
            dataType: action.dataType,
            columnOptions: action.columnOptions,
            widgetType: action.widgetType,
            isComboWidget: action.isComboWidget,
            displayFormatId: action.displayFormatId

        })
    },
    [ThresholdConstants.UPDATE_DISPLAY_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            displayFormatId: action.displayFormatId
        })

    },
    [ThresholdConstants.CLEAR_THRESHOLD_DATA]: (state, action) => {
        return Object.assign({}, state, action.thresholdData)
    }
}
export const thresholdsInitialState = {
    initializeThresholddata,
    levels: [],
    updateDisplayFormat,
    clearThresholds
};
export default function ThresholdReducer(state = _.cloneDeep(thresholdsInitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}