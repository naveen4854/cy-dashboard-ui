import * as dataMetricsService from './data-metrics-service';
import { statisticCategoryEnum, WidgetTypeEnum } from '../../shared/enums';

export const UPDATE_DATAMETRICS = "UPDATE_DATAMETRICS"

export function LoadDataMetricsMetaData(dashboardId) {
    return (dispatch, getState) => {
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetaData = getState().dataMetrics.datametricMetadata;
        if (statisticCategories && statisticCategories.length != 0 && datametricsMetaData) {
            return
        }

        // Load StatisticCategories for all and then filter per widgetType and update DM store
        dispatch(getState().spinnerStore.BeginTask());

        dataMetricsService.getStatisticCategories().then(function (response) {
            dispatch(getState().spinnerStore.EndTask());

            if (response.status === 200) {
                statisticCategories = response.data;

                dispatch(getState().spinnerStore.BeginTask());
                dataMetricsService.getStatisticGroups().then(function (response) {
                    dispatch(getState().spinnerStore.EndTask());
                    if (response.status === 200) {
                        datametricsMetaData = _.map(response.data, (obj) => {
                            return DataMetricsMetadataMapper(obj);
                        });

                        if (!datametricsMetaData)
                            return;

                        // Dispatching basic data for DM - categories and groups
                        dispatch({
                            type: UPDATE_DATAMETRICS,
                            statisticCategories,
                            statisticCategoryOptions: [],
                            datametricsMetaData,
                            groupOptions: [],
                        });
                    }
                });
            }
        });
    }
}

function DataMetricsMetadataMapper(obj) {
    return {
        StatisticGroupId: obj.dSGId,
        StatisticGroup: obj.dSG,
        StatisticItemId: obj.dSIId,
        StatisticItem: obj.dSI,
        StatisticFunctionId: obj.dSFId,
        StatisticFunction: obj.dSF,
        DisplayFormatId: obj.dDFId,
        DisplayFormat: obj.dDF,
        StatisticCategory: obj.dSC,
        WidgetType: obj.dWT,
        AllowMultiSelect: obj.dAMS,
        IsDrillDownFilter: obj.dDDF,
        IsFilterId: obj.dIF,
        Id: obj.dId
    };
}

export const ACTION_HANDLERS = {
    [UPDATE_DATAMETRICS]: (state, action) => {
        return Object.assign({}, state, {
            statisticCategories: action.statisticCategories,
            statisticCategoryOptions: action.statisticCategoryOptions,
            datametricMetadata: action.datametricsMetaData,
            groupOptions: action.groupOptions
        })
    }
}

const initialState = {
    widgetType: WidgetTypeEnum.Box,
    groupOptions: [],
    itemOptions: [],
    functionOptions: [],
    storeProcOptions: [],
    selectedGroup: {},
    selectedItem: {},
    selectedFunction: {},
    selectedDisplayFormat: {},
    storeProcData: null,
    selectedWidgetforStatisticItem: '',
    displayFormatOptions: [],
    statisticCategory: statisticCategoryEnum.RealTime,
    isDirty: false,
    isLoaded: false,
    allColumnOptions: [],
    columnOptions: [],
    comboSelectedStatisticItems: [],
    statisticCategories: [],
    datametricsMetaData: {},
    isDefault: false,
    displayName: '',
    LoadDataMetricsMetaData,
};

export default function DataMetricsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}