import React, { PureComponent } from 'react';
import CustomSelect from '../custom-dropdown';
import { StatisticCategoryEnum } from '../../shared/enums'
import CheckBoxListGroup from '../check-box-list-group'
import RadioButtonGroup from '../radio-button-group'

export default class RealTimeSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.onStatisticGroupChange = this.onStatisticGroupChange.bind(this)
        this.onStatisticItemChange = this.onStatisticItemChange.bind(this)
        this.onStatisticFunctionChange = this.onStatisticFunctionChange.bind(this)
        this.onDisplayFormatChange = this.onDisplayFormatChange.bind(this)
        this.toggleDrillDown = this.toggleDrillDown.bind(this)
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        // this.props.setDrillDownDefaulted();
    }

    onStatisticGroupChange(statisticGroup) {
        if (!statisticGroup.id)
            return;
        this.props.toggleDrillDown(true);
        this.props.setStatisticGroupAndGetItems(statisticGroup)
    }

    onStatisticItemChange(statisticItem) {
        if (statisticItem.id) {
            this.props.setItemAndGetFunctions(statisticItem);
            this.props.getDrillDownMetaData(statisticItem);
        }
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

    toggleDrillDown() {
        this.props.toggleDrillDown();
    }

    render() {
        const { realTimeSettings } = this.props;
        const enableSetButton = realTimeSettings.selectedDisplayFormat.id ? true : false
        return (
            <div id="realTimeSettings">
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_GroupCOLON', 'Statistic Group:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-group-options"
                            value={this.props.realTimeSettings.selectedGroup}
                            placeholder='Select...'
                            options={this.props.realTimeSettings.groupOptions}
                            onChange={this.onStatisticGroupChange} />
                    </div>
                    {
                        this.props.realTimeSettings.statisticCategory == StatisticCategoryEnum.RealTime && this.props.realTimeSettings.selectedItem && this.props.realTimeSettings.selectedItem.id &&
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
                            value={this.props.realTimeSettings.selectedItem}
                            placeholder='Select...'
                            options={this.props.realTimeSettings.itemOptions}
                            onChange={(e) => this.onStatisticItemChange(e)} />
                    </div>
                </div>
                {
                    this.props.realTimeSettings.selectedGroup && this.props.realTimeSettings.selectedGroup.id && this.props.realTimeSettings.openDrillDown ?
                        <div className="row">
                            <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                                {this.props.l.t('Select_filter_s_COLON', 'Select filter(s):')}
                            </div>
                            <div className="col-xs-8 col-sm-6 col-md-5 col-lg-4 drilldown-layout">
                                {
                                    this.props.realTimeSettings.drillDownOptions && this.props.realTimeSettings.drillDownOptions.length > 0 ?
                                        this.props.realTimeSettings.isDrillDownMultiSelect
                                            ? <CheckBoxListGroup checkList={this.props.realTimeSettings.drillDownOptions} onChange={this.props.updateDrillDownOptions} label="" />
                                            : <RadioButtonGroup radioList={this.props.realTimeSettings.drillDownOptions} onChange={this.props.updateDrillDownOptions} label="" />
                                        : <p className='padding10px'> {this.props.realTimeSettings.selectedItem && this.props.realTimeSettings.selectedItem.label ? this.props.l.t('No_filters_available', 'No filters available') :
                                            this.props.l.t('Please_select_a_statistic_item', 'Please select a statistic item')}</p>
                                }
                            </div>
                        </div> : null
                }
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_FunctionCOLON', 'Statistic Function:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-function-options"
                            value={this.props.realTimeSettings.selectedFunction}
                            placeholder='Select...'
                            options={this.props.realTimeSettings.functionOptions}
                            onChange={(e) => this.onStatisticFunctionChange(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Display_Format', 'Display Format:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-display-format-options"
                            value={this.props.realTimeSettings.selectedDisplayFormat}
                            placeholder='Select...'
                            options={this.props.realTimeSettings.displayFormatOptions}
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