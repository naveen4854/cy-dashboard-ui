import React, { PureComponent } from 'react'

import ToggleSwitch from '../toggle-switch';
import CustomSelect from '../custom-dropdown';

export default class DataMetricsSettingsComponent extends PureComponent {
    render() {
        debugger
        return (
            <div className="col-xs-12 edit-form" id='tabContentArea'>
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <text>{this.props.l.t('StatisticsCOLON', 'Statistics:')} </text>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                        <ToggleSwitch
                            nodes={this.props.statisticCategoryOptions}
                            checkedNode={this.props.statisticCategory}
                            onChange={(e) => this.props.setSelectedStatisticCategory(e, this.state.widget.widgetType, this.state.widget.id)} />
                    </div>
                </div>
            </div>
        )
    }
}