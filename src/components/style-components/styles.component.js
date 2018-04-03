import React, { PureComponent } from 'react'
import { WidgetTypeEnum } from '../../shared/enums';
import BoxStyles from './box-styles';
import BarStyles from './bar-styles'
import PieStyles from './pie-styles';
import SpeedoStyles from './speedo-styles';
import ProgressBarStyles from './progress-bar-styles';
import CircularProgressStyles from './circular-progress-styles';
import ClockStyles from './clock-styles';
import TextStyles from './text-styles';
import PictureStyles from './picture-styles';

// import DataMetricsSettingsContainer from '../data-metrics-settings/';

class StylesComponent extends PureComponent {

    render() {
        return (
            <div>
                {this.renderStyles()}
                <div className="">
                    <button
                        type="button"
                        className=" btn btn-sm btn btn-primary"
                        onClick={this.props.updateWidgetStyles}>
                        {this.props.l.t("Save", "Save")}
                    </button>
                </div>
            </div>
        )
    }

    renderStyles() {
        switch (this.props.styles.widgetType) {
            case WidgetTypeEnum.Box:
                return (
                    <BoxStyles {...this.props} />
                );

            case WidgetTypeEnum.Progress:
                return (
                    <ProgressBarStyles {...this.props} />
                    // <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
                );
            case WidgetTypeEnum.Speedo:
                return (
                    <SpeedoStyles {...this.props} />
                );
            case WidgetTypeEnum.Text:
                return (
                    <TextStyles {...this.props} />
                );
            case WidgetTypeEnum.Picture:
                return (
                    <PictureStyles {...this.props} />
                );
            case WidgetTypeEnum.Pie:
                return (
                    <PieStyles  {...this.props} />
                );
            case WidgetTypeEnum.Bar:
                return (
                    <BarStyles  {...this.props} />
                );
            case WidgetTypeEnum.Clock:
                return (
                     <ClockStyles  {...this.props} />
                );
            case WidgetTypeEnum.CircularProgress:
                return (
                     <CircularProgressStyles  {...this.props} />
                );
            case WidgetTypeEnum.Combo:
                return (
                    // <ComboStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                    <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
                );
            default:
                return (
                    <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
                );

        }
    }
}

export default StylesComponent;