import React, { PureComponent } from 'react'

import ToggleSwitch from '../toggle-switch';
import { StatisticCategoryEnum } from '../../shared/enums'
import RealTimeSettingsContainer from '../real-time-settings'
import CyReportSettingsContainer from '../cy-report-settings/cy-report-settings.container';
import CustomMetricsSettingsContainer from '../custom-metrics-settings';

export default class DataMetricsSettingsComponent extends PureComponent {

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div className="col-xs-12 edit-form" id='tabContentArea'>
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('StatisticsCOLON', 'Statistics:')} </label>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                        <ToggleSwitch
                            nodes={this.props.dataMetrics.statisticCategoryOptions}
                            checkedNode={this.props.dataMetrics.statisticCategory}
                            onChange={(e) => {this.props.setSelectedStatisticCategory(e) }} />
                    </div>
                </div>
                {
                    this.renderSettingsBasedOnCategory()
                }
            </div>
        )
    }

    renderSettingsBasedOnCategory() {
        switch (this.props.dataMetrics.statisticCategory) {
            case (StatisticCategoryEnum.RealTime):
                return <RealTimeSettingsContainer />;
                break;
            case (StatisticCategoryEnum.CyReport):
                return <CyReportSettingsContainer />;
                break;
            case (StatisticCategoryEnum.Custom):
                return <CustomMetricsSettingsContainer />;
                break;
            default:
                return <h1>Statistic category not set</h1>
                break;
        }
    }
}