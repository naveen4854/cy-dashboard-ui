import * as  ThresholdConstants from "./threshold.constants";
import { initializeThresholddata, updateDisplayFormat, clearThresholds, loadThresholdColumnOptions } from './threshold.actions'


export const ACTION_HANDLERS = {
    [ThresholdConstants.DEFAULT_THRESHOLD]: (state, action) => {
        return Object.assign({}, state, {
            levels: action.levels,
            basedColumn: action.basedColumn,
        })
    },
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
    [ThresholdConstants.UPDATE_DISPLAY_FORMAT]: (state, action) => {
        return Object.assign({}, state, {
            displayFormatId: action.displayFormatId
        })

    },
    [ThresholdConstants.CLEAR_THRESHOLD_DATA]: (state, action) => {
        return Object.assign({}, state, action.thresholdData)
    },
    [ThresholdConstants.UPDATE_THRESHOLD_COLUMN_OPTIONS]: (state, action) => {
        return Object.assign({}, state, {
            columnOptions: action.columnOptions
        })
    },
    [ThresholdConstants.UPDATE_THRESHOLD_BASED_COLUMN]: (state, action) => {
        return Object.assign({}, state, {
            basedColumn: action.basedColumn
        })
    },
    [ThresholdConstants.UPDATE_THRESHOLD_LEVELS]: (state, action) => {
        return Object.assign({}, state, {
            levels: action.levels
        })
    },
}
export const thresholdsInitialState = {
    levels: [],
    columnOptions: [],
    basedColumn: {},
    clearThresholds,
    initializeThresholddata,
    loadThresholdColumnOptions,
    statisticItems: [],
    functionOptions: [],
    displayFormatOptions: [],
};
export default function ThresholdReducer(state = _.cloneDeep(thresholdsInitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}