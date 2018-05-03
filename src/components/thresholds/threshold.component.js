"use srtict"
import React, { Component, PureComponent } from 'react';
import _ from 'lodash';
import ThresholdAccordionContainer from './threshold-accordion';
import * as Color from '../../shared/lib/color-conversion';
import WidgetType from '../../shared/enums/widget-type.enum';
import CustomSelect from '../custom-dropdown';
import { Constants } from '../../shared/constants';
import { utils } from '../../utilities';
import { StatisticCategoryEnum, ResponseStatusEnum, DisplayFormatEnum } from '../../shared/enums';


export default class ThresholdTab extends PureComponent {
    constructor(props) {
        super(props);
        this.validateEmailIds = this.validateEmailIds.bind(this);
        this.validateThresholds = this.validateThresholds.bind(this);
        this.addSelectedLevels = this.addSelectedLevels.bind(this);
        this.addLevels = this.addLevels.bind(this);
        this.getDisplayFormat = this.getDisplayFormat.bind(this);
        this.onDisplayFormatChange = this.onDisplayFormatChange.bind(this);
        this.onStatisticItemChange = this.onStatisticItemChange.bind(this);
        this.onStatisticFunctionChange = this.onStatisticFunctionChange.bind(this);
    }

    /**
     * To add the selected levels to threshold list and to update the based on column.
     */
    addSelectedLevels() {
        let errors = [];
        let { basedColumn } = this.props.threshold
        let _displayFormat = this.getDisplayFormat(basedColumn);
        if (!_displayFormat)
            errors.push({ displayMessage: this.props.l.t('Display_format_is_not_set_in_Data_MetricsPERIOD', 'Display format is not set in Data Metrics.') });

        errors = errors.concat(this.validateEmailIds());

        let thresholdErrors = this.validateThresholds(this.props.threshold.levels, _displayFormat)
        if (thresholdErrors)
            errors = errors.concat(thresholdErrors);

        this.props.common.clearNotifications()
        if (errors.length != 0) {
            let config = {
                type: ResponseStatusEnum.Error,
                messages: errors
            }
            this.props.common.notify(errors, ResponseStatusEnum.Error)
            return
        }

        this.props.addSelectedLevels();

    }

    validateEmailIds() {
        let invalidLevels = _.filter(this.props.threshold.levels, (level) => _.filter(level.emailTo, (email) => !utils.validateEmail(email.Value)).length > 0);
        return _.map(invalidLevels, (lvl) => { return { displayMessage: `Level ${lvl.level}:${this.props.l.t('Email_is_empty_or_not_in_correct_format', 'Email is empty or not in correct format')}` } });
    }

    validateSmsIds() {
        let invalidLevels = _.filter(this.props.threshold.levels, (level) => _.filter(level.smsTo, (email) => !utils.validateSmsNumer(sms.Value)).length > 0);
        return _.map(invalidLevels, (lvl) => { return { displayMessage: `Level ${lvl.level}: ${this.props.l.t('SMS_number_is_not_in_correct_format', 'SMS number is not in correct format')}` } });
    }

    /**
     * Responsible to get displayformat for the current widget
     * @param {*} widget 
     * @param {*} basedColumn //required for custom combo
     */
    getDisplayFormat(basedColumn) {
        const { displayFormat, threshold, statisticCategory, isComboWidget } = this.props;
        let displayFormatId = DisplayFormatEnum.Text;
        if (isComboWidget && statisticCategory == StatisticCategoryEnum.Custom) {

            if (_.find(Constants.NumericTypes, (type) => type == basedColumn.type)) {
                if (basedColumn.displayFormatId == DisplayFormatEnum.Duration) {
                    let _format = _.find(Constants.customCombotimeFormat, format => format.id == basedColumn.timeFormatId);
                    return _format ? _format.displayFormatId : DisplayFormatEnum.Duration;
                }
                return DisplayFormatEnum.Number;
            }

            if (_.find(Constants.DateTypes, (type) => type == basedColumn.type))
                return DisplayFormatEnum.Date_Time;

            if (basedColumn.type == 'boolean')
                return DisplayFormatEnum.Boolean;

            if (basedColumn.type == 'string')
                return DisplayFormatEnum.Text;

            return this.props.displayFormat ? this.props.displayFormat.id : DisplayFormatEnum.Text;

        } else if (isComboWidget && statisticCategory == StatisticCategoryEnum.RealTime) {
            return this.props.threshold.displayFormat.id;
        }
        else {
            displayFormatId = this.props.displayFormat ? this.props.displayFormat.id : DisplayFormatEnum.Text;
        }

        return displayFormatId;

        // For combo cell widgets
        if (this.props.threshold.isComboWidget) {
            // Combo Custom
            if (this.props.threshold.column && this.props.threshold.column != "") {
                if (_.find(Constants.NumericTypes, (type) => type == basedColumn.type)) {
                    if (basedColumn.displayFormatId == DisplayFormatEnum.Duration) {
                        let _format = _.find(Constants.customCombotimeFormat, format => format.id == basedColumn.timeFormatId);
                        return _format ? _format.displayFormatId : DisplayFormatEnum.Duration;
                    }
                    return DisplayFormatEnum.Number;
                }

                if (_.find(Constants.DateTypes, (type) => type == basedColumn.type))
                    return DisplayFormatEnum.Date_Time;

                if (basedColumn.type == 'boolean')
                    return DisplayFormatEnum.Boolean;

                if (basedColumn.type == 'string')
                    return DisplayFormatEnum.Text;

                return this.props.threshold.displayFormatId;
            }

            // Combo real time headers
            if (widget.isColumnHeader) {
                let comboWidget = _.cloneDeep(_.find(this.props.newDashboard.widgets, (w) => w.id === this.props.widget.comboId));
                if (!comboWidget) return DisplayFormatEnum.Text;
                let wColumnIndex = this.getColumnIndex(comboWidget.matrix[0], this.props.widget.id);

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

    validateThresholds(levels, displayFormat) {
        let errors = [];
        // number formats
        if (_.find(Constants.IntegerDisplayFormats, (format) => format == displayFormat)) {
            _.forEach(levels, (level) => {
                if (isNaN(parseInt(level.levelValue)))
                    errors.push({ displayMessage: this.props.l.t('Level_$levelNumber_Entered_threshold_value_is_not_validPERIOD__Threshold_value_should_be_in_same_format_as_SINGLEQUOTEDisplay_FormatSINGLEQUOTE_PERIOD', 'Level ${levelNumber} Entered threshold value is not valid. (Threshold value should be in same format as \'Display Format\').', { levelNumber: level.level }) })
            })
        }
        // dateformat
        if (DisplayFormatEnum.Date_Time == displayFormat) {
            _.forEach(levels, (level) => {
                if (!level.levelValue || level.levelValue == '' || level.levelValue == "01/01/1970 05:30 AM") {
                    errors.push({ displayMessage: this.props.l.t('Level_$levelNumber_Threshold_value_cannot_be_emptyPERIOD', 'Level ${levelNumber} Threshold value cannot be empty.', { levelNumber: level.level }) })
                    return
                }

                if (isNaN(Date.parse(level.levelValue)))
                    errors.push({ displayMessage: this.props.l.t('Level_$levelNumber_Entered_threshold_value_is_not_validPERIOD__Threshold_value_should_be_in_same_format_as_SINGLEQUOTEDisplay_FormatSINGLEQUOTE_PERIOD', 'Level ${levelNumber} Entered threshold value is not valid. (Threshold value should be in same format as \'Display Format\').', { levelNumber: level.level }) })
            })
        }

        //Duration format 
        if (DisplayFormatEnum.Duration == displayFormat) {
            let format = _.find(Constants.customCombotimeFormat, f => f.id == this.props.threshold.column.timeFormatId)
            _.forEach(levels, (level) => {
                if (isNaN(parseInt(level.levelValue)))
                    errors.push({ displayMessage: this.props.l.t('Level_$levelNumber_Entered_threshold_value_is_not_validPERIOD__Threshold_value_should_be_in_same_format_as_SINGLEQUOTEDisplay_FormatSINGLEQUOTE_PERIOD', 'Level ${levelNumber} Entered threshold value is not valid. (Threshold value should be in same format as \'Display Format\').', { levelNumber: level.level }) })
            })
        }

        // string format
        // boolean format
        return errors
    }

    /**
     * To add the levels
     */
    addLevels() {
        var arrayCount = this.props.threshold.levels.length || 0;
        let copiedLevel = _.find(this.props.threshold.levels, (level) => level.isCopied);
        let { basedColumn } = this.props.threshold
        var item = {
            id: Date.now(),
            level: arrayCount + 1,
            levelValue: this.getDefaultThresholdValue(this.getDisplayFormat(basedColumn)),
            color: Color.getRandomColor(),
            soundFile: {},
            isContinuous: false,
            emailTo: [{ Value: '', Key: 1 }],
            smsTo: [{ Value: '', Key: 1 }],
            emailSubject: this.props.l.t('AlertCOLON_Threshold_Level_has_been_reachedPERIOD', 'Alert: Threshold Level has been reached.'),
            column: this.props.threshold.column,
            expanded: true,
            isPasteEnabled: copiedLevel ? true : false,
            isCopied: false,
        };

        this.props.addLevels(item);
    }

    /**
     * get default threshold values based on display format
     * @param {*} displayFormatId 
     */
    getDefaultThresholdValue(displayFormatId, value) {
        switch (displayFormatId) {
            case (DisplayFormatEnum.Boolean):
                if (!value)
                    return "True";
                if (value != "True" && value != 'False')
                    return "True";
                return value;
            case (DisplayFormatEnum.Date_Time):
                if (isNaN(Date.parse(value)))
                    return new Date();
                return value;
            case (DisplayFormatEnum.Number):
            case (DisplayFormatEnum.Duration):
                if (isNaN(parseInt(value)))
                    return 0;
                return value;
            default:
                return '';
        }
    }

    /**
     * To set the selected column for the column option drop down
     * @param {*} basedColumn 
     */
    onColumnChange(basedColumn) {
        //update levels and basedcolumn
        let displayFormatId = this.getDisplayFormat(basedColumn);
        let levels = _.map(this.props.threshold.levels, (lvl) => {
            lvl.levelValue = this.getDefaultThresholdValue(displayFormatId, lvl.levelValue)
            return lvl;
        })
        this.props.updateBasedColumn(basedColumn);
        this.props.updateLevels(levels)
    }
    onStatisticItemChange(item) {
        if (item)
            this.props.setStatisticItem(item);
    }
    onStatisticFunctionChange(func) {
        this.props.setStatisticFunction(func);
    }
    onDisplayFormatChange(displayFormat) {
        
        this.props.setDisplayFormat(displayFormat);
    }
    render() {
        let { threshold, statisticCategory } = this.props;
        debugger;
        let displayFormatId = this.getDisplayFormat(threshold.basedColumn);
        return (
            <div id='tabContentArea' className='margin20'>
                <div className='row'>
                    <div className='col-xs-6' >
                        <button type="button" className="btn btn-primary rtl-pull-left pull-left " onClick={this.addLevels} >
                            <i className="fa fa-plus"> </i>
                            &nbsp;{this.props.l.t('New_Threshold', 'New Threshold')}
                        </button>
                    </div>
                    <div className='col-xs-6 pull-right rtl-pull-right text-right rtl-text-right'>
                        <button type="button" className="btn btn-primary" onClick={this.addSelectedLevels} >
                            {this.props.l.t('Apply', 'Apply')}
                        </button>
                    </div>
                </div>
                                    options={threshold.columnOptions} placeholder='Select...'
                <div className="calculatedVH">
                    {this.props.isComboWidget &&
                        <div>
                            {


                                (this.props.isComboWidget && threshold.basedColumn && statisticCategory == StatisticCategoryEnum.Custom) ?
                                    <div className="row paddingTop10">
                                        <div className="col-md-4 col-md-offset-2">
                                            <div className="form-group">
                                                <label className="control-label inline"> {this.props.l.t('Based_on_columnCOLON', 'Based on column:')} </label>
                                                <div className="row">
                                                    <div className="col-md-10 col-lg-12">
                                                        <CustomSelect name="field-group-options form-control"
                                                            value={threshold.basedColumn || threshold.columnOptions[0]}
                                                            options={threshold.columnOptions} placeholder='Select...'
                                                            onChange={(e) => this.onColumnChange(e)} />

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label inline"> {this.props.l.t('Display_Format', 'Display Format')} </label>
                                                <div className="row">
                                                    <div className="col-md-10 col-lg-12">
                                                        <CustomSelect name="field-group-options form-control"
                                                            value={threshold.displayFormat || threshold.displayFormatOptions[0]}
                                                            options={threshold.displayFormatOptions} placeholder='Select...'
                                                            onChange={(e) => this.onDisplayFormatChange(e)} />

                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div> : <fieldset><legend>Based on column</legend>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>{this.props.l.t('Statistic_Item', 'Statistic Item')}</label>
                                                    <div className="row">
                                                        <div className="col-md-10 col-lg-12">
                                                            <CustomSelect name="field-item-options"
                                                                placeholder='Select...'
                                                                value={this.props.threshold.item}
                                                                onChange={this.onStatisticItemChange}
                                                                options={this.props.threshold.statisticItems}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>{this.props.l.t('Aggregate_Function', 'Aggregate Function')}</label>
                                                    <div className="row">
                                                        <div className="col-md-10 col-lg-12">
                                                            <CustomSelect name="field-function-options"

                                                                value={this.props.threshold.func}
                                                                placeholder='Select...'
                                                                options={this.props.threshold.functionOptions}
                                                                onChange={this.onStatisticFunctionChange}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>{this.props.l.t('Display_Format', 'Display Format')}</label>
                                                    <div className="row">
                                                        <div className="col-md-10 col-lg-12">
                                                            <CustomSelect name="field-display-format-options"
                                                                value={this.props.threshold.displayFormat}
                                                                placeholder='Select...'
                                                                options={this.props.threshold.displayFormatOptions}
                                                                onChange={this.onDisplayFormatChange}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </fieldset>

                            }
                        </div>
                    }
                    <ThresholdAccordionContainer displayFormatId={displayFormatId} />
                </div>
                }
                </div>
        )
    }
}

