import React, { PureComponent } from 'react';
import CustomSelect from '../custom-dropdown';
import { StatisticCategoryEnum } from '../../shared/enums';

export default class CyReportSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.onStatisticGroupChange = this.onStatisticGroupChange.bind(this)
        this.onStatisticItemChange = this.onStatisticItemChange.bind(this)
        this.onStatisticFunctionChange = this.onStatisticFunctionChange.bind(this)
        this.onDisplayFormatChange = this.onDisplayFormatChange.bind(this)
    }
    onStatisticGroupChange(statisticGroup) {
        if (!statisticGroup.id)
            return;
        this.props.setStatisticGroupAndGetItems(statisticGroup)
    }

    onStatisticItemChange(statisticItem) {
        if (statisticItem.id)
            this.props.setItemAndGetFunctions(statisticItem);
    }

    onStatisticFunctionChange(statisticFunction) {
        if (statisticFunction.id)
            this.props.setFunctionAndGetDisplayFormat(statisticFunction)
    }

    onDisplayFormatChange(displayFormat) {
        if (displayFormat.id)
            this.props.setSelectedDisplayFormat(displayFormat)
    }

    saveDataMetrics() {
        this.props.saveMetrics(
            {
                id: Date.now(),
                desc: '',
                group: _.cloneDeep(this.props.realTimeSettings.selectedGroup),
                item: _.cloneDeep(this.props.realTimeSettings.selectedItem),
                func: _.cloneDeep(this.props.realTimeSettings.selectedFunction),
                displayFormat: _.cloneDeep(this.props.realTimeSettings.selectedDisplayFormat),
                statisticCategory: _.cloneDeep(this.props.realTimeSettings.statisticCategory),
                drillDownOptions: _.cloneDeep(this.props.realTimeSettings.drillDownOptions)
            }
        );
    }

    render() {
        const { cyReportSettings } = this.props;
        const enableSetButton = cyReportSettings.selectedDisplayFormat.id ? true : false
        return (
            <div id="cyReportSettings">
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_GroupCOLON', 'Statistic Group:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-group-options"
                            value={this.props.cyReportSettings.selectedGroup}
                            placeholder='Select...'
                            options={this.props.cyReportSettings.groupOptions}
                            onChange={this.onStatisticGroupChange} />
                    </div>
                    {
                        this.props.cyReportSettings.statisticCategory == StatisticCategoryEnum.RealTime && this.props.cyReportSettings.selectedItem && this.props.cyReportSettings.selectedItem.id &&
                        <div className="drill-icon">
                            <i onClick={this.toggleDrillDown} className="fa fa-filter"></i>
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_Item', 'Statistic Item:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-item-options"
                            value={this.props.cyReportSettings.selectedItem}
                            placeholder='Select...'
                            options={this.props.cyReportSettings.itemOptions}
                            onChange={(e) => this.onStatisticItemChange(e)} />
                    </div>
                </div>
                {/* {
                    this.props.cyReportSettings.selectedGroup && this.props.cyReportSettings.selectedGroup.id && this.props.cyReportSettings.openDrillDown ?
                        <div className="row">
                            <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                                {this.props.l.t('Select_filter_s_COLON', 'Select filter(s):')}
                            </div>
                            <div className="col-xs-8 col-sm-6 col-md-5 col-lg-4 drilldown-layout">
                                {
                                    this.props.cyReportSettings.drillDownOptions && this.props.cyReportSettings.drillDownOptions.length > 0 ?
                                        this.props.cyReportSettings.isDrillDownMultiSelect
                                            ? <CheckBoxListGroup checkList={this.props.cyReportSettings.drillDownOptions} onChange={this.props.updateDrillDownOptions} label="" />
                                            : <RadioButtonGroup radioList={this.props.cyReportSettings.drillDownOptions} onChange={this.props.updateDrillDownOptions} label="" />
                                        : <p className='padding10px'> {this.props.cyReportSettings.selectedItem && this.props.cyReportSettings.selectedItem.label ? this.props.l.t('No_filters_available', 'No filters available') :
                                            this.props.l.t('Please_select_a_statistic_item', 'Please select a statistic item')}</p>
                                }
                            </div>
                        </div> : null
                } */}
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_FunctionCOLON', 'Statistic Function:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-function-options"
                            value={this.props.cyReportSettings.selectedFunction}
                            placeholder='Select...'
                            options={this.props.cyReportSettings.functionOptions}
                            onChange={(e) => this.onStatisticFunctionChange(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Display_Format', 'Display Format:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-display-format-options"
                            value={this.props.cyReportSettings.selectedDisplayFormat}
                            placeholder='Select...'
                            options={this.props.cyReportSettings.displayFormatOptions}
                            onChange={this.onDisplayFormatChange} />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-xs-4 col-xs-offset-4 col-sm-6  col-sm-offset-3 col-md-4 col-md-offset-4">
                        <div>
                            <button disabled={!enableSetButton} type="button" onClick={() => this.saveDataMetrics()} className=" btn btn-md btn-primary btn-block" >{this.props.l.t('Apply', 'Apply')}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}