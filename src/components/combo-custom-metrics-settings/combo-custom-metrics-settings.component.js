import React, { PureComponent } from 'react'
import CustomSelect from '../custom-dropdown'; 
import DragAndDropTable from '../drag-n-drop-table'
import { LabelledCustomSelect } from '../labelled-controls';



export default class ComboCustomMetricsSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.applyComboRealTimeMetrics = this.applyComboRealTimeMetrics.bind(this);
    }
    applyComboRealTimeMetrics() {
        this.props.applyComboRealTimeMetrics();
    }
    render() {
        const { comboCustomSettings } = this.props;
        return (
            <div id="comboCustomSettings">
                Hello custom component
            </div>
        )
    }
}
