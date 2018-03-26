
export function initiateCyReportSettings() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);
        let selectedStatisticCategory = getState().dataMetrics.statisticCategory;
        let statisticCategories = getState().dataMetrics.statisticCategories;
        let datametricsMetadata = getState().dataMetrics.datametricsMetadata;

        let _grpOptions = _.uniqBy(_.map(_.filter(datametricsMetadata, metric => (metric.StatisticCategory === selectedStatisticCategory &&
            metric.WidgetType === currentWidget.widgetType)), (obj) => {
                return {
                    id: obj.StatisticGroupId,
                    label: obj.StatisticGroup,
                    value: obj.Id
                };
            }), 'id');

        dispatch({
            type: SET_CYREPORT_STATISTIC_GROUPS,
            groupOptions: _grpOptions
        });
        dispatch({
            type: DEFAULT_CYREPORT_METRICS,
            selectedGroup: currentWidget.appliedSettings.dataMetrics.group || {},
            selectedItem: currentWidget.appliedSettings.dataMetrics.item || {},
            selectedFunction: currentWidget.appliedSettings.dataMetrics.func || {},
            selectedDisplayFormat: currentWidget.appliedSettings.dataMetrics.displayFormat || {}
        })
    }
}