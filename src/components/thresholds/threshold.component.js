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

    }


    /**
     * To add the selected levels to threshold list and to update the based on column.
     */
    addSelectedLevels() {
        let errors = [];
        let _displayFormat = this.props.threshold.displayFormatId;
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
            if (widget.isHeader) {
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
        var item = {
            id: Date.now(),
            level: arrayCount + 1,
            levelValue: this.getDefaultThresholdValue(this.props.threshold.displayFormat),
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
     * @param {*} e 
     */
    onColumnChange(e) {
        let displayFormat = this.getDisplayFormat(e);
        let levels = _.map(this.state.levels, (lvl) => {
            lvl.levelValue = this.getDefaultThresholdValue(displayFormat, lvl.levelValue)
            return lvl
        })

        this.setState({
            column: e,
            displayFormat,
            levels
        })
    }

    render() {
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

                {(this.props.statisticsCategoryId == StatisticCategoryEnum.Custom && this.props.widget.isComboWidget) &&
                    <div className="row paddingTop10">
                        <div className="col-xs-6 col-md-5 col-lg-3 col-lg-offset-2 labelContent text-right rtl-text-right">
                            <label className="control-label inline"> {this.props.l.t('Based_on_columnCOLON', 'Based on column:')} </label>
                        </div>
                        <div className='col-xs-6 col-md-5 col-lg-4'>
                            <CustomSelect name="field-group-options form-control"
                                disabled={!(this.state.levels && this.state.levels.length > 0)}
                                value={this.props.columnOptions && this.props.columnOptions.length == 1 ? this.props.columnOptions[0] : this.state.column}
                                options={this.props.columnOptions} placeholder='Select...'
                                onChange={(e) => this.onColumnChange(e)} />
                        </div>
                    </div>
                }

                <ThresholdAccordionContainer />
            </div>
        )
    }
}

