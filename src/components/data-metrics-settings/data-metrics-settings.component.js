import React, { PureComponent } from 'react'

import ToggleSwitch from '../toggle-switch';
import { StatisticCategoryEnum } from '../../shared/enums'
import RealTimeSettingsContainer from '../real-time-settings'
import CyReportSettingsContainer from '../cy-report-settings/cy-report-settings.container';
import CustomMetricsSettingsContainer from '../custom-metrics-settings';

export default class DataMetricsSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.saveDataMetrics = this.saveDataMetrics.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }
    saveDataMetrics() {
        switch (this.props.dataMetrics.statisticCategory) {
            case (StatisticCategoryEnum.RealTime):
                this.props.saveRealTimeMetrics();
                break;
            case (StatisticCategoryEnum.CyReport):
                this.props.saveCyreportMetrics();
                break;
            case (StatisticCategoryEnum.Custom):
                this.props.saveCustomMetrics();
                break;
        }
    }

    render() {
        return (
            <div>
                <div className="col-xs-12">
                    <div className="col-xs-2 pull-right rtl-pull-right text-right rtl-text-right" style={{ marginTop: '10px' }}>
                        <div>
                            <button type="button" disabled={this.props.isDiabledApply} onClick={() => this.saveDataMetrics()} className=" btn btn-md btn-primary btn-block" >{this.props.l.t('Apply', 'Apply')}</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col-xs-12 edit-form calculatedVH" id='tabContentArea'>
                        <div className="row">
                            <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                                <label>{this.props.l.t('StatisticsCOLON', 'Statistics:')} </label>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                                <ToggleSwitch
                                    nodes={this.props.dataMetrics.statisticCategoryOptions}
                                    checkedNode={this.props.dataMetrics.statisticCategory}
                                    onChange={this.props.setSelectedStatisticCategory} />
                            </div>
                        </div>
                        {
                            this.renderSettingsBasedOnCategory()
                        }
                    </div>
                </div>
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