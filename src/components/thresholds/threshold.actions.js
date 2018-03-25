import * as ThresholdConstants from './threshold.constants';
import _ from 'lodash';
import { utils } from '../../utilities';
import { StatisticCategoryEnum } from '../../shared/enums';


export function updateLevel(id, key, value) {
    return (dispatch, getState) => {
        let levels = getState().threshold.levels;
        let level = _.find(levels, (level) => level.id === id);
        level[key] = value;
        dispatch({
            type: ThresholdConstants.UPDATE_LEVELS,
            levels: levels
        })

    }
}

export function handleClick(id) {
    return (dispatch, getState) => {
        const level = _.find(getState().threshold.levels, (level) => level.id === id);
        level.expanded = !level.expanded;
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
        let widgets = getState().newdashboard.widgets;
        dispatch(getState().spinnerStore.BeginTask());
        dispatch(getState().notificationStore.ClearNotifications());
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
            tiwt: widget.widgetType == WidgetType.Combo ? "Combo Widget" : widget.title, // As of now since combo is not having title, we are just sending title as combo widget.
            tidn: getState().newdashboard.name
        }

        dashboardService.testThreshold(inputThreshold).then((response) => {
            dispatch(getState().spinnerStore.EndTask());

            var successMessage = _.map(response.data.Messages, (r) => {
                return {
                    ResponseType: r.ResponseType,
                    Message: getState().newdashboard.l.t(r.NormalizedMessage, r.Message)
                }
            })
            dispatch(getState().notificationStore.ShowNotification({
                type: ResponseStatusEnum.Success,
                messages: dashboardUtils.returnMessages(successMessage, ResponseStatusEnum.Success)
            }));

            var errorMessage = _.map(response.data.Messages, (r) => {
                return {
                    ResponseType: r.ResponseType,
                    Message: getState().newdashboard.l.t(r.NormalizedMessage, r.Message)
                }
            })

            let errorResponse = {
                type: ResponseStatusEnum.Error,
                persistMessages: true,
                messages: dashboardUtils.returnMessages(errorMessage, ResponseStatusEnum.Error)
            };

            dispatch(getState().notificationStore.ShowNotification(errorResponse));
        }).catch((err) => {
            let errorResponse = {
                type: ResponseStatusEnum.Error,
                persistMessages: false,
                messages: [{ displayMessage: getState().newdashboard.l.t("Some_error_occuredPERIOD", "Some error occured.") }]
            };

            dispatch(getState().notificationStore.ShowNotification(errorResponse));
            dispatch(getState().spinnerStore.EndTask());
        })

    }
}



export function setIsCopiedForLevel(id) {

    return (dispatch, getState) => {
        let updatedLevels = _.map(getState().levels, (level) => {
            if (level.id === id) {
                level.isCopied = true;
                level.isPasteEnabled = false;
                return level;
            }
            else {
                level.isCopied = false;
                level.isPasteEnabled = true;
                return level;
            }

        });
        dispatch({
            type: ThresholdConstants.UPDATE_LEVELS,
            levels: updatedLevels
        })
    }
}


export function pasteThresholdValues(id) {
    return (dispatch, getState) => {
        let selectedLevelId = this.state.selectedLevelId;
        let copiedLevel = _.find(getState().threshold.levels, (level) => level.isCopied);


        let updatedLevels = _.map(getState().threshold.levels, (level) => {
            if (level.id == id) {
                level.emailTo = _.clone(copiedLevel.emailTo);
                level.smsTo = _.clone(copiedLevel.smsTo);
            }
            level.isCopied = false;
            level.isPasteEnabled = false;
            return level;

        });
        dispatch({
            type: ThresholdConstants.UPDATE_LEVELS,
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
        let lvl = _.find(getState().threshold.levels, (level) => level.id == id)
        let notifyMessage = { displayMessage: this.props.l.t('Are_you_sure_you_want_to_delete_Level__threshold?', 'Are you sure you want to delete Level ${levelNumber} threshold?', { levelNumber: lvl.level }) };
        const configs = {
            type: ResponseStatusEnum.Confirmation,
            messages: [notifyMessage],
            func: {
                onOk: () => {
                    const levels = _.filter(this.state.levels, (level) => level.id !== id);
                    let newLevel = 1;
                    _.map(levels, (oldLevel) => oldLevel.level = newLevel++);
                    dispatch({
                        type: ThresholdConstants.UPDATE_LEVELS,
                        levels: updatedLevels
                    })
                },
                onCancel: () => { }
            }
        }
        getState().common.deleteConfirmation(configs)

    }
}
export function initializeThresholddata() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let selectedStatisticCategory = currentWidget.appliedSettings.dataMetrics.statisticCategory ?
            currentWidget.appliedSettings.dataMetrics.statisticCategory :
            StatisticCategoryEnum.RealTime
        let comboWidget = _.find(getState().dashboard.widgets, wt => wt.id == currentWidget.comboId);
        let columnOptions = getColumns(currentWidget, comboWidget);
        dispatch({
            type: ThresholdConstants.DEFAULT_THRESHOLD,
            basedColumn: currentWidget.basedColumn || undefined,
            column: currentWidget.column || undefined,
            statisticsCategoryId: selectedStatisticCategory,
            widgetId: currentWidget.id,
            dataType: currentWidget.dataType || undefined,
            columnOptions: columnOptions
        })
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