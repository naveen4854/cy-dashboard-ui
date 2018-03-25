"use srtict"
import React from 'react';
import ColorPicker from '../color-picker';
import "../../public/assets/styles/accordion.css"
import ToggleSwitch from "../toggle-switch";
import CustomSelect from '../../components/custom-dropdown';
import CustomDatePicker from '../../components/custom-date-picker';
import MaskedInput from '../../components/masked-input';

import StatisticsCategory from '../../lib/enums/statistic-category.enum';
import WidgetType from '../../lib/enums/widget-type.enum';
import _ from "lodash";
import displayFormatEnum from '../../lib/enums/display-format.enum';
import ResponseStatusEnum from '../../lib/enums/response-status-enum';
import moment from 'moment'
import * as ConstantValues from '../../constants/constantValues'
import * as Utils from '../../utilities/common-utils'
import DurationInput from '../duration-input';

export default class ThresholdTabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
        this.soundFile = null;
        this.testThreshold = this.testThreshold.bind(this);
        this.validateEmailIds = this.validateEmailIds.bind(this);
        this.validateSMS = this.validateSMS.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }

    /**
     * To update the color
     * @param {*} color 
     */
    getSelectedColor(color) {
        this.props.updateLevel(this.state.id, "color", color);
    }

    /**
     * To update the levels based on key and value using ref
     * @param {*} key 
     */
    updateLevel(key) {
        this.props.updateLevel(this.state.id, key, this.refs[key].value);
    }

    /**
     * To update the levels based on key
     * * @param {*} value 
     * * @param {*} key 
     */
    updateLevel(value, key) {
        this.props.updateLevel(this.state.id, key, value);
    }

    /**
     * To update the levels based on key
     * @param {*} val 
     */
    updateDTLevel(val, key) {
        let dt = moment(new Date(+val)).format('MM/DD/YYYY hh:mm A');
        this.props.updateLevel(this.state.id, key, dt);
    }

    updateDuration(val, key) {
        let seconds = Utils.convertToSeconds(val, this.props.displayFormat);
        this.props.updateLevel(this.state.id, key, seconds);
    }

    /**
     * To update the toggle buttons status
     * @param {*} key 
     * @param {*} value 
     */
    updateToogle(key, value) {
        this.props.updateLevel(this.state.id, key, value);
    }
    /**
     * To update the sound files
     * @param {*} key 
     */
    updateSoundFile(key) {
        this.soundFile = this.refs[key].files[0];
        this.props.updateLevel(this.state.id, key, this.refs[key].files[0]);
    }
    /**
     *  This method is used to test threshold functionality
     */
    testThreshold(e) {
        let errors = [];
        errors = errors.concat(this.validateEmailIds(this.props.emailTo));
        errors = errors.concat(this.validateSMS(this.props.smsTo))

        this.props.common.clearNotifications()
        e.stopPropagation();
        if (errors.length != 0) {
            let config = {
                type: ResponseStatusEnum.Error,
                messages: errors
            }
            this.props.common.notify(config)
        }
        else {
            let level = _.find(this.props.threshold.levels, (level) => level.id === this.state.id);
            this.props.TestThreshold(level, this.props.threshold.widget.id)
        }
    }


    validateEmailIds(emailIds) {
        return _.filter(_.map(emailIds, (email, index) => {
            if (!email.Value || email.Value == '')
                return { displayMessage: this.props.l.t('Email_$emailIndex_cannot_be_empty', 'Email ${emailIndex} cannot be empty', { emailIndex: index + 1 }) }
            if (!Utils.validateEmail(email.Value))
                return { displayMessage: this.props.l.t('Email_$emailIndex_is_not_in_correct_format', 'Email ${emailIndex} is not in correct format', { emailIndex: index + 1 }) }
        }), (err) => err)
    }

    validateSMS(smsNumbers) {
        return _.filter(_.map(smsNumbers, (sms, index) => {
            if (!Utils.validateSmsNumer(sms.Value))
                return { displayMessage: this.props.l.t('SMS_$smsIndex_cannot_be_empty', 'SMS ${smsIndex} cannot be empty', { smsIndex: index + 1 }) }
        }), (err) => err);
    }

    /**
     * This method is used to add a text box and updates threshold level accordion based on level ID
     * @param {*} id 
     */
    addEmailTextbox(id) {
        let emails = this.state.emailTo || [];
        let maxKey = _.maxBy(emails, 'Key');
        let newKey = maxKey ? maxKey.Key : 0;
        emails.push({ Value: '', Key: newKey + 1 });
        this.props.updateLevel(this.state.id, 'emailTo', emails);
    }
    /**
    * To update the levels based on key/ text box ID
    * @param {*} key 
    */
    updateEmailTextBox(Key, ref) {
        let emailToAdresses = this.state.emailTo;
        let obj = 0;
        for (obj = 0; obj < emailToAdresses.length; obj++) {
            let eachEmail = emailToAdresses[obj];
            if (eachEmail.Key === Key) {
                eachEmail.Value = this.refs[ref].value;
            }
        }
        this.props.updateLevel(this.state.id, 'emailTo', emailToAdresses);
    }
    /**
     * This method deletes the selected text box based on Key/text box ID
     * @param {*} key 
     */
    deleteEmailTextbox(key) {
        const textBox = _.filter(this.state.emailTo, (emailTo) => emailTo.Key !== key);

        this.props.updateLevel(this.state.id, 'emailTo', textBox);
    }
    /**
    * This method is used to add a text box and updates threshold level accordoin based on level ID
    * @param {*} id 
    */

    addSMSTextbox(id) {
        let sms = this.state.smsTo || [];
        let maxKey = _.maxBy(sms, 'Key');
        let newKey = maxKey ? maxKey.Key : 0;
        sms.push({ Value: '', Key: newKey + 1 });
        this.props.updateLevel(this.state.id, 'smsTo', sms);
    }
    /**
    * To update the levels based on key.
    * @param {*} key 
    */
    updateSMSTextBox(Key, ref) {
        let sms = this.state.smsTo;
        let obj = 0;
        for (obj = 0; obj < sms.length; obj++) {
            let eachSMS = sms[obj];
            if (eachSMS.Key === Key) {
                eachSMS.Value = this.refs[ref].value;
            }
        }
        this.props.updateLevel(this.state.id, 'smsTo', sms);
    }

    /**
     * This method deletes the selected text box based on Key/text box ID
     * @param {*} key 
     */
    deleteSMSTextbox(key) {
        const textBox = _.filter(this.state.smsTo, (smsTo) => smsTo.Key !== key);
        this.props.updateLevel(this.state.id, 'smsTo', textBox);
    }
    setIsCopiedForLevel(id) {
        this.props.setIsCopiedForLevel(id);
    }
    pasteThresholdValues(id) {
        this.props.pasteThresholdValues(id);
    }

    generateDurationFormat(value) {
        let val = 0
        if (!isNaN(value) && value != null)
            val = +value;
        let formatter = _.find(ConstantValues.customCombotimeFormat, f => f.displayFormatId == this.props.displayFormat)
        return formatter ? formatter.convert(val) : 0;
    }

    renderThresholdInput() {
        return (
            <DurationInput
                displayFormatId={this.props.displayFormat}
                value={this.state.levelValue}
                wKey='levelValue'
                enableInput={true}
                updatePropOnChange={this.updateLevel.bind(this)}
            />
        )
    }
    render() {
        return (
            <div className="accordion">
                <div className="accordion-header" style={{ height: 32 }} onClick={this.props.handleClick.bind(this, this.state.id)}>
                    <span className="pull-left rtl-pull-left">{" Level " + this.state.level} </span>
                    {
                        this.state.expanded
                            ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                            : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                    }
                    <i className='fa fa-trash-o pull-right accordion-icon' onClick={(e) => { this.props.removeLevel(); e.stopPropagation(); }} ></i>

                    <div className="row">
                        <div className="pull-right rtl-pull-right">
                            <button type="button" disabled={this.props.emailTo.length == 0 && this.props.smsTo.length == 0} className="btn btn-primary btn-sm" onClick={this.testThreshold}>{this.props.l.t('Test', 'Test')}</button>
                        </div>
                    </div>
                </div>
                <div className={(this.state.expanded) ? "fade-out active" : "fade-in active"}>
                    {
                        (this.state.expanded) &&
                        <div className="accordion-form-group">
                            <div className="row">
                                <div className="col-xs-4 col-sm-3 hidden-lg pull-right rtl-pull-right">
                                    <span title="Copy" className="fontSize20 paddingRight10 rtl-paddingRight10">
                                        <i className="fa fa-copy pointer" aria-hidden="true" onClick={this.setIsCopiedForLevel.bind(this, this.state.id)}></i>
                                    </span>
                                    <span title="Paste" className="fontSize20">
                                        <i className={this.state.isPasteEnabled ? "fa fa-paste pointer" : "fa fa-paste  text-disabled"}

                                            disabled={!this.state.isPasteEnabled} aria-hidden="true"
                                            onClick={this.state.isPasteEnabled ? this.pasteThresholdValues.bind(this, this.state.id) : null}>
                                        </i>
                                    </span>
                                </div>
                                <div className="col-xs-12 col-sm-9 col-lg-6">
                                    <div className="row margin_bottom3">
                                        <div className="col-xs-5 col-lg-3 text-right rtl-text-right">
                                            <span className="pull-right rtl-pull-right"> {this.props.l.t('When_it_reaches_COLON', 'When it reaches:')} </span>
                                        </div>
                                        <div className="col-xs-7 col-lg-9">
                                            {
                                                this.renderThresholdInput()
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-9 col-lg-6">
                                    <div className="row">
                                        <div className="col-xs-5 col-lg-3">
                                            <span className="pull-right rtl-pull-right"> {this.props.l.t('Color_COLON', 'Color:')}  </span>
                                        </div>
                                        <div className="col-xs-7 col-lg-5">
                                            <ColorPicker id="1" className="form-control" key="1" value={this.state.color} updateColor={this.getSelectedColor.bind(this)} />
                                        </div>
                                        <div className="col-lg-4 hidden-md hidden-sm hidden-xs pull-right text-right">
                                            <span title="Copy" className="fontSize20 paddingRight10">
                                                <i className="fa fa-copy pointer" aria-hidden="true" onClick={this.setIsCopiedForLevel.bind(this, this.state.id)}></i>
                                            </span>
                                            <span title="Paste" className="fontSize20 paddingRight5">
                                                <i className={this.state.isPasteEnabled ? "fa fa-paste pointer" : "fa fa-paste  text-disabled"}

                                                    disabled={!this.state.isPasteEnabled} aria-hidden="true"
                                                    onClick={this.state.isPasteEnabled ? this.pasteThresholdValues.bind(this, this.state.id) : null}>
                                                </i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row margin_bottom3">
                                <div className="col-xs-12 col-sm-9 col-lg-6">
                                    <div className="row">

                                        <div className="col-xs-5  col-lg-3 text-right  rtl-text-right">
                                            <span className="pull-right rtl-pull-right"> {this.props.l.t('Email_subject_COLON', 'Email subject:')} </span>
                                        </div>
                                        <div className="col-xs-7 col-lg-9">
                                            <input type='text' value={this.state.emailSubject} ref="emailSubject" className="form-control" onChange={this.updateLevel.bind(this, 'emailSubject')} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-9 col-lg-6">
                                    <div className="row">
                                        <div className="col-xs-5 col-lg-3 text-right  rtl-text-right">
                                            <span className="pull-right rtl-pull-right"> {this.props.l.t('Email_to_COLON', 'Email to:')} </span>
                                        </div>
                                        <div className="col-xs-7 col-lg-9">
                                            <div className="row no-gutter">
                                                {
                                                    _.map(this.props.emailTo, (email, i) => (
                                                        <div key={i} className="col-xs-9 col-lg-11">
                                                            <div className="row">
                                                                <div className="col-xs-9 col-lg-10 marginTop_0px">
                                                                    <input type='email' className="form-control" value={email ? email.Value : ''} ref={`EValue${email.Key}`} onChange={this.updateEmailTextBox.bind(this, email.Key, `EValue${email.Key}`)} />
                                                                </div>
                                                                <span className="fontSize20">
                                                                    <i title="Delete Email" className='fa fa-times-circle pointer' onClick={this.deleteEmailTextbox.bind(this, email.Key)}></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                <div className="col-xs-1 fontSize20 ">
                                                    <i title="Add Email" className="fa fa-plus-circle pointer" onClick={this.addEmailTextbox.bind(this, this.state.id)}> </i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-9 col-xs-12">
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-5 col-xs-5 text-right rtl-text-right">
                                            <span className="pull-right rtl-pull-right"> {this.props.l.t('SMS_to_COLON', 'SMS to:')} </span>
                                        </div >
                                        <div className="col-lg-9 col-sm-7 col-xs-7 ">
                                            <div className="row no-gutter">
                                                {
                                                    _.map(this.props.smsTo, (sms, i) => (
                                                        <div key={i} className="col-lg-11 col-sm-9 col-xs-9" >
                                                            <div className="row">
                                                                <div className="col-lg-10 col-xs-9 marginTop_0px">
                                                                    <input type='text' className="form-control" value={sms ? sms.Value : ''} ref={`SValue${sms.Key}`} onChange={this.updateSMSTextBox.bind(this, sms.Key, `SValue${sms.Key}`)} />
                                                                </div>
                                                                <span className="fontSize20">
                                                                    <i title="Delete SMS" className='fa fa-times-circle pointer' onClick={this.deleteSMSTextbox.bind(this, sms.Key)}></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                <div className="col-xs-1 fontSize20" >
                                                    <i title="Add SMS" className="fa fa-plus-circle pointer" onClick={this.addSMSTextbox.bind(this, this.state.id)}> </i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }


}
