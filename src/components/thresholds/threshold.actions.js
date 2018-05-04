import * as ThresholdConstants from './threshold.constants';
import _ from 'lodash';
import { utils } from '../../utilities';
import { ResponseStatusEnum, StatisticCategoryEnum, DisplayFormatEnum, WidgetTypeEnum } from '../../shared/enums';
import { Constants } from '../../shared/constants';
import * as ThresholdService from './threshold-service';
import { thresholdsInitialState } from './threshold.reducer';
import * as dataMetricsService from '../data-metrics/data-metrics-service'
import { getSelectedItem, getSelectedFunction, getDisplayFormat as getDisplayFormatSetting } from '../../shared/lib/dashboard-utilities/settings-utils';

export function initializeThresholddata() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;

        let threshold = { ...getState().threshold };
        let levels = currentWidget.appliedSettings.thresholds;
        if (currentWidget.isComboWidget) {
            let comboWidget = _.find(getState().dashboard.widgets, wt => wt.id == currentWidget.comboId);
            if (comboWidget.appliedSettings.dataMetrics.statisticCategory == StatisticCategoryEnum.Custom) {
                let resultColumn = _.find(comboWidget.appliedSettings.dataMetrics.columns, y => _.trim(y.selectedColumn.label) == _.trim(currentWidget.column))
                let displayFormat = currentWidget.appliedSettings.basedColumnDisplayFormat ? currentWidget.appliedSettings.basedColumnDisplayFormat : resultColumn.displayFormat;
                dispatch(getState().threshold.loadThresholdColumnOptions(comboWidget.appliedSettings.dataMetrics.query));
                if (getState().comboCustomSettings.displayFormatOptions.length > 0) {
                    dispatch(getState().threshold.loadCustomComboDisplayFormat(getState().comboCustomSettings.displayFormatOptions));
                    if (!displayFormat.label) {
                        displayFormat.label = _.find(getState().comboCustomSettings.displayFormatOptions, m => m.id == displayFormat.id).label || undefined;
                    }
                    dispatch(getState().threshold.setDisplayFormat(displayFormat));
                } else {
                    dataMetricsService.getDisplayformats(StatisticCategoryEnum.Custom).then(function (response) {
                        if (response.status === 200) {

                            var result = _.map(response.data, (item) => {
                                return {
                                    value: item.DisplayFormatId,
                                    id: item.DisplayFormatId,
                                    label: item.DisplayFormatName
                                }
                            })

                            dispatch(getState().threshold.loadCustomComboDisplayFormat(result));
                            if (!displayFormat.label) {
                                
                                displayFormat.label = _.find(result, b => b.id == displayFormat.id).label || undefined;
                            }
                            debugger;
                            dispatch(getState().threshold.setDisplayFormat(displayFormat));
                        }
                    });
                }

            }
            else {
                let metricsData = { ...getState().dataMetrics.dataMetricsMetadata };
                if (currentWidget.appliedSettings.basedReal) {
                    threshold.item = getSelectedItem(currentWidget.appliedSettings.basedReal.itemId, metricsData);
                    threshold.func = getSelectedFunction(currentWidget.appliedSettings.basedReal.funcId, metricsData);
                    threshold.displayFormat = getDisplayFormatSetting(currentWidget.appliedSettings.basedReal.dsId, metricsData);
                }
                let item = threshold.item ? threshold.item : { ...currentWidget.appliedSettings.dataMetrics.item };
                let func = threshold.func ? threshold.func : { ...currentWidget.appliedSettings.dataMetrics.func };
                let displayFormat = threshold.displayFormat ? threshold.displayFormat : { ...currentWidget.appliedSettings.dataMetrics.displayFormat }

                let statisticItems = setStatisticItems(currentWidget, metricsData, comboWidget.appliedSettings.dataMetrics.group);
                let statisticFuncs = setStatisticFunctions(currentWidget, metricsData, item);
                let displayFormats = setDisplayFormats(currentWidget, metricsData, func, item);
                let realTime = { item: item, func: func, displayFormat: displayFormat, statisticItems: statisticItems, statisticFuncs: statisticFuncs, displayFormats: displayFormats }
                dispatch({
                    type: ThresholdConstants.UPDATE_REALTIME_BASED_COLUMN,
                    realTime
                });
            }
        }

        dispatch({
            type: ThresholdConstants.DEFAULT_THRESHOLD,
            levels,
            basedColumn: currentWidget.appliedSettings.basedColumn
        })
    }
}

export function loadCustomComboDisplayFormat(displayFormatOptions) {
    return (dispatch, getState) => {
        dispatch({
            type: ThresholdConstants.UPDATE_DISPOPTIONS,
            displayFormats: displayFormatOptions
        })
    }
}

export function loadThresholdColumnOptions(query) {
    return (dispatch, getState) => {
        dispatch(getState().notificationStore.clearNotifications());
        dispatch(getState().spinnerStore.BeginTask());
        dataMetricsService.validateQuery(query).then((response) => {
            if (response.data && response.data.Status) {
                dataMetricsService.loadColumns(query).then(function (response) {
                    dispatch(getState().spinnerStore.EndTask());
                    if (response.status === 200) {
                        let columnOptions = _.map(response.data, (item) => {
                            return {
                                label: item.ColumnName,
                                value: item.Id,
                                type: item.DataTypeName
                            }
                        });
                        dispatch({
                            type: ThresholdConstants.UPDATE_THRESHOLD_COLUMN_OPTIONS,
                            columnOptions
                        })
                    }
                })
            }
            else {
                return dispatch(getState().notificationStore.notify(response.data.Messages, ResponseStatusEnum.Error))
            }
        }).catch((error) => {
            dispatch(getState().notificationStore.notify(error.response.data.Messages, ResponseStatusEnum.Error));
            dispatch(getState().spinnerStore.EndTask());
        })
    }
}

export function updateLevel(id, key, value) {
    return (dispatch, getState) => {
        let levels = getState().threshold.levels;
        let level = _.find(levels, (level) => level.id === id);
        level[key] = value;
        dispatch({
            type: ThresholdConstants.UPDATE_LEVEL,
            levels: levels
        })

    }
}

export function handleClick(id) {
    return (dispatch, getState) => {
        let levels = _.map(getState().threshold.levels, (level) => {
            if (level.id == id) {
                return { ...level, expanded: !level.expanded };
            }
            else {
                return level
            }
        });
        dispatch({
            type: ThresholdConstants.HANDLE_CLICK,
            levels: levels
        })
    }
}

/**
 * This method makes a call to API and shows a success message if notifications sent succesfully, error message if notifications fails.
 * @param {*} threshold 
 * @param {*} widgetId 
 */
export function TestThreshold(threshold, widgetId) {
    return (dispatch, getState) => {
        let widgets = getState().dashboard.widgets;
        dispatch(getState().spinnerStore.BeginTask());
        dispatch(getState().notificationStore.clearNotifications());
        let widget = getState().configurations.widget;
        let title = "";
        if (widget.isComboWidget) {
            let comboWidget = _.find(widgets, (w) => w.id === widget.comboId);
            title = comboWidget.title;
        }
        else
            title = widget.title;

        let mappedThreshold = {
            thv: threshold.levelValue,
            thc: threshold.color, // TODO: Pass Color appropriately
            // SoundFilePath: threshold.soundFile, // TODO: Pass sound file appropriately
            thst: threshold.isContinuous ? 1 : 0, // TODO: Create an enum or have a boolean value for isContinuos
            thea: threshold.emailTo,
            thes: threshold.emailSubject,
            thmn: threshold.smsTo
        };
        let inputThreshold = {
            ti: mappedThreshold,
            tiwt: title,
            tidn: getState().dashboard.name
        }
        ThresholdService.testThreshold(inputThreshold).then((response) => {
            dispatch(getState().spinnerStore.EndTask());

            var successMessage = _.map(response.data.Messages, (r) => {
                return {

                    displayMessage: r.Message,
                    normalizedMessage: r.NormalizedMessage
                }
            })

            /**need implement notification functionality*/
            // var successMessage = _.map(response.data.Messages, (r) => {
            //     return {
            //         ResponseType: r.ResponseType,
            //         Message: getState().newdashboard.l.t(r.NormalizedMessage, r.Message)
            //     }
            // })
            // dispatch(getState().notificationStore.ShowNotification({
            //     type: ResponseStatusEnum.Success,
            //     messages: dashboardUtils.returnMessages(successMessage, ResponseStatusEnum.Success)
            // }));

            // var errorMessage = _.map(response.data.Messages, (r) => {
            //     return {
            //         ResponseType: r.ResponseType,
            //         Message: getState().newdashboard.l.t(r.NormalizedMessage, r.Message)
            //     }
            // })

            // let errorResponse = {
            //     type: ResponseStatusEnum.Error,
            //     persistMessages: true,
            //     messages: dashboardUtils.returnMessages(errorMessage, ResponseStatusEnum.Error)
            // };

            // dispatch(getState().notificationStore.ShowNotification(errorResponse));
        }).catch((err) => {
            let errorResponse = {
                type: ResponseStatusEnum.Error,
                persistMessages: false,
                messages: [{ displayMessage: getState().newdashboard.l.t("Some_error_occuredPERIOD", "Some error occured.") }]
            };

            //dispatch(getState().notificationStore.ShowNotification(errorResponse));
            dispatch(getState().spinnerStore.EndTask());
        })

    }
}

export function setIsCopiedForLevel(id) {

    return (dispatch, getState) => {
        let updatedLevels = _.map(getState().threshold.levels, (level) => {
            if (level.id === id) {
                return { ...level, isCopied: true, isPasteEnabled: false };
            }
            else {
                return { ...level, isCopied: false, isPasteEnabled: true };
            }

        });
        dispatch({
            type: ThresholdConstants.UPDATE_LEVEL,
            levels: updatedLevels
        })
    }
}

export function pasteThresholdValues(id) {
    return (dispatch, getState) => {
        let copiedLevel = _.find(getState().threshold.levels, (level) => level.isCopied);
        let updatedLevels = _.map(getState().threshold.levels, (level) => {
            if (level.id == id) {
                level.emailTo = _.cloneDeep(copiedLevel.emailTo);
                level.smsTo = _.cloneDeep(copiedLevel.smsTo);
            }
            level.isCopied = false;
            level.isPasteEnabled = false;
            return level;

        });
        dispatch({
            type: ThresholdConstants.UPDATE_LEVEL,
            levels: updatedLevels
        })
    }
}

/**
     * To remove the levels
     * @param {*} id 
     */
export function removeLevel(id) {
    return (dispatch, getState) => {
        let levels = getState().threshold.levels;
        _.remove(levels, lv => lv.id == id);
        let updatedLevels = _.map(levels, (level, i) => {
            return { ...level, level: i + 1 }
        });
        dispatch({
            type: ThresholdConstants.UPDATE_LEVEL,
            levels: updatedLevels
        })
    }
}

export function addLevels(item) {
    return (dispatch, getState) => {
        let levels = getState().threshold.levels;
        let newLevels = _.map(levels, (level) => {
            return { ...level, expanded: false }
        });
        newLevels = newLevels.concat(item);
        dispatch({
            type: ThresholdConstants.UPDATE_LEVEL,
            levels: newLevels
        })
    }
}

export function updateDisplayFormat(displayFormatId) {
    return (dispatch, getState) => {
        dispatch({
            type: ThresholdConstants.UPDATE_DISPLAY_FORMAT,
            displayFormatId
        })
    }
}

export function addSelectedLevels() {
    return (dispatch, getState) => {
        let threshold = getState().threshold;
        let currentWidget = getState().configurations.widget;
        let thresholds = [...threshold.levels]
        let statisticCategory = getState().dataMetrics.statisticCategory;
        if (currentWidget.isComboWidget) {
            let updatedComboWidget = {};
            let updatedCell = {};
            let basedReal = statisticCategory == StatisticCategoryEnum.RealTime ? { itemId: threshold.item.id, funcId: threshold.func.id, dsId: threshold.displayFormat.id, itemName: threshold.item.label } : undefined
            // if (statisticCategory == StatisticCategoryEnum.RealTime) {
            let comboWidget = _.cloneDeep(_.find(getState().dashboard.widgets, (w) => w.id === currentWidget.comboId));
            let updatedMatrix = _.map(comboWidget.matrix, (row, rowIndex) => {
                return _.map(row, (cell, columnIndex) => {
                    if (currentWidget.isColumnHeader && statisticCategory == StatisticCategoryEnum.RealTime) {

                        if (cell.columnId == currentWidget.columnId)
                            return {
                                ...cell,
                                appliedSettings: {
                                    ...cell.appliedSettings,
                                    thresholds,
                                    basedReal
                                }
                            }
                    }

                    if (currentWidget.id == cell.id) {
                        updatedCell = {
                            ...cell,
                            appliedSettings: {
                                ...cell.appliedSettings,
                                thresholds,
                                basedColumn: statisticCategory == StatisticCategoryEnum.RealTime ? undefined : threshold.basedColumn,
                                basedReal: statisticCategory == StatisticCategoryEnum.RealTime ? basedReal : threshold.basedColumn,
                                basedColumnDisplayFormat: statisticCategory == StatisticCategoryEnum.RealTime ? undefined : threshold.displayFormat,
                            }
                        }
                        return updatedCell;
                    }

                    return cell;
                })
            })
            updatedComboWidget = {
                ...comboWidget,
                matrix: updatedMatrix
            }
            // }
            // else if (threshold.statisticsCategoryId == StatisticCategoryEnum.Custom) {




            //     if (threshold.column)
            //         this.props.addBaseColumn(threshold.column, this.props.widget);
            //     dispatch({
            //         type: ThresholdConstants.ADD_THRESHOLD,
            //         levels: threshold.levels,
            //         widgetId: threshold.widgetId
            //     })
            // }
            dispatch(getState().configurations.applyWidget(updatedCell));
            dispatch(getState().configurations.previewWidget(updatedComboWidget));
        }
        // Other widgets
        else {
            let updatedWidget = {
                ...currentWidget,
                appliedSettings: {
                    ...currentWidget.appliedSettings,
                    thresholds
                }
            }
            dispatch(getState().configurations.previewWidget(updatedWidget));
        }
    }
}


export function clearThresholds() {
    return (dispatch, getState) => {
        let thresholdData = { ...thresholdsInitialState }
        dispatch({
            type: ThresholdConstants.CLEAR_THRESHOLD_DATA,
            thresholdData
        })

    }
}

export function updateBasedColumn(basedColumn) {
    return (dispatch, getState) => {
        dispatch({
            type: ThresholdConstants.UPDATE_THRESHOLD_BASED_COLUMN,
            basedColumn
        })
    }
}

export function updateLevels(levels) {
    return (dispatch, getState) => {
        dispatch({
            type: ThresholdConstants.UPDATE_THRESHOLD_LEVELS,
            levels
        })
    }
}

export function setStatisticItem(item) {
    return (dispatch, getState) => {

        let currentWidget = getState().configurations.widget;
        let metricsData = { ...getState().dataMetrics.dataMetricsMetadata };
        let statisticFuncs = setStatisticFunctions(currentWidget, metricsData, item);
        dispatch({
            type: ThresholdConstants.UPDATE_FUNCOPTIONS,
            statisticFuncs
        })
        dispatch({
            type: ThresholdConstants.UPDATE_STATISTICITEM,
            item
        });

    }
}
export function setStatisticFunction(func) {

    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let metricsData = { ...getState().dataMetrics.dataMetricsMetadata };
        let displayFormats = setDisplayFormats(currentWidget, metricsData, func, getState().threshold.item);
        dispatch({
            type: ThresholdConstants.UPDATE_DISPOPTIONS,
            displayFormats
        })
        dispatch({
            type: ThresholdConstants.UPDATE_STATISTICFUNC,
            func
        })

    }
}
export function setDisplayFormat(displayFormat) {
    
    return (dispatch, getState) => {
        dispatch({
            type: ThresholdConstants.UPDATE_REALTIME_DISPLAYFORMAT,
            displayFormat
        })
    }
}


/**
  * To get the column index based on widget from matrix
  * @param {*} matrix 
  * @param {*} widgetId 
  */
function getColumnIndex(matrix, widgetId) {
    for (var columnIndex = 0; columnIndex < matrix.length; columnIndex++) {
        var widget = matrix[columnIndex];
        if (widget.id === widgetId) {
            return columnIndex;
        }
    }
}

/**
   * To get the column options for combo custom statistics
   * @param {*} widget 
   */
function getColumns(widget, comboWidget) {

    if (!widget.isComboWidget)
        return [];

    if (!comboWidget.appliedSettings.dataMetrics.columnOptions || comboWidget.appliedSettings.dataMetrics.statisticCategory != StatisticsCategory.Custom) {
        return [];
    }

    if (comboWidget.appliedSettings.dataMetrics.levels.length > 0) {
        let colOptions = _.map(comboWidget.appliedSettings.dataMetrics.columnOptions, (col) => {
            var opt = _.find(comboWidget.appliedSettings.dataMetrics.levels, level => _.isEqual(col.label, level.column.label));
            if (opt) {
                col.displayFormatId = Object.keys(opt.displayFormat).length > 0 ? opt.displayFormat.id : opt.displayFormat;
                col.timeFormatId = opt.timeFormat ? Object.keys(opt.timeFormat).length > 0 ? opt.timeFormat.id : opt.timeFormat : undefined;
            }
            else {
                col.displayFormatId = utils.getDisplayFormat(col);
            }
            return col;
        });
        return _.filter(colOptions, col => col);
    }
    return [];
}

/**
 * 
 * @param {*} props 
 */
function getBasedColumn(widget, selectedStatisticCategory, columnOptions) {
    let column = widget.basedColumn ? widget.basedColumn : selectedStatisticCategory == StatisticCategoryEnum.Custom ?
        { label: widget.column, value: widget.id, type: widget.dataType } : undefined
    let selectedColOpt = _.find(columnOptions, opt => opt.label == column.label);
    if (column) {
        column.displayFormatId = selectedColOpt ? selectedColOpt.displayFormatId : DisplayFormatEnum.Text;
        column.timeFormatId = selectedColOpt ? selectedColOpt.timeFormatId : undefined;
    }
    return column;
}

/**
   * Responsible to get displayformat for the current widget
   * @param {*} widget 
   */
function getDisplayFormat(widget, widgets) {

    return DisplayFormatEnum.Number; // temp 

    // For combo cell widgets
    if (widget.isComboWidget) {
        // Combo Custom
        if (widget.column && widget.column != "") {
            if (_.find(Constants.NumericTypes, (type) => type == widget.basedColumn.type)) {
                if (widget.basedColumn.displayFormatId == DisplayFormatEnum.Duration) {
                    let _format = _.find(Constants.customCombotimeFormat, format => format.id == widget.basedColumn.timeFormatId);
                    return _format ? _format.displayFormatId : DisplayFormatEnum.Duration;
                }
                return DisplayFormatEnum.Number;
            }

            if (_.find(Constants.DateTypes, (type) => type == widget.basedColumn.type))
                return DisplayFormatEnum.Date_Time;

            if (widget.basedColumn.type == 'boolean')
                return DisplayFormatEnum.Boolean;

            if (widget.basedColumn.type == 'string')
                return DisplayFormatEnum.Text;

            return widget.displayFormatId;
        }

        // Combo real time headers
        if (widget.isColumnHeader) {
            let comboWidget = _.find(widgets, (w) => w.id === widget.comboId);
            if (!comboWidget) return DisplayFormatEnum.Text;
            let wColumnIndex = getColumnIndex(comboWidget.matrix[0], widget.id);

            if (wColumnIndex && comboWidget.matrix.length > 0) {
                var rowIndex = 1;
                let cWidget = comboWidget.matrix[rowIndex][wColumnIndex];
                return cWidget.settings.displayFormat;
            }
        } else {
            return widget.settings.displayFormat;
        }

    }

    // For non combo widgets with Custom query 
    if (widget.appliedSettings.dataMetrics.query && widget.appliedSettings.dataMetrics.query != "") {
        return widget.appliedSettings.dataMetrics.selectedDisplayFormat;
    }

    // For non combo widgets with real time and cyreport
    if (widget.appliedSettings.dataMetrics.displayFormat) {
        return widget.appliedSettings.dataMetrics.displayFormat.id;
    }
}

/**
   * To get the column index based on widget from matrix
   * @param {*} matrix 
   * @param {*} widgetId 
   */
function getColumnIndex(matrix, widgetId) {
    for (var columnIndex = 0; columnIndex < matrix.length; columnIndex++) {
        var widget = matrix[columnIndex];
        if (widget.id === widgetId) {
            return columnIndex;
        }
    }
}

function setStatisticItems(currentWidget, allData, selectedGroup) {
    return _.uniqBy(_.map(_.filter(allData,
        metric => metric.StatisticGroupId === selectedGroup.id &&
            metric.StatisticCategory === StatisticCategoryEnum.RealTime &&
            metric.WidgetType === currentWidget.widgetType && !metric.IsFilterId),
        item => {
            return {
                id: item.StatisticItemId,
                label: item.StatisticItem,
                value: item.Id
            }
        }), 'id');
}

function setStatisticFunctions(currentWidget, allData, selectedItem) {
    return _.uniqBy(_.map(_.filter(allData,
        metric =>
            metric.StatisticItemId === selectedItem.id &&
            metric.StatisticCategory === StatisticCategoryEnum.RealTime &&
            metric.WidgetType === currentWidget.widgetType),
        item => {
            return {
                id: item.StatisticFunctionId,
                label: item.StatisticFunction,
                value: item.Id
            }
        }), 'id');
}

function setDisplayFormats(currentWidget, allData, selectedFunction, selectedItem) {
    return _.uniqBy(_.map(_.filter(allData, metric =>
        (metric.StatisticItemId === selectedItem.id &&
            metric.StatisticCategory === StatisticCategoryEnum.RealTime &&
            metric.StatisticFunctionId === selectedFunction.id && metric.WidgetType === currentWidget.widgetType)
    ), item => {
        return {
            id: item.DisplayFormatId,
            label: item.DisplayFormat,
            value: item.Id
        }
    }), 'id')
}


