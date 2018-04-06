import React, { PureComponent } from 'react'
import { WidgetTypeEnum } from '../../shared/enums';
import DataMetricsSettingsContainer from '../data-metrics-settings/';
import ClockMetricsSettingsContainer from '../clock-metrics-settings/';
import ComboMetricsSettingsContainer from '../combo-metrics-settings';

export default class DataMetricsComponent extends PureComponent {

    componentDidMount(){
        // initialize widget data once.. map widget data onto datametrics
    }

    render() {
        return (
            this.renderSettings()
        )
    }

    renderSettings() {
        switch (this.props.widgetType) {
            case WidgetTypeEnum.Box:
            case WidgetTypeEnum.Progress:
            case WidgetTypeEnum.Speedo:
            case WidgetTypeEnum.Pie:
            case WidgetTypeEnum.Bar:
            case WidgetTypeEnum.CircularProgress:
                return (<DataMetricsSettingsContainer />);
            case WidgetTypeEnum.Combo:
                return (
                    <ComboMetricsSettingsContainer />
                );
            case WidgetTypeEnum.Clock:
                return (<ClockMetricsSettingsContainer />);
            default:
                return (
                    <div>{this.props.l.t('Some_error_occuredPERIOD', 'Some error occured.')}</div>
                );
        }
    }
}