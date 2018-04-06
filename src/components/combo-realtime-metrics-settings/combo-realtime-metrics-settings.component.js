import React, { PureComponent } from 'react'
import CustomSelect from '../custom-dropdown';
import DualList from '../react-dual-list';
import DragAndDropTable from '../drag-n-drop-table'



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

    toggleDrillDown = () => { }

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
                <div id="grid_base">
                    <div className="row">
                        <div className="col-xs-12 box-header-button">
                            <div className="box no-margin">
                                <div className="box-header">
                                    <h3 className="box-title">{this.props.l.t('Selected_Statistic_items', 'Selected Statistic items')}</h3>
                                    <div className="box-tools pull-right rtl-pull-right" style={{ position: 'relative', top: 0 }}>
                                        <button id="inputform_base_but" className="btn btn-sm btn-primary box-header-button" type="button" onClick={(e) => this.OpenAddItem(e)} >
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
}
