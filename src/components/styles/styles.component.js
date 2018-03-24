import React, { PureComponent } from 'react'
import { WidgetTypeEnum } from '../../shared/enums';
import BoxStylesContainer from './box-styles';
// import DataMetricsSettingsContainer from '../data-metrics-settings/';

class StylesComponent extends PureComponent {

    componentDidMount(){
        // initialize widget data once.. map widget data onto datametrics
    }

    render() {
        console.log('this.props styles' ,this.props)
        return (
             this.renderStyles()
           
        )
    }

    renderStyles() {
        switch (this.props.styles.widgetType) {
            case WidgetTypeEnum.Box:
            return (
                <BoxStylesContainer />
            );

        case WidgetTypeEnum.Progress:
            return (
                // <ProgressBarStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
            );
        case WidgetTypeEnum.Speedo:
            return (
                // <SpeedoStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
            );
        case WidgetTypeEnum.Text:
            return (
                // <TextStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
            );
        case WidgetTypeEnum.Picture:
            return (
                // <PictureStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
            );
        case WidgetTypeEnum.Pie:
            return (
                // <PieStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
            );
        case WidgetTypeEnum.Bar:
            return (
                // <BarChartStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
            );
        case WidgetTypeEnum.Clock:
            return (
                // <ClockStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
            );
        case WidgetTypeEnum.CircularProgress:
            return (
                // <CircularProgressStyles {...this.state} l={this.props.l} UpdateWidgetStyles={(widget) => this.UpdateWidgetStyles(widget)} />
                <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
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

export default  StylesComponent;