import { WidgetData } from "../../shared/lib";
import { WidgetTypeEnum, StatisticCategoryEnum } from "../../shared/enums";
import { mappingCustomMatrixHeaders } from "../../shared/lib/dashboard-utilities";

export function saveComboRealTimeMetrics() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let comboId = currentWidget.id;
        let selectedGroup = getState().comboRealTimeSettings.selectedGroup;
        let matrix = []

        let comboSelectedStatisticColumns = getState().comboRealTimeSettings.comboSelectedStatisticColumns;
        let filters = getState().comboRealTimeSettings.selectedDrilldownOptions//_.filter(drillDownOptions, (eachOption) => eachOption.checked);
        let newMatrix = getNewMatrix(filters, comboSelectedStatisticColumns, selectedGroup, comboId, currentWidget)

        let statisticCategory = getState().dataMetrics.statisticCategory;
        let columns = _.map(comboSelectedStatisticColumns, (metric, i) => {
            return getColumn(metric)
        });
        let dataMetrics = {
            comboSelectedStatisticColumns: [...comboSelectedStatisticColumns],
            columns,
            drillDownOptions: filters,
            group: selectedGroup,
            statisticCategory
        }

        let updatedWidget = {
            ...currentWidget,
            matrix: newMatrix,
            appliedSettings: {
                ...currentWidget.appliedSettings,
                dataMetrics
            }
        }
        dispatch(getState().configurations.previewWidget(updatedWidget));
        // dispatch(getState().configurations.applyWidget(updatedWidget));
        // dispatch(getState().threshold.updateDisplayFormat(settings.displayFormat.id));
    }
}

function getNewMatrix(filters, comboSelectedStatisticColumns, selectedGroup, comboId, currentComboWidget) {
    let oldMatrix = currentComboWidget ? _.flatten(currentComboWidget.matrix) : null;
    let oldDrillDownOptions = currentComboWidget.appliedSettings.dataMetrics.drillDownOptions;
    let oldFilters = oldDrillDownOptions ? [...oldDrillDownOptions] : [];
    oldFilters.splice(0, 0, {});
    let oldColumns = currentComboWidget.appliedSettings.dataMetrics.comboSelectedStatisticColumns;

    //let eachCellWidth = width / comboSelectedStatisticColumns.length;
    // let eachCellHeight = height / ((filters.length - 1 > 0) ? (filters.length - 1) : 1);
    let height = currentComboWidget.height;
    let headerHeight = 50;
    let remainingHeight = height - headerHeight;
    let eachCellHeight = _.floor(remainingHeight / (filters.length > 0 ? filters.length  :1));
    let eachCellWidth = currentComboWidget.width / comboSelectedStatisticColumns.length;
    let adjustedHeaderHeight = height - (filters.length * eachCellHeight);

    debugger
    let newFilters = [...filters];
    newFilters.splice(0, 0, {})
    let previousRow = undefined;
    let previousCell = undefined;
    return _.map(newFilters, (filter, rowIndex) => {
        let row = _.map(comboSelectedStatisticColumns, (statisticColumn, columnIndex) => {
            let isColumnHeader = rowIndex == 0;
            let isRowHeader = columnIndex == 0;
            let dataMetrics = {
                group: {},
                item: statisticColumn.item,
                func: statisticColumn.func,
                displayFormat: statisticColumn.displayFormat,
                statisticCategory: StatisticCategoryEnum.RealTime
            };

            let widgetType = isColumnHeader ? WidgetTypeEnum.Box : statisticColumn.widget.value;
            let cell = WidgetData.GetWidget(widgetType, 0, true, isColumnHeader, isRowHeader);
            if (columnIndex != 0 && rowIndex != 0)
                cell.setDataMetrics(dataMetrics);
            if (isColumnHeader || isRowHeader)
                cell.displayValue = filter.label || statisticColumn.displayName;

            cell.comboId = comboId;
            cell.columnId = statisticColumn.id;
            cell.rowId = isColumnHeader ? -1 : filter.value + '_' + selectedGroup.id; // using combination because there is chance of same id for unrelated drilldown options

            // check if cell exists in old matrix by comparing columnId and rowId
            // if exists apply all its styles/thresholds onto new widget
            // P.S. track the statistic item changes and apply them again and also widgettype
            let existingCell = _.find(oldMatrix, (oldCell) => oldCell.columnId == cell.columnId && oldCell.rowId == cell.rowId)
            if (existingCell) {
                if (existingCell.widgetType == cell.widgetType)
                    cell.applyStyles(existingCell);
                else {
                    // Have to figure out if its a new row cell or a new column 
                    // based on which we apply styles
                    let styles = {
                        appliedBackgroundColor: existingCell.widgetBody.backgroundColor,
                        widgetBody: existingCell.widgetBody,
                        valueStyles: existingCell.valueStyles
                    }
                    cell.applyCommonStyles(styles);
                }
                cell.applyThresholds(existingCell.appliedSettings.thresholds || []);
            }

            // default styles based on new column or row
            if (_.find(oldFilters, oldFilter => (oldFilter.value ? oldFilter.value : oldFilter) == filter.value)) {
                //cell.applyStyles(existingCell);
            } else {
                if (previousRow && previousRow[columnIndex] && rowIndex > 1) {
                    cell.applyStyles(previousRow[columnIndex]);
                }
            }

            if (_.find(oldColumns, oldColumn => oldColumn.id == statisticColumn.id)) {
            } else {
                if (rowIndex != 0) {
                    cell.applyCommonStyles(currentComboWidget);
                }
                else {
                    if (previousCell) {
                        cell.applyCommonStyles(previousCell);
                    }
                }
                cell = {
                    ...cell,
                    stylesConfigured: false
                }
            }
            previousCell = _.cloneDeep(cell);
            return {
                ...cell,
                width: eachCellWidth,
                height: isColumnHeader ? adjustedHeaderHeight : eachCellHeight
            };
        });
        previousRow = _.cloneDeep(row);
        return row;
    });
}

function getRowHeader(filter, comboId, selectedGroup) {
    let rHeader = WidgetData.GetWidget(WidgetTypeEnum.Box, 0, true, true);
    rHeader.displayValue = filter.label;
    rHeader.columnId = -1;// filter.value;
    rHeader.rowId = filter.value + '_' + selectedGroup.id;

    rHeader.isRowrColumn = true;
    rHeader.isColumnHeader = false;
    rHeader.isRowHeader = true;
    rHeader.settings = {
        filter: filter.value
    };
    rHeader.HideSettings = true;
    rHeader.comboId = comboId;
    rHeader.isComboWidget = true;
    return rHeader;
}

function getColumnHeader(metric, index, comboId) {
    let cHeader = WidgetData.GetWidget(WidgetTypeEnum.Box, 0, true, true);
    cHeader.displayValue = metric.displayName;
    cHeader.isComboWidget = true;
    cHeader.HideSettings = index == 0 ? true : false;
    cHeader.comboId = comboId;
    cHeader.isColumnHeader = true;
    cHeader.isRowHeader = false;
    cHeader.isRowrColumn = true;
    cHeader.columnId = metric.id;
    cHeader.rowId = -1;
    cHeader.settings = {
        item: metric.item && metric.item.id,
        cWidgetType: metric.widget && metric.widget.value,
    };
    return cHeader;
}

function getColumn(metric) {
    return {
        cid: metric.id,
        cisiid: metric && metric.item && metric.item.id,
        ciafid: metric && metric.func && metric.func.id,
        cirob: 0,
        ciia: 0,
        cdf: metric && metric.displayFormat && metric.displayFormat.id,
        cwt: metric && metric.widget && metric.widget.value,
        dn: metric && metric.displayName
    };
}

export function saveComboCustomMetricsAction() {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.clearNotifications());
        let columns = getState().comboCustomSettings.columns;
        let currentWidget = getState().configurations.widget;
        let query = getState().comboCustomSettings.query;
        let existedMatrix = currentWidget ? currentWidget.matrix : [];
        let existingHeaders = existedMatrix[0];

        let newMatrix = [];
        let headers = _.map(columns, (column) => {
            let existingHeader = _.find(existingHeaders, (header) => header.columnId == column.selectedColumn.value)
            if (existingHeader)
                return mappingCustomMatrixHeaders(existingHeader, column);

            let cellHeader = WidgetData.GetWidget(WidgetTypeEnum.Box, 0, true);
            cellHeader.comboId = currentWidget.id;

            let appliedSettings = {
                ...cellHeader.appliedSettings,
                basedColumn: column.selectedColumn,
                dataMetrics: {
                    ...cellHeader.appliedSettings.dataMetrics,
                    statisticCategory: StatisticCategoryEnum.Custom
                }
            }
            cellHeader.applySettings(appliedSettings);
            return mappingCustomMatrixHeaders(cellHeader, column);
        });

        newMatrix.splice(0, 0, headers);
        let dataMetrics = {
            query,
            columns,
            statisticCategory: StatisticCategoryEnum.Custom
        }

        let updatedWidget = {
            ...currentWidget,
            matrix: newMatrix,
            appliedSettings: {
                ...currentWidget.appliedSettings,
                dataMetrics
            }
        }
        dispatch(getState().configurations.previewWidget(updatedWidget));
    }
}
