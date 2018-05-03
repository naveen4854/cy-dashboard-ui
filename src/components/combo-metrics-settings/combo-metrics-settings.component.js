import React, { PureComponent } from 'react'
import ToggleSwitch from '../toggle-switch';
import ComboRealTimeMetricsSettingsContainer from '../combo-realtime-metrics-settings';
import { StatisticCategoryEnum } from '../../shared/enums';
import ComboCustomMetricsSettingsContainer from '../combo-custom-metrics-settings';

export default class ComboMetricsSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.saveComboMetrics = this.saveComboMetrics.bind(this);
    }

    saveComboMetrics() {
        switch (this.props.dataMetrics.statisticCategory) {
            case (StatisticCategoryEnum.RealTime):
                this.props.saveComboRealTimeMetrics();
                break;
            case (StatisticCategoryEnum.Custom):
                this.props.saveComboCustomMetricsAction();
                break;
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-11 pull-left rtl-pull-right text-right rtl-text-right" style={{ marginTop: '10px' }}>
                        <button
                            //  disabled={!this.state.enableSetButton} 
                            type="button"
                            onClick={this.saveComboMetrics}
                            className=" btn btn-primary" >
                            {this.props.l.t('Apply', 'Apply')}
                        </button>
                    </div>
                </div>
                <div className="calculatedVH" >
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
                </div>
            </div>
        )
    }

    renderComboSettingsBasedOnCategory() {
        switch (this.props.dataMetrics.statisticCategory) {
            case (StatisticCategoryEnum.RealTime):
                return <ComboRealTimeMetricsSettingsContainer />;
                break;
            case (StatisticCategoryEnum.Custom):
                return <ComboCustomMetricsSettingsContainer />;
                break;
            default:
                return <h1>Statistic category not set</h1>
                break;
        }
    }
}