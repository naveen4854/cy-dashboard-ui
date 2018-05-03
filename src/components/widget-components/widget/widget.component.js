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
import TextWidgetComponent from '../text-widget';
import PictureWidgetContainer from '../picture-widget/';
import ComboWidgetComponent from '../combo-widget';
const envconfig = require('./static/envconfig');


import '../styles.css'

export default class WidgetComponent extends PureComponent {

    constructor(props) {
        super(props);
        if (this.props.dashboardMode == DashboardModeEnum.View || this.props.dashboardMode == DashboardModeEnum.Slider) {
            if (!this.props.widget.isComboWidget) {
                this.props.pullWidgetData(this.props.dashboardId, this.props.widget.id, 0)
            }
        }
        else if (this.props.dashboardMode == DashboardModeEnum.EditToLive) {
            if (!this.props.widget.isComboWidget) {
                this.props.previewWidgetInLive(this.props.widget.id, 0)
            }
        }
    }
    componentWillReceiveProps(nextProps) {

        if (this.props.dashboardMode == DashboardModeEnum.View || this.props.dashboardMode == DashboardModeEnum.Slider) {
            if (this.props.widget.id != nextProps.widget.id && !nextProps.widget.isComboWidget)
                this.props.pullWidgetData(nextProps.dashboardId, 0)
        }
        else if (this.props.dashboardMode == DashboardModeEnum.EditToLive) {
            if (this.props.widget.id != nextProps.widget.id && !nextProps.widget.isComboWidget) {
                this.props.previewWidgetInLive(nextProps.widget.id, 0);
            }
        }
    }
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

        if (this.props.widget.id == this.props.WidgetIdforHighlight) {
            classToBeApplied += ' highlight ';
            if (this.props.widget.isComboWidget) {
                classToBeApplied += ' zoom-widget ';
            }
        }

        return (
            <div className="widget-wrapper" style={{ height: this.props.widget.height, width: this.props.widget.width + 25 }} >
                {
                    (this.props.showIcons) &&
                    <WidgetHeader {...this.props} />
                }
                <div style={{ height: this.props.widget.height, width: this.props.widget.width }}
                    className={classToBeApplied}>
                    {
                        envconfig.dev &&
                        <div style={{ position: 'absolute', color: 'black' }}>
                            {this.props.widget.id} / {this.props.widget.columnId} / {this.props.widget.rowId}
                        </div>
                    }
                    {
                        this.renderWidget()
                    }
                </div>
            </ div>
        )
    }

    renderWidget() {
        debugger;
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
            case WidgetTypeEnum.Text:
                return (
                    <TextWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetTypeEnum.Picture:
                return (
                    <PictureWidgetContainer {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            case WidgetTypeEnum.Combo:
                return (
                    <ComboWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            default:
                return (
                    <BoxWidgetComponent {...this.props.widget} IsEditing={this.props.showIcons} />
                );
        }
    }
}