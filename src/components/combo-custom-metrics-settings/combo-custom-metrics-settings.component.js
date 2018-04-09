import React, { PureComponent } from 'react'
import CustomSelect from '../custom-dropdown';
import DragAndDropTable from '../drag-n-drop-table'
import { LabelledCustomSelect } from '../labelled-controls';
import { ComboCustomQueryComponent, ComboCustomColumnsComponent } from './components'



export default class ComboCustomMetricsSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.applyComboRealTimeMetrics = this.applyComboRealTimeMetrics.bind(this);
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

        this.props.SaveComboCustomMetrics(
            {
                id: Date.now(),
                statisticCategory: _.cloneDeep(this.props.dataMetrics.statisticCategory),
                query: _.cloneDeep(this.props.dataMetrics.query),
                levels: _.cloneDeep(this.state.levels),
                columnOptions: _.clone(this.props.dataMetrics.allColumnOptions)
            },
            this.props.widget.id
        );
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
