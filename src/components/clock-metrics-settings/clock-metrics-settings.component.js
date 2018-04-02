import React, { PureComponent } from 'react'

import ToggleSwitch from '../toggle-switch';
import CustomSelect from '../custom-dropdown';
import {Constants} from '../../shared/constants';
import {DateZone} from '../../shared/lib';

export default class ClockMetricsSettingsComponent extends PureComponent {
    render() {
        return (
            <div className="col-xs-12 editorContent">
                <div className="col-xs-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                                <label className="control-label inline" >{this.props.l.t('Clock_TypeCOLON', 'Clock Type:')} </label>
                            </div>
                            <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                                <ToggleSwitch
                                    className="form-control"
                                    checkedNode={this.props.clockSettings.isAnalog}
                                    nodes={[{ label: "Analog", value: true }, { label: "Digital", value: false }]}
                                    onChange={this.props.updateClock} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !this.props.clockSettings.isAnalog ?
                        <div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm">
                                            <label>{this.props.l.t('Hours_FormatCOLON', 'Hours Format:')} </label>
                                        </div>
                                        <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                                            <CustomSelect
                                                value={this.props.clockSettings.selectedHoursFormat}
                                                disabled={this.props.clockSettings.isAnalog}
                                                placeholder='Select...'
                                                options={Constants.hoursFormat}
                                                onChange={this.props.setSelectedHoursFormat} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm">
                                            <label className="control-label inline"> {this.props.l.t('Time_FormatCOLON', 'Time Format:')} </label>
                                        </div>
                                        <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                                            <CustomSelect
                                                disabled={this.props.clockSettings.isAnalog}
                                                value={this.props.clockSettings.selectedTimeFormat}
                                                placeholder='Select...'
                                                options={Constants.timeFormat}
                                                onChange={this.props.setSelectedTimeFormat} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm">
                                            <label className="control-label inline">{this.props.l.t('Display_DaysCOLON', 'Display Days:')}</label>
                                        </div>
                                        <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                                            <ToggleSwitch
                                                disabled={this.props.clockSettings.isAnalog}
                                                className="form-control disabled"
                                                nodes={[{ label: "Yes", value: true, isDisabled: this.props.clockSettings.isAnalog }, { label: "No", value: false, isDisabled: this.props.clockSettings.isAnalog }]}
                                                checkedNode={this.props.clockSettings.displayDays}
                                                onChange={this.props.updateDisplayDays} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm">
                                            <label className="control-label inline">{this.props.l.t('Display_DateCOLON', 'Display Date:')}</label>
                                        </div>
                                        <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                                            <ToggleSwitch
                                                disabled={this.props.clockSettings.isAnalog}
                                                className="form-control disabled"
                                                nodes={[{ label: "Yes", value: true, isDisabled: this.props.clockSettings.isAnalog }, { label: "No", value: false, isDisabled: this.props.clockSettings.isAnalog }]}
                                                checkedNode={this.props.clockSettings.displayDate}
                                                onChange={this.props.updateDisplayDate} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm">
                                            <label className="control-label inline">{this.props.l.t('Date_Format_COLON', 'Date Format :')}</label>
                                        </div>
                                        <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                                            <CustomSelect
                                                disabled={!this.props.clockSettings.displayDate}
                                                value={this.props.clockSettings.selectedDateFormat}
                                                placeholder='Select...'
                                                options={DateZone.dateFormats}
                                                onChange={this.props.setSelectedDateFormat} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div> : null
                }
                <div className="col-xs-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm">
                                <label className="control-label inline">{this.props.l.t('Time_ZoneCOLON', 'Time Zone:')}</label>
                            </div>
                            <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">

                                <CustomSelect
                                    value={this.props.clockSettings.selectedTimeZoneItem}
                                    placeholder='Select...'
                                    options={this.props.clockSettings.timeZonesList}
                                    onChange={this.props.setSelectedTimeZone} />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm">
                                <label className="control-label inline"> {this.props.l.t('Time_Zone_LabelCOLON', 'Time Zone Label:')} </label>
                            </div>
                            <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                                <input type="text" className="form-control" value={this.props.clockSettings.tzoneText || ""} onChange={(e) => this.props.setTimeZonelabel(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-4 col-xs-offset-4 col-sm-6  col-sm-offset-3 col-md-4 col-md-offset-4">
                            <button
                                disabled={this.props.clockSettings.selectedTimeZoneItem ? false : true}
                                type="button"
                                className=" btn btn-sm btn btn-primary btn-block "
                                onClick={this.props.updateWidgetSettings}>{this.props.l.t("Preview", "Preview")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}