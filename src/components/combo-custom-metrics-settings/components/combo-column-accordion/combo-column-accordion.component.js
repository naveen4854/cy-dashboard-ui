import React, { PureComponent } from 'react';
import _ from "lodash";
import CustomSelect from '../../../custom-dropdown';
import ToggleSwitch from '../../../toggle-switch';
import { Constants } from '../../../../shared/constants';
import { DateZone } from '../../../../shared/lib';
import { DisplayFormatEnum } from '../../../../shared/enums';

export default class ComboCustomAccordion extends PureComponent {
    constructor(props) {
        super(props);
        this.removeColumn = this.removeColumn.bind(this);
        this.updateDisplayName = this.updateDisplayName.bind(this);
        this.toggleColumnClick = this.toggleColumnClick.bind(this);
        this.onColumnChange = this.onColumnChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.updateShowZeroValues = this.updateShowZeroValues.bind(this);
        this.onDateFormatChange = this.onDateFormatChange.bind(this);
        this.onTimeFormatChange = this.onTimeFormatChange.bind(this);
        this.onhoursFormatChange = this.onhoursFormatChange.bind(this);
    }

    removeColumn() {
        this.props.removeCustomComboColumn(this.props.column.id);
    }
    updateDisplayName(e) {
        let column = {
            ...this.props.column, displayName: e.target.value
        }
        this.props.updateCustomComboColumn(column);
    }
    toggleColumnClick() {
        let column = {
            ...this.props.column, expanded: !this.props.column.expanded
        }
        this.props.updateCustomComboColumn(column);
    }
    onColumnChange(selectedColumn) {
        let column = {
            ...this.props.column, selectedColumn
        }
        this.props.updateCustomComboColumn(column);
    }
    onTypeChange(selectedDisplayFormat) {
        let column = {
            ...this.props.column, displayFormat: selectedDisplayFormat
        }
        this.props.updateCustomComboColumn(column);
    }
    updateShowZeroValues(e) {
        let column = {
            ...this.props.column, showZeroValues: e.value
        }
        this.props.updateCustomComboColumn(column);
    }
    onDateFormatChange(e) {
        if (!e.value) return;
        let column = {
            ...this.props.column, dateFormat: e
        }
        this.props.updateCustomComboColumn(column);
    }
    onTimeFormatChange(e) {
        let column = {
            ...this.props.column, timeFormat: e
        }
        this.props.updateCustomComboColumn(column);
    }
    onhoursFormatChange(e) {
        if (!e.value) return;
        let column = {
            ...this.props.column, hoursFormat: e
        }
        this.props.updateCustomComboColumn(column);
    }
    render() {
        console.log(this.props ," this props in column accordion")
        let { column } = this.props;
        let index = this.props.index + 1;
        return (
            <div className="accordion">
                <div className="accordion-header" onClick={this.toggleColumnClick}>
                    {/* onClick={this.props.handleClick.bind(this, column.id)}> */}
                    <span className="pull-left rtl-pull-left">{this.props.l.t('Column', 'Column') + ' ' + index} </span>
                    <i className='fa fa-trash-o pull-right accordion-icon' onClick={this.removeColumn} ></i>
                    {
                        column.expanded
                            ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                            : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                    }
                </div>
                <div className={(column.expanded) ? "fade-out active" : "fade-in active"}>
                    {
                        (column.expanded) &&
                        <div className="accordion-form-group">
                            <div className="accordion-row">
                                <div className="accordion-input-group">
                                    <span> {this.props.l.t('ColumnCOLON', 'Column:')} </span>
                                    <div className="col-md-11 col-sm-7">
                                        <CustomSelect
                                            name="field-group-options"
                                            value={this.props.columnOptions.length == 1 ?
                                                this.props.columnOptions[0] : column.selectedColumn}
                                            options={this.props.columnOptions}
                                            placeholder='Select...'
                                            onChange={this.onColumnChange} />
                                    </div>
                                </div>
                                <div className="accordion-input-group">
                                    <span> {this.props.l.t('TypeCOLON', 'Type:')} </span>
                                    <div className="col-md-11 col-sm-7">
                                        <CustomSelect name="field-group-options"
                                            value={column.displayFormat}
                                            options={this.props.displayFormatOptions}
                                            placeholder='Select...'
                                            onChange={this.onTypeChange} />
                                    </div>
                                </div>

                            </div>

                            <div className="accordion-row">
                                {
                                    (() => {
                                        switch (column.displayFormat && typeof column.displayFormat == 'number' ? column.displayFormat : column.displayFormat.value) {
                                            case DisplayFormatEnum.Number:
                                            case DisplayFormatEnum.Decimal:
                                                return <div>
                                                    {false &&
                                                        <div className="accordion-input-group">
                                                            <span>{this.props.l.t('_SummaryCOLON', ' Summary:')}</span>
                                                            <ToggleSwitch className="form-control"
                                                                nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                                                checkedNode={column.isSummary}
                                                                onChange={this.updateToogle.bind(this, 'isSummary')} />
                                                        </div>
                                                    }
                                                    {column.isSummary && false && <div className="accordion-input-group">
                                                        <span> {this.props.l.t('Statistic_Function', 'Statistic function:')} </span>
                                                        <div className="col-md-11 col-sm-7">
                                                            <CustomSelect name="field-group-options" value={column.aggregateOperation} options={Constants.AggregateOperations} placeholder='Select...'
                                                                onChange={(e) => this.onAggregateOperationsChange(e)} />
                                                        </div>
                                                    </div>}
                                                    <div className="accordion-input-group">
                                                        <span> {this.props.l.t('Show_Zero_ValuesCOLON', 'Show Zero Values:')} </span>
                                                        <ToggleSwitch className="form-control"
                                                            nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                                            checkedNode={column.showZeroValues}
                                                            onChange={this.updateShowZeroValues} />
                                                    </div>
                                                </div>
                                            case DisplayFormatEnum.Date_Time:
                                                return <div>
                                                    <div className="accordion-input-group">
                                                        <span> {this.props.l.t('Date_Format_COLON', 'Date Format :')} </span>
                                                        <div className="col-md-11 col-sm-7">
                                                            <CustomSelect name="field-group-options"
                                                                value={column.dateFormat && column.dateFormat.value ? column.dateFormat : DateZone.dateFormats[0]}
                                                                options={DateZone.dateFormats}
                                                                placeholder='Select...'
                                                                onChange={this.onDateFormatChange} />
                                                        </div>
                                                    </div>
                                                    <div className="accordion-input-group">
                                                        <span> {this.props.l.t('Time Format:', 'Time Format :')} </span>
                                                        <div className="col-md-11 col-sm-7">
                                                            <CustomSelect name="field-group-options"
                                                                value={column.timeFormat && column.timeFormat.value ? column.timeFormat : Constants.customCombotimeFormat[0]}
                                                                options={Constants.customCombotimeFormat}
                                                                placeholder='Select...'
                                                                onChange={this.onTimeFormatChange} />
                                                        </div>
                                                    </div>
                                                    {
                                                        column.timeFormat && column.timeFormat.value == 1 &&
                                                        < div className="accordion-input-group">
                                                            <span> {this.props.l.t('Hours Format:', 'Hours Format :')} </span>
                                                            <div className="col-md-11 col-sm-7">
                                                                <CustomSelect name="field-group-options"
                                                                    value={column.hoursFormat && column.hoursFormat.value ? column.hoursFormat : Constants.hoursFormat[0]}
                                                                    options={Constants.hoursFormat}
                                                                    placeholder='Select...'
                                                                    onChange={this.onhoursFormatChange} />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            case DisplayFormatEnum.Duration:
                                                return <div className="accordion-input-group">
                                                    <span> {this.props.l.t('Duration Format:', 'Duration Format :')} </span>
                                                    <div className="col-md-11 col-sm-7">
                                                        <CustomSelect name="field-group-options"
                                                            value={column.timeFormat && column.timeFormat.value ? column.timeFormat : Constants.customCombotimeFormat[1]}
                                                            options={_.filter(Constants.customCombotimeFormat, cf => cf.id != 0)}
                                                            placeholder='Select...'
                                                            onChange={this.onTimeFormatChange} />
                                                    </div>
                                                </div>
                                            default:
                                                null;
                                        }
                                    })()
                                }

                                <div className="accordion-input-group">
                                    <span>{this.props.l.t('Display_NameCOLON', 'Display Name:')} </span>
                                    <div className="col-md-11 col-sm-7">
                                        <input
                                            type='text'
                                            className="form-control"
                                            value={column.displayName}
                                            onChange={this.updateDisplayName} />
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


