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

import '../styles.css'

export default class WidgetComponent extends PureComponent {

    constructor(props) {
        super(props);
        //debugger
        // console.log('constructor ', this.props.widget.refreshInterval)
        //this.props.pullWidgetData(this.props.dashboardId, this.props.widget.id, this.props.widget.refreshInterval)
    }
    componentWillReceiveProps(nextProps) {
        // console.log('receive props')
        // if(this.props.widget.id != nextProps.widget.id)
        // this.props.pullWidgetData(nextProps.dashboardId, nextProps.widget.id,  nextProps.widget.refreshInterval)
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

        if (this.props.widget.highlight) {
            classToBeApplied += ' highlight ';
            if (this.props.widget.isComboWidget) {
                classToBeApplied += ' zoom-widget ';
            }
        }

        return (

            <div style={{ height: this.props.widget.height, width: this.props.widget.width }}
                className={classToBeApplied}>
                <div style={{ position: 'absolute', color: 'black' }}>{this.props.widget.id}</div>
                {
                    (this.props.showIcons) &&
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