import React, { PureComponent } from 'react'

import { DashboardModeEnum, WidgetTypeEnum } from '../../../shared/enums';
import WidgetHeader from '../../widget-header';
import BoxWidgetComponent from '../box-widget'
import BarChartWidgetComponent from '../bar-chart-widget'
import PieChartWidgetComponent from '../pie-chart-widget';
import CircularProgressComponent from '../circular-progress';
import SpeedoWidgetComponent from '../speedo-widget';
import ProgressBarWidgetComponent from '../progress-bar-widget';
import ClockWidgetComponent from '../clock-widget';

import '../styles.css'

export default class WidgetComponent extends PureComponent {

    render() {
        let classToBeApplied = 'widget';

        switch (this.props.widget.widgetType) {
            case WidgetTypeEnum.Text:
            case WidgetTypeEnum.Picture:
                classToBeApplied = 'widget no-text-shadow';
                break;
            case WidgetTypeEnum.Combo:
                classToBeApplied = 'combo-widget';
                break;
            default:
                classToBeApplied = 'widget';
                break;
        }

        if (this.props.widget.highlight) {
            classToBeApplied += ' highlight ';
            if (this.props.widget.isComboWidget) {
                classToBeApplied += ' zoom-widget ';
            }
        }

        return (
            <div style={{ height: this.props.widget.height, width: this.props.widget.width }}
                className={classToBeApplied}>
                {
                    (this.props.mode == DashboardModeEnum.Edit || this.props.mode == DashboardModeEnum.New) &&
                    <WidgetHeader {...this.props} />
                }
                {
                    this.renderContent()
                }
            </div>
        )
    }

    renderContent() {
        switch (this.props.widget.widgetType) {
            case WidgetTypeEnum.Box:
                return (
                    <BoxWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetTypeEnum.Bar:
                return (
                    <BarChartWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetTypeEnum.Pie:
                return (
                    <PieChartWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetTypeEnum.CircularProgress:
                return (
                    <CircularProgressComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetTypeEnum.Speedo:
                return (
                    <SpeedoWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetTypeEnum.Progress:
                return (
                    <ProgressBarWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetTypeEnum.Clock:
                return (
                    <ClockWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            default:
                return (
                    <BoxWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
        }
    }
}