import React, { PureComponent } from 'react'
import CustomSelect from '../custom-dropdown';
import DragAndDropTable from '../drag-n-drop-table'
import { LabelledCustomSelect } from '../labelled-controls';
import { ComboCustomQueryComponent, ComboCustomColumnsComponent } from './components'



export default class ComboCustomMetricsSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.applyComboRealTimeMetrics = this.applyComboRealTimeMetrics.bind(this);
        this.saveDataMetrics = this.saveDataMetrics.bind(this);
    }

    applyComboRealTimeMetrics() {
        this.props.applyComboRealTimeMetrics();
    }

    saveDataMetrics() {
        // this.props.clearNotification()
        // let errors = [];
        // _.forEach(this.state.levels, (lvl, index) => {
        //     if (_.isEqual(lvl.column, {}))
        //         errors.push({ displayMessage: this.props.l.t('Please_select_Column_$columnNumber', 'Please select Column ${columnNumber}', { columnNumber: index + 1 }) })
        // })

        // if (errors.length > 0) {
        //     let config = {
        //         type: ResponseStatusEnum.Error,
        //         messages: errors
        //     }
        //     return this.props.showNotification(config)
        // }

        // if (_.find(this.state.levels, (lvl) => _.isEqual(lvl.column, {}))) {
        //     let config = {
        //         type: ResponseStatusEnum.Error,
        //         messages: [{ displayMessage: this.props.l.t('Please_select_column', 'Please select column') }]
        //     }
        //     return this.props.showNotification(config)
        // }

        this.props.saveComboCustomMetrics();
    }

    render() {
        const { comboCustomSettings } = this.props;
        return (
            <div id="comboCustomSettings">
                <div>
                    <div className="row">
                        <ComboCustomQueryComponent {...this.props} />
                    </div>
                    <div className="row">
                        {
                            comboCustomSettings.query &&
                            <ComboCustomColumnsComponent {...this.props} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
