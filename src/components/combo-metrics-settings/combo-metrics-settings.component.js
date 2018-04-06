import React, { PureComponent } from 'react'
import ToggleSwitch from '../toggle-switch';
import ComboRealTimeMetricsSettingsContainer from '../combo-realtime-metrics-settings';
import { StatisticCategoryEnum } from '../../shared/enums';

export default class ComboMetricsSettingsComponent extends PureComponent {
    render() {
        return (
            <div className="col-xs-12 edit-form">
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('StatisticsCOLON', 'Statistics:')} </label>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                        <ToggleSwitch
                            nodes={this.props.dataMetrics.statisticCategoryOptions}
                            checkedNode={this.props.dataMetrics.statisticCategory}
                            onChange={(e) => { this.props.setSelectedStatisticCategory(e) }} />
                    </div>
                </div>
                {
                    this.renderComboSettingsBasedOnCategory()
                }
            </div>
        )
    }

    renderComboSettingsBasedOnCategory() {
        switch (this.props.dataMetrics.statisticCategory) {
            case (StatisticCategoryEnum.RealTime):
                return <ComboRealTimeMetricsSettingsContainer />;
                break;
            case (StatisticCategoryEnum.Custom):
                return <div>These are custom statistics for a custom</div>
                break;
            default:
                return <h1>Statistic category not set</h1>
                break;
        }
    }
}