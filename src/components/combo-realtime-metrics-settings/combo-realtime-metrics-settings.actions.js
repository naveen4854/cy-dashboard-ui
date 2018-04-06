import { WidgetTypeEnum } from "../../shared/enums";
import { WidgetData } from "../../shared/lib";

export function initiateComboRealTimeSettings() {

}


export function generateMatrix() {
    return (dispatch, getState) => {
        let currentCombo = getState().configurations.widget;
        let comboId = currentCombo.id;
        let oldMatrix = currentCombo ? _.flatten(currentCombo.matrix) : null;
        let selectedGroup = getState().comboRealtimeSettings.selectedGroup;

        let matrix = []
        let headers = [];

        let comboSelectedStatisticItems = getState().configurations.comboSelectedStatisticItems;
        let columns = _.map(comboSelectedStatisticItems, (metric, i) => {
            headers.push(getColumnHeader(metric, i, comboId));
            return getColumn(metric)
        });

        let filters = getState().configurations.drillDownOptions//_.filter(drillDownOptions, (eachOption) => eachOption.checked);
        let rowHeaders = _.map(filters, (filter) => {
            return getRowHeader(filter, comboId);
        });

        let newMatrix = getNewMatrix(filters, headers, comboSelectedStatisticItems, rowHeaders, selectedGroup, comboId, oldMatrix)

    }
}

function getNewMatrix(filters, headers, comboSelectedStatisticItems, rowHeaders, selectedGroup, comboId, oldMatrix) {
    return _.map(filters, (filter, rowIndex) => {
        if (rowIndex == 0)
            return headers;
        let row = _.map(comboSelectedStatisticItems, (statisticItem, columnIndex) => {
            if (columnIndex == 0)
                return rowHeaders[0];

            // check if cell exists in old matrix by comparing columnId and rowId
            // if exists apply all its settings onto new widget
            // else create new widget and return
            // TODO please track the statistic item changes and apply them again and also widgettype
            let existingCell = _.find(oldMatrix, (oldCell) => oldCell.columnId == statisticItem.id && oldCell.rowId == filter.value + '_' + selectedGroup)
            if (existingCell)
                return existingCell;


            // Have to figure out if its a new row cell or a new column 
            // based on which we apply styles
            let dataMetrics = {
                group: {},
                item: statisticItem.item,
                func: statisticItem.func,
                displayFormat: statisticItem.displayFormat,
            };
            let cell = WidgetData.GetWidget(statisticItem.widget.value);
            cell.setDataMetrics(dataMetrics);
            cell.isComboWidget = true;
            cell.comboId = comboId;
            cell.columnId = statisticItem.id;
            cell.rowId = filter.value + '_' + selectedGroup; // TODO: check , using combination because there is chance of same id for unrelated drilldown options
            // isRowrColumn = false
            return cell;
        });
        return row;
    });
}

function getRowHeader(filter, comboId) {
    let rHeader = WidgetData.GetWidget(WidgetTypeEnum.Box, 0, true, true);
    rHeader.displayValue = filter.label;
    rHeader.isComboWidget = true;
    rHeader.comboId = comboId;
    rHeader.HideSettings = true;
    rHeader.settings = {
        filter: filter.value
    };
    rHeader.isRowrColumn = true;
    return rHeader;
}

function getColumnHeader(metric, index, comboId) {
    let cHeader = WidgetData.GetWidget(WidgetTypeEnum.Box, 0, true, true);
    cHeader.displayValue = metric.displayName;
    cHeader.isComboWidget = true;
    cHeader.HideSettings = index == 0 ? true : false;
    cHeader.comboId = comboId;
    cHeader.isHeader = true;
    cHeader.isRowrColumn = true;
    cHeader.settings = {
        item: metric.item && metric.item.id,
        cWidgetType: metric.widget && metric.widget.value,
    };
    return cHeader;
}

function getColumn(metric) {
    return {
        id: metric.id,
        cisiid: metric && metric.item && metric.item.id,
        ciafid: metric && metric.func && metric.func.id,
        cirob: 0,
        ciia: 0,
        cdf: metric && metric.displayFormat && metric.displayFormat.id,
        cwt: metric && metric.widget && metric.widget.value,
        dn: metric && metric.displayName
    };
}
