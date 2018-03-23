import React, { PureComponent } from 'react';
import CustomSelect from '../custom-dropdown';
import { statisticCategoryEnum } from '../../shared/enums'

export default class RealTimeSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.onStatisticGroupChange = this.onStatisticGroupChange.bind(this)
        this.onStatisticItemChange = this.onStatisticItemChange.bind(this)
        this.onStatisticFunctionChange = this.onStatisticFunctionChange.bind(this)
    }
    onStatisticGroupChange(statisticGroup) {
        if (!statisticGroup.id)
            return;
        // this.props.updateDrillDownOptions([]);
        this.props.setStatisticGroupAndGetItems(statisticGroup)
    }

    onStatisticItemChange(statisticItem) {
        if (statisticItem.id) {
            this.props.setItemAndGetFunctions(statisticItem);
            // this.props.getDrillDownMetaData(statisticItem);
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
                group: _.cloneDeep(this.props.dataMetrics.selectedGroup),
                item: _.cloneDeep(this.props.dataMetrics.selectedItem),
                func: _.cloneDeep(this.props.dataMetrics.selectedFunction),
                displayFormat: _.cloneDeep(this.props.dataMetrics.selectedDisplayFormat),
                statisticCategory: _.cloneDeep(this.props.dataMetrics.statisticCategory),
                drillDownOptions: _.cloneDeep(this.props.dataMetrics.drillDownOptions)
            }
        );
    }

    render() {
        const { dataMetrics } = this.props;
        const enableSetButton = dataMetrics.statisticCategory == statisticCategoryEnum.RealTime ?
            dataMetrics.selectedDisplayFormat.id != undefined : false
        debugger
        return (
            <div id="realcyReport">
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_GroupCOLON', 'Statistic Group:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-group-options"
                            value={this.props.dataMetrics.selectedGroup}
                            placeholder='Select...'
                            options={this.props.dataMetrics.groupOptions}
                            onChange={this.onStatisticGroupChange} />
                    </div>
                    {
                        this.props.dataMetrics.statisticCategory == statisticCategoryEnum.RealTime && this.props.dataMetrics.selectedItem && this.props.dataMetrics.selectedItem.id &&
                        <div className="drill-icon">
                            <i onClick={(e) => this.toggleDrillDown(e)} className="fa fa-filter"></i>
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_Item', 'Statistic Item:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-item-options"
                            value={this.props.dataMetrics.selectedItem}
                            placeholder='Select...'
                            options={this.props.dataMetrics.itemOptions}
                            onChange={(e) => this.onStatisticItemChange(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_FunctionCOLON', 'Statistic Function:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-function-options"
                            value={this.props.dataMetrics.selectedFunction}
                            placeholder='Select...'
                            options={this.props.dataMetrics.functionOptions}
                            onChange={(e) => this.onStatisticFunctionChange(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Display_Format', 'Display Format:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-display-format-options"
                            value={this.props.dataMetrics.selectedDisplayFormat}
                            placeholder='Select...'
                            options={this.props.dataMetrics.displayFormatOptions}
                            onChange={(e) => this.onDisplayFormatChange(e)} />
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