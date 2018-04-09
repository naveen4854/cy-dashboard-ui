import React, { PureComponent } from 'react'
import CustomSelect from '../custom-dropdown';
import DualList from '../react-dual-list';
import DragAndDropTable from '../drag-n-drop-table'
import { LabelledCustomSelect } from '../labelled-controls';



export default class ComboRealTimeMetricsSettingsComponent extends PureComponent {
    columns = [
        { name: 'Statistic Item', property: 'item.label' },
        { name: 'Aggregate Function', property: 'func.label' },
        { name: 'Display Format', property: 'displayFormat.label' },
        { name: 'Widget', property: 'widget.label' },
        { name: 'Display Name', property: 'displayName' },
        { name: 'Edit', property: 'Edit' },
        { name: 'Delete', property: 'Delete' },
    ]
    constructor(props) {
        super(props);
        this.onStatisticGroupChange = this.onStatisticGroupChange.bind(this);
        this.updateComboDrillDownOptions = this.updateComboDrillDownOptions.bind(this);
        this.onStatisticItemChange = this.onStatisticItemChange.bind(this);
        this.onFunctionChange = this.onFunctionChange.bind(this);
        this.onDisplayFormatChange = this.onDisplayFormatChange.bind(this);
        this.setApplicableWidget = this.setApplicableWidget.bind(this);
        this.updateDisplayName = this.updateDisplayName.bind(this);
        this.toggleAddEdit = this.toggleAddEdit.bind(this);
        this.addComboStatisticItem = this.addComboStatisticItem.bind(this);
        this.closeAddItem = this.closeAddItem.bind(this);
        this.applyComboRealTimeMetrics = this.applyComboRealTimeMetrics.bind(this);
    }
    onStatisticGroupChange(statisticGroup) {
        if (!statisticGroup.id)
            return;
        // this.props.toggleDrillDown(true);
        this.props.setStatisticGroupAndDrilldown(statisticGroup)
    }
    updateComboDrillDownOptions(options) {
        this.props.updateComboDrillDownOptions(options);
    }
    onStatisticItemChange(item) {
        this.props.setItemAndGetFunctions(item);
    }
    onFunctionChange(selectedFunction) {
        this.props.setFunctionAndGetDisplayFormat(selectedFunction);
    }
    onDisplayFormatChange(selectedDisplayFormat) {
        this.props.getApplicableWidget(selectedDisplayFormat);
    }
    setApplicableWidget(selectedWidget) {
        this.props.setApplicableWidget(selectedWidget);
    }
    updateDisplayName(e) {
        this.props.updateDisplayName(e.target.value);
    }
    toggleAddEdit() {
        this.props.toggleAddEdit(!this.props.comboRealTimeSettings.toggleAddEdit);
    }
    addComboStatisticItem() {
        this.props.addComboStatisticItem();
    }
    closeAddItem() {
        this.props.toggleAddEdit(false);
    }
    toggleDrillDown = () => { }
    applyComboRealTimeMetrics() {
        this.props.applyComboRealTimeMetrics();
    }
    render() {
        const { comboRealTimeSettings } = this.props;
        return (
            <div id="comboRealTimeSettings">
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_GroupCOLON', 'Statistic Group:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect name="field-group-options"
                            value={comboRealTimeSettings.selectedGroup}
                            placeholder='Select...'
                            options={comboRealTimeSettings.groupOptions}
                            onChange={this.onStatisticGroupChange} />
                    </div>
                    <div className="drill-icon">
                        <i onClick={this.toggleDrillDown} className="fa fa-filter"></i>
                    </div>
                </div>
                <div className="row">
                    {
                        //comboRealTimeSettings.openDrillDown && comboRealTimeSettings.selectedGroup &&
                        this.renderComboDrillDown()
                    }
                </div>
                {
                    comboRealTimeSettings.toggleAddEdit &&
                    this.renderAddEditBox()
                }
                <div id="grid_base">
                    <div className="row">
                        <div className="col-xs-12 box-header-button">
                            <div className="box no-margin">
                                <div className="box-header">
                                    <h3 className="box-title">{this.props.l.t('Selected_Statistic_items', 'Selected Statistic items')}</h3>
                                    <div className="box-tools pull-right rtl-pull-right" style={{ position: 'relative', top: 0 }}>
                                        <button id="inputform_base_but" className="btn btn-sm btn-primary box-header-button" type="button" onClick={this.toggleAddEdit} >
                                            {this.props.l.t('Add_Statistic_Item', 'Add Statistic Item')}
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive">
                                                <DragAndDropTable rowOnDragClass={"drag-highlight"}
                                                    columns={this.columns}
                                                    rows={comboRealTimeSettings.comboSelectedStatisticItems}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className=" col-md-offset-10  col-md-4 col-sm-offset-6 col-sm-6">
                        <button
                            //  disabled={!this.state.enableSetButton} 
                            type="button"
                            onClick={this.applyComboRealTimeMetrics}
                            className=" btn btn-primary" >
                            {this.props.l.t('Apply', 'Apply')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderComboDrillDown() {
        const { comboRealTimeSettings } = this.props;

        // if (!comboRealTimeSettings.drillDownOptions) {
        //     this.props.getComboDrillDownMetaData(comboRealTimeSettings.selectedGroup, this.props.widget.id);
        // }

        return (
            <div>
                <div className="row">
                    <div className="metrics-label col-md-4">
                        {this.props.l.t('Select_filter_s_COLON', 'Select filter(s):')}
                    </div>
                </div>
                <div className="row" style={{ marginTop: '10px' }}>

                    <div className="combo-drilldown-layout col-md-offset-1 col-md-10 col-sm-11">
                        {
                            <DualList
                                allList={comboRealTimeSettings.drillDownOptions}
                                selectedList={comboRealTimeSettings.selectedDrilldownOptions}
                                onChange={this.updateComboDrillDownOptions}
                                l={this.props.l}
                            />

                            // <CheckBoxListGroup checkList={comboRealTimeSettings.drillDownOptions} onChange={(e) => this.props.updateComboDrillDownOptions(e, this.props.widget.id)} label="" />
                        }
                    </div>
                </div>
            </div>
        );
    }

    renderAddEditBox() {
        const { comboRealTimeSettings } = this.props;

        return (
            <div >
                <div className="row">
                    <div className="col-xs-12 box-header-button">
                        <div className="box box-primary no-margin">
                            <div className="box-header">
                                <h3 className="box-title">{this.props.l.t('Add_SLASH_Edit', 'Add / Edit')}</h3>
                                <div className="box-tools pull-right rtl-pull-right" style={{ position: 'relative', top: 0 }}>
                                    <button className="btn btn-box-tool" data-widget="remove" onClick={(e) => this.closeAddItem(e)} ><i className="fa fa-remove"></i></button>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>{this.props.l.t('Statistic_Item', 'Statistic Item')}</label>
                                            <div className="row">
                                                <div className="col-md-10 col-lg-12">
                                                    <CustomSelect name="field-item-options"
                                                        placeholder='Select...'
                                                        value={comboRealTimeSettings.selectedItem}
                                                        onChange={this.onStatisticItemChange}
                                                        options={comboRealTimeSettings.statisticItems}
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
                                                        value={comboRealTimeSettings.selectedFunction}
                                                        placeholder='Select...'
                                                        options={comboRealTimeSettings.functionOptions}
                                                        onChange={this.onFunctionChange}
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
                                                        value={comboRealTimeSettings.selectedDisplayFormat}
                                                        placeholder='Select...'
                                                        options={comboRealTimeSettings.displayFormatOptions}
                                                        onChange={this.onDisplayFormatChange}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>{this.props.l.t('Select_Widget', 'Select Widget')}</label>
                                            <div className="row">
                                                <div className="col-md-10 col-lg-12">
                                                    <CustomSelect name="field-display-format-options"
                                                        value={comboRealTimeSettings.selectedWidget}
                                                        placeholder='Select...'
                                                        options={comboRealTimeSettings.applicableWidgets}
                                                        onChange={this.setApplicableWidget}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Display Name</label>
                                            <div className="row">
                                                <div className="col-md-10 col-lg-12">
                                                    <input type='text'
                                                        className="form-control text-height"
                                                        placeholder='Display Name'
                                                        value={comboRealTimeSettings.displayName}
                                                        onChange={this.updateDisplayName} />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="pull-right rtl-pull-right box-row-button">
                                        <div className="col-md-5">
                                            {
                                                // !comboRealTimeSettings.toggleAddEdit &&
                                                <button
                                                    // disabled={!comboRealTimeSettings.enableAddItemButton || _.isEmpty(comboRealTimeSettings.displayName)} 
                                                    type="submit" className="btn btn-primary"
                                                    onClick={this.addComboStatisticItem} >
                                                    {this.props.l.t('Save_Item', 'Save Item')}
                                                </button>
                                            }
                                            {/* {
                                                this.state.isEditMode &&
                                                <button disabled={!this.state.enableAddItemButton || _.isEmpty(this.state.displayName)} type="submit" className="btn btn-primary" onClick={(e) => this.SaveEditedComboStatisticItem(e)} >
                                                    {this.props.l.t('Save_Item', 'Save Item')}
                                                </button>
                                            } */}
                                        </div>
                                        <div className="col-md-4">
                                            <button type="button" className="btn btn-primary" onClick={this.closeAddItem} >
                                                {this.props.l.t('Cancel', 'Cancel')}
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <br />
            </div>
        )
    }
}