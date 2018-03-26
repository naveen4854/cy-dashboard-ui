import React, { PureComponent } from 'react'
import BoxWidget from '../box-widget'
import BarChartWidget from '../bar-chart-widget'

import { DashboardModeEnum, WidgetTypeEnum } from '../../../shared/enums';
import WidgetHeader from '../../widget-header';

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
                    <BoxWidget {...this.props.widget} IsEditing={this.props.showIcons} />
                );
                case WidgetTypeEnum.Bar:
                return (
                    <BarChartWidget {...this.props.widget} IsEditing={this.props.showIcons} />
                );
            default:
                return (
                    <BoxWidget {...this.props.widget} IsEditing={this.props.showIcons} />
                );
        }
    }
}