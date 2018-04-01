import React, { PureComponent } from 'react'
import { WidgetTypeEnum } from '../../shared/enums';
import DataMetricsSettingsContainer from '../data-metrics-settings/';

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
        debugger
        switch (this.props.dataMetrics.widgetType) {
            case WidgetTypeEnum.Box:
            case WidgetTypeEnum.Progress:
            case WidgetTypeEnum.Speedo:
            case WidgetTypeEnum.Pie:
            case WidgetTypeEnum.Bar:
            case WidgetTypeEnum.CircularProgress:
                return (<DataMetricsSettingsContainer />);
            case WidgetTypeEnum.Combo:
                return (
                    <div>{this.props.l.t('Some_error_occuredPERIOD', 'Some error occured.')}</div>
                );
            case WidgetTypeEnum.Clock:
                return (
                    <div>{this.props.l.t('Some_error_occuredPERIOD', 'Some error occured.')}</div>
                );
            default:
                return (
                    <div>{this.props.l.t('Some_error_occuredPERIOD', 'Some error occured.')}</div>
                );
        }
    }
}