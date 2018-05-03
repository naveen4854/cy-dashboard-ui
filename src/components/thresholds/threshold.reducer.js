import * as  ThresholdConstants from "./threshold.constants";
import { initializeThresholddata, updateDisplayFormat, clearThresholds, loadThresholdColumnOptions,loadCustomComboDisplayFormat,setDisplayFormat } from './threshold.actions'


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
    [ThresholdConstants.UPDATE_REALTIME_BASED_COLUMN]: (state, action) => {

        return Object.assign({}, state, {
            statisticItems: action.realTime.statisticItems,
            functionOptions: action.realTime.statisticFuncs,
            displayFormatOptions: action.realTime.displayFormats,
            item: action.realTime.item,
            func: action.realTime.func,
            displayFormat: action.realTime.displayFormat
        })
    },
    [ThresholdConstants.UPDATE_STATISTICITEM]: (state, action) => {
        return Object.assign({}, state, {
            item: action.item,
           
        });
    },
    [ThresholdConstants.UPDATE_STATISTICFUNC]: (state, action) => {
        return Object.assign({}, state, {
            func: action.func
        });
    },
    [ThresholdConstants.UPDATE_REALTIME_DISPLAYFORMAT]: (state, action) => {
        return Object.assign({}, state, {
            displayFormat: action.displayFormat
        });
    },
    [ThresholdConstants.UPDATE_FUNCOPTIONS]: (state, action) => {
        return Object.assign({}, state, {
            functionOptions: action.statisticFuncs,
            func:{},
            displayFormat:{},
            displayFormatOptions:[]
           
        })
    },
    [ThresholdConstants.UPDATE_DISPOPTIONS]: (state, action) => {
        return Object.assign({}, state, {
             displayFormatOptions: action.displayFormats,
             displayFormat:{}
        })
    }
}
export const thresholdsInitialState = {
    levels: [],
    columnOptions: [],
    basedColumn: {},
    clearThresholds,
    initializeThresholddata,
    loadThresholdColumnOptions,
    loadCustomComboDisplayFormat,
    statisticItems: [],
    functionOptions: [],
    displayFormatOptions: [],
    setDisplayFormat,
    displayFormat: undefined,
    item: undefined,
    func: undefined
};
export default function ThresholdReducer(state = _.cloneDeep(thresholdsInitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}