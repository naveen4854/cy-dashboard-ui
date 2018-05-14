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
        this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
        this.editSelectedItem = this.editSelectedItem.bind(this);
        this.onRowOrderChanged = this.onRowOrderChanged.bind(this);
        this.toggleDrillDown = this.toggleDrillDown.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.comboRealTimeSettings.editTriggered) {
            this.props.setEditColumnValues();
        }
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
        // if(!item.value) return;
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
        this.props.toggleAddEdit(true);
    }
    addComboStatisticItem() {
        if (this.props.comboRealTimeSettings.selectedColumnId == -1)
            return this.props.addComboStatisticItem();

        this.props.updatedComboStatisticColumn();
    }
    closeAddItem() {
        this.props.toggleAddEdit(false);
    }
    toggleDrillDown() {
        this.props.toggleDrillDown(!this.props.comboRealTimeSettings.isDrillDownOpen);
    }
    applyComboRealTimeMetrics() {
        this.props.applyComboRealTimeMetrics();
    }
    deleteSelectedItem(e, comboSelectedStatisticColumn) {
        if (comboSelectedStatisticColumn.isDefault)
            return
        this.props.removeComboStatisticItems(comboSelectedStatisticColumn);
    }
    editSelectedItem(e, comboSelectedStatisticColumn) {
        if (this.props.comboRealTimeSettings.selectedColumnId == comboSelectedStatisticColumn.id)
            return
        this.props.clearEditColumn(comboSelectedStatisticColumn);
        // this.props.editComboSelectedColumn(comboSelectedStatisticColumn);
    }
    onRowOrderChanged(comboSelectedStatisticColumns) {
        this.props.updateComboSelectedStatisticColumns(comboSelectedStatisticColumns);
    }

    render() {
        const { comboRealTimeSettings } = this.props;
        return (
            <div id="comboRealTimeSettings">
                <div className="row" style={{ marginTop: "10px" }}>
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Statistic_GroupCOLON', 'Statistic Group:')} </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5" >
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
                        comboRealTimeSettings.isDrillDownOpen && comboRealTimeSettings.selectedGroup &&
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
                                                    rows={comboRealTimeSettings.comboSelectedStatisticColumns}
                                                    onDelete={this.deleteSelectedItem}
                                                    onEdit={this.editSelectedItem}
                                                    onRowOrderChange={this.onRowOrderChanged}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
        let isSaveDisabled = (comboRealTimeSettings.selectedItem && Object.keys(comboRealTimeSettings.selectedItem).length != 0) && (comboRealTimeSettings.selectedWidget && Object.keys(comboRealTimeSettings.selectedWidget).length != 0) && (comboRealTimeSettings.selectedDisplayFormat && Object.keys(comboRealTimeSettings.selectedDisplayFormat).length != 0) && (comboRealTimeSettings.selectedFunction && Object.keys(comboRealTimeSettings.selectedFunction).length != 0) && (comboRealTimeSettings.displayName && _.trim(comboRealTimeSettings.displayName) != '');
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
                                                        disabled={comboRealTimeSettings.columnIsDefault}
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
                                                        disabled={comboRealTimeSettings.columnIsDefault}
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
                                                        disabled={comboRealTimeSettings.columnIsDefault}
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
                                                        disabled={comboRealTimeSettings.columnIsDefault}
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
                                                    disabled={!isSaveDisabled}
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
