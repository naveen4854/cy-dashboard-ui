import { StatisticCategoryEnum, WidgetTypeEnum } from "../../shared/enums";
import { WidgetData } from "../../shared/lib";
import { SET_COMBO_REALTIME_STATISTIC_GROUPS, UPDATE_COMBO_SELECTED_GROUP, UPDATE_COMBO_STATISTIC_ITEMS, SET_COMBO_SELECTED_STATISTIC_ITEMS, UPDATE_COMBO_REALTIME_DISPLAYNAME, SET_COMBO_REALTIME_STATISTIC_ITEM, UPDATE_COMBO_REALTIME_FUNCTIONS, UPDATE_COMBO_REALTIME_SELECTED_FUNCTION, UPDATE_COMBO_REALTIME_DISPLAY_FORMATS, UPDATE_COMBO_REALTIME_SELECTED_DISPLAY_FORMAT, UPDATE_COMBO_REALTIME_APPLICABLE_WIDGETS, SET_COMBO_REALTIME_APPLICABLE_WIDGET, UPDATE_COMBO_DRILL_DOWN_METADATA, UPDATE_COMBO_REALTIME_TOGGLE_ADD, SET_COMBO_REALTIME_STATISTIC_COLUMNS } from './combo-custom-metrics-settings.constants';

import * as dataMetricsService from '../data-metrics/data-metrics-service';
import { getWidgetByEnum } from "../../shared/lib/widget-data";
import { getRandom } from "../../utilities/utils";

export function initiateComboCustomSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        let selectedStatisticCategory = getState().dataMetrics.statisticCategory;
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;
        let groupOptions = getState().realTimeSettings.groupOptions;
        if (!groupOptions || groupOptions.length == 0) {
            let _grpOptions = _.uniqBy(_.map(_.filter(datametricsMetadata, metric => (metric.StatisticCategory === StatisticCategoryEnum.RealTime &&
                metric.WidgetType === currentWidget.widgetType)), (obj) => {
                    return {
                        id: obj.StatisticGroupId,
                        label: obj.StatisticGroup,
                        value: obj.Id
                    };
                }), 'id');

            dispatch({
                type: SET_COMBO_REALTIME_STATISTIC_GROUPS,
                groupOptions: _grpOptions
            });
        }

        let appliedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory
        if (appliedStatisticCategory == StatisticCategoryEnum.RealTime)
            dispatch({
                // type: DEFAULT_REALTIME_METRICS,
                // selectedGroup: currentWidget.appliedSettings.dataMetrics.group || {},
                // selectedItem: currentWidget.appliedSettings.dataMetrics.item || {},
                // selectedFunction: currentWidget.appliedSettings.dataMetrics.func || {},
                // selectedDisplayFormat: currentWidget.appliedSettings.dataMetrics.displayFormat || {}
            })
    }
}
