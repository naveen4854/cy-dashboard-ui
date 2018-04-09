"use srtict"
import React, { PureComponent } from 'react';
import ColorPicker from '../../color-picker';
import '../../../public/assets/styles/accordion.css';
import ToggleSwitch from "../../toggle-switch";
import CustomSelect from '../../custom-dropdown';
import CustomDatePicker from '../../custom-date-picker';
import MaskedInput from '../../masked-input';
import { ResponseStatusEnum } from '../../../shared/enums';
import { Constants } from '../../../shared/constants'
import { utils } from '../../../utilities'
import DurationInput from '../../duration-input';
import _ from "lodash";
import moment from 'moment'

export default class ThresholdTabContent extends PureComponent {
    constructor(props) {
        super(props);
        this.soundFile = null;
        this.testThreshold = this.testThreshold.bind(this);
        this.validateEmailIds = this.validateEmailIds.bind(this);
        this.validateSMS = this.validateSMS.bind(this);
        this.removeLeveConfiramtion = this.removeLeveConfiramtion.bind(this, this.props.id);
        this.setIsCopiedForLevel = this.setIsCopiedForLevel.bind(this, this.props.id);
        this.pasteThresholdValues = this.pasteThresholdValues.bind(this, this.props.id);
        this.updateLevel = this.updateLevel.bind(this);
        this.getSelectedColor = this.getSelectedColor.bind(this);
        this.addEmailTextbox = this.addEmailTextbox.bind(this);
        this.addSMSTextbox = this.addSMSTextbox.bind(this);
    }


    /**
     * To update the color
     * @param {*} color 
     */
    getSelectedColor(color) {
        this.props.updateLevel(this.props.id, "color", color);
    }


    /**
     * To update the levels based on key
     * * @param {*} value 
     * * @param {*} key 
     */
    updateLevel(value, key) {
        this.props.updateLevel(this.props.id, key, value);
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

            this.props.common.notify(errors, ResponseStatusEnum.Error, true);
        }
        else {
            let level = _.find(this.props.threshold.levels, (level) => level.id === this.props.id);
            this.props.TestThreshold(level, this.props.threshold.widgetId)
        }
    }


    validateEmailIds(emailIds) {
        return _.filter(_.map(emailIds, (email, index) => {
            if (!email.Value || email.Value == '')
                return { displayMessage: this.props.l.t('Email_$emailIndex_cannot_be_empty', 'Email ${emailIndex} cannot be empty', { emailIndex: index + 1 }) }
            if (!utils.validateEmail(email.Value))
                return { displayMessage: this.props.l.t('Email_$emailIndex_is_not_in_correct_format', 'Email ${emailIndex} is not in correct format', { emailIndex: index + 1 }) }
        }), (err) => err)
    }

    validateSMS(smsNumbers) {
        return _.filter(_.map(smsNumbers, (sms, index) => {
            if (!utils.validateSmsNumer(sms.Value))
                return { displayMessage: this.props.l.t('SMS_$smsIndex_cannot_be_empty', 'SMS ${smsIndex} cannot be empty', { smsIndex: index + 1 }) }
        }), (err) => err);
    }

    /**
     * This method is used to add a text box and updates threshold level accordion based on level ID
     * @param {*} id 
     */
    addEmailTextbox(id) {
        let emails = this.props.emailTo || [];
        let maxKey = _.maxBy(emails, 'Key');
        let newKey = maxKey ? maxKey.Key : 0;
        emails.push({ Value: '', Key: newKey + 1 });
        this.props.updateLevel(this.props.id, 'emailTo', emails);
    }
    /**
    * To update the levels based on key/ text box ID
    * @param {*} key 
    */
    updateEmailTextBox(Key, ref) {
        let emailToAdresses = this.props.emailTo;
        let obj = 0;
        for (obj = 0; obj < emailToAdresses.length; obj++) {
            let eachEmail = emailToAdresses[obj];
            if (eachEmail.Key === Key) {
                eachEmail.Value = this.refs[ref].value;
            }
        }
        this.props.updateLevel(this.props.id, 'emailTo', emailToAdresses);
    }
    /**
     * This method deletes the selected text box based on Key/text box ID
     * @param {*} key 
     */
    deleteEmailTextbox(key) {
        const textBox = _.filter(this.props.emailTo, (emailTo) => emailTo.Key !== key);
        this.props.updateLevel(this.props.id, 'emailTo', textBox);
    }

    addSMSTextbox() {
        let sms = this.props.smsTo || [];
        let maxKey = _.maxBy(sms, 'Key');
        let newKey = maxKey ? maxKey.Key : 0;
        sms.push({ Value: '', Key: newKey + 1 });
        this.props.updateLevel(this.props.id, 'smsTo', sms);
    }
    /**
    * To update the levels based on key.
    * @param {*} key 
    */
    updateSMSTextBox(Key, ref) {
        let sms = this.props.smsTo;
        let obj = 0;
        for (obj = 0; obj < sms.length; obj++) {
            let eachSMS = sms[obj];
            if (eachSMS.Key === Key) {
                eachSMS.Value = this.refs[ref].value;
            }
        }
        this.props.updateLevel(this.props.id, 'smsTo', sms);
    }

    /**
     * This method deletes the selected text box based on Key/text box ID
     * @param {*} key 
     */
    deleteSMSTextbox(key) {
        const textBox = _.filter(this.props.smsTo, (smsTo) => smsTo.Key !== key);
        this.props.updateLevel(this.props.id, 'smsTo', textBox);
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
        let formatter = _.find(Constants.customCombotimeFormat, f => f.displayFormatId == this.props.displayFormat)
        return formatter ? formatter.convert(val) : 0;
    }

    renderThresholdInput() {
        return (
            <DurationInput
                displayFormatId={this.props.displayFormat}
                value={this.props.levelValue}
                wKey='levelValue'
                enableInput={true}
                updatePropOnChange={this.updateLevel}
            />
        )
    }

    handleClick = () => {
        this.props.handleClick(this.props.id);
    }
    removeLevel(id) {
        this.props.removeLevel(id);
    }
    removeLeveConfiramtion(id, e) {
        let notifyMessage = this.props.l.t('Are_you_sure_you_want_to_delete_Level__threshold?', 'Are you sure you want to delete Level ${levelNumber} threshold?', { 'levelNumber': this.props.level })
        let buttons = [
            {
                text: 'Yes',
                handler: () => this.removeLevel(id)
            },
            {
                text: 'No',
                handler: () => { }
            }]

        //  this.removeLevel(id);
        this.props.common.confirm(notifyMessage, buttons);
        e.stopPropagation();
    }
    render() {
        return (
            <div className="accordion">
                <div className="accordion-header" style={{ height: 32 }} onClick={this.handleClick}>
                    <span className="pull-left rtl-pull-left">{" Level " + this.props.level} </span>
                    {
                        this.props.expanded
                            ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                            : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                    }
                    <i className='fa fa-trash-o pull-right accordion-icon' onClick={this.removeLeveConfiramtion} ></i>

                    <div className="row">
                        <div className="pull-right rtl-pull-right">
                            <button type="button" disabled={this.props.emailTo.length == 0 && this.props.smsTo.length == 0} className="btn btn-primary btn-sm" onClick={this.testThreshold}>{this.props.l.t('Test', 'Test')}</button>
                        </div>
                    </div>
                </div>
                <div className={(this.props.expanded) ? "fade-out active" : "fade-in active"}>
                    {
                        (this.props.expanded) &&
                        <div className="accordion-form-group">
                            <div className="row">
                                <div className="col-xs-4 col-sm-3 hidden-lg pull-right rtl-pull-right">
                                    <span title="Copy" className="fontSize20 paddingRight10 rtl-paddingRight10">
                                        <i className="fa fa-copy pointer" aria-hidden="true" onClick={this.setIsCopiedForLevel}></i>
                                    </span>
                                    <span title="Paste" className="fontSize20">
                                        <i className={this.props.isPasteEnabled ? "fa fa-paste pointer" : "fa fa-paste  text-disabled"}

                                            disabled={!this.props.isPasteEnabled} aria-hidden="true"
                                            onClick={this.props.isPasteEnabled ? this.pasteThresholdValues : null}>
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
                                            <ColorPicker id="1" className="form-control" key="1" value={this.props.color} updateColor={this.getSelectedColor} />
                                        </div>
                                        <div className="col-lg-4 hidden-md hidden-sm hidden-xs pull-right text-right">
                                            <span title="Copy" className="fontSize20 paddingRight10">
                                                <i className="fa fa-copy pointer" aria-hidden="true" onClick={this.setIsCopiedForLevel}></i>
                                            </span>
                                            <span title="Paste" className="fontSize20 paddingRight5">
                                                <i className={this.props.isPasteEnabled ? "fa fa-paste pointer" : "fa fa-paste  text-disabled"}

                                                    disabled={!this.props.isPasteEnabled} aria-hidden="true"
                                                    onClick={this.props.isPasteEnabled ? this.pasteThresholdValues : null}>
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
                                            <input type='text' value={this.props.emailSubject} ref="emailSubject" className="form-control" onChange={this.updateLevel} />
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
                                                    <i title="Add Email" className="fa fa-plus-circle pointer" onClick={this.addEmailTextbox}> </i>
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
                                                    <i title="Add SMS" className="fa fa-plus-circle pointer" onClick={this.addSMSTextbox}> </i>
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
