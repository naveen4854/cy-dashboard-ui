import React, { PureComponent } from 'react'
import CustomSelect from '../custom-dropdown';
import DragAndDropTable from '../drag-n-drop-table'
import { LabelledCustomSelect } from '../labelled-controls';
import { ComboCustomQueryComponent } from './components'



export default class ComboCustomMetricsSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.applyComboRealTimeMetrics = this.applyComboRealTimeMetrics.bind(this);
    }
    applyComboRealTimeMetrics() {
        this.props.applyComboRealTimeMetrics();
    }
    saveDataMetrics(){

    }
    render() {
        const { comboCustomSettings } = this.props;
        return (
            <div id="comboCustomSettings">
                <div>
                    <div className="row">
                        <ComboCustomQueryComponent {...this.props}/>
                    </div>
                    {/* <div className="row">
                        <ComboCustomColumns updateLevel={this.updateLevel.bind(this)}  {...this.state} />
                    </div> */}
                    <div className="row">
                        <div className=" col-md-offset-10  col-md-4 col-sm-offset-6 col-sm-6">
                            <button type="button"
                                disabled={!comboCustomSettings.columns.length > 0}
                                className=" btn btn-primary"
                                onClick={this.saveDataMetrics} >
                                {this.props.l.t('Apply', 'Apply')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
