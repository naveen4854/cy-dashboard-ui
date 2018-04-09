import * as ThresholdConstants from './threshold.constants';
import _ from 'lodash';
import { utils } from '../../utilities';
import { ResponseStatusEnum, StatisticCategoryEnum, DisplayFormatEnum, WidgetTypeEnum } from '../../shared/enums';
import { Constants } from '../../shared/constants';
import * as ThresholdService from './threshold-service';

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
        let widget = _.find(widgets, (widget) => widget.id === widgetId);

        if (!widget) { // Below condition is to see if selected widget is within combo

            for (let eachWidget of widgets) {
                if (eachWidget && eachWidget.matrix) {
                    for (let comboRow of eachWidget.matrix) {
                        widget = _.find(comboRow, (comboRowwidget) => comboRowwidget.id === widgetId);
                        if (widget) {
                            widget = eachWidget;
                            break; // once we find the appropriate combo widget, stop searching.
                        }
                    };
                }
            };
        }

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
            tiwt: widget.widgetType == WidgetTypeEnum.Combo ? "Combo Widget" : widget.title, // As of now since combo is not having title, we are just sending title as combo widget.
            tidn: 'Test' //we should pass dashboard name.                 getState().newdashboard.name
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
export function initializeThresholddata() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let selectedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory ?
            currentWidget.appliedSettings.dataMetrics.statisticCategory :
            StatisticCategoryEnum.RealTime
        let widgets = getState().dashboard.widgets;
        let comboWidget = _.find(widgets, wt => wt.id == currentWidget.comboId);
        let columnOptions = getColumns(currentWidget, comboWidget);
        let column = getBasedColumn(currentWidget, selectedStatisticCategory, columnOptions);
        let displayFormat = getDisplayFormat(currentWidget, widgets);
        dispatch({
            type: ThresholdConstants.DEFAULT_THRESHOLD,
            basedColumn: currentWidget.basedColumn || undefined,
            column: column || undefined,
            statisticsCategoryId: selectedStatisticCategory,
            widgetId: currentWidget.id,
            dataType: currentWidget.dataType || undefined,
            columnOptions: columnOptions,
            widgetType: currentWidget.widgetType,
            isComboWidget: currentWidget.isComboWidget,
            displayFormatId: displayFormat,
            isHeader: currentWidget.isHeader,
            comboId: currentWidget.comboId
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
        let thresholds = {
            ...threshold.levels,

        }
        if (threshold.isComboWidget) {
            if (thresholdstatisticsCategoryId == StatisticCategoryEnum.RealTime) {
                if (threshold.isHeader) {
                    let comboWidget = _.find(getState().dashboard.widgets, (w) => w.id === threshold.comboId);
                    let wColumnIndex = this.getColumnIndex(comboWidget.matrix[0], threshold.widgetId);
                    if (wColumnIndex) {
                        for (var rowIndex = 0; rowIndex < comboWidget.matrix.length; rowIndex++) {
                            let cWidget = comboWidget.matrix[rowIndex][wColumnIndex];
                            cWidget.appliedSettings.thresholds = _.cloneDeep(threshold.levels);
                        }
                        //todo: figure out below if clause
                        if (threshold.levels.length == 0) {
                            dispatch({
                                type: ThresholdConstants.ADD_THRESHOLD,
                                levels: threshold.levels,
                                widgetId: threshold.widgetId
                            })
                        }
                        this.props.UpdateWidget(comboWidget);
                    }
                } else {

                    dispatch({
                        type: ThresholdConstants.ADD_THRESHOLD,
                        levels: threshold.levels,
                        widgetId: threshold.widgetId
                    })
                }
            }
            else if (threshold.statisticsCategoryId == StatisticCategoryEnum.Custom) {
                if (threshold.column)
                    this.props.addBaseColumn(threshold.column, this.props.widget);
                dispatch({
                    type: ThresholdConstants.ADD_THRESHOLD,
                    levels: threshold.levels,
                    widgetId: threshold.widgetId
                })
            }
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
        if (widget.isHeader) {
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
