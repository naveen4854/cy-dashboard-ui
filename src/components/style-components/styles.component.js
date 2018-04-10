import React, { PureComponent } from 'react'
import { WidgetTypeEnum, StatisticCategoryEnum } from '../../shared/enums';
import BoxStyles from './box-styles';
import BarStyles from './bar-styles'
import PieStyles from './pie-styles';
import SpeedoStyles from './speedo-styles';
import ProgressBarStyles from './progress-bar-styles';
import CircularProgressStyles from './circular-progress-styles';
import ClockStyles from './clock-styles';
import TextStyles from './text-styles';
import PictureStyles from './picture-styles';
import ComboStylesComponent from './combo-styles';
import { Constants } from '../../shared/constants';
import ToggleSwitch from '../toggle-switch';
import { LabelledToggle } from '../labelled-controls';

// import DataMetricsSettingsContainer from '../data-metrics-settings/';

class StylesComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.updateApplyToOptions = this.updateApplyToOptions.bind(this);
        this.updateWidgetStyles = this.updateWidgetStyles.bind(this);
    }
    updateApplyToOptions(e) {
        this.props.updateApplyToOptions(e);
    }
    updateWidgetStyles() {
        if (this.props.isComboWidget) {
            this.props.updateMatrixStyles();
        }
        // if (this.props.isColumnHeader) {
        //     this.props.updateMatrixStylesByColumn();
        // }
        // else if (this.props.isRowHeader) {
        //     this.props.updateMatrixStylesByRow();
        // }
        else {
            this.props.updateWidgetStyles();
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.isComboWidget &&
                    this.renderApplyOptions()
                }
                {this.renderStyles()}
                <button
                    disabled={this.props.styles.disableSave}
                    type="button"
                    className=" btn btn-sm btn btn-primary"
                    onClick={this.updateWidgetStyles}>
                    {this.props.l.t("Save", "Save")}
                </button>
            </div>
        )
    }
    renderApplyOptions() {
        let applyToOptions = this.props.isColumnHeader ? Constants.ColumnStyleOptions : this.props.isRowHeader ? Constants.RowStyleOptions : Constants.AllStyleOptions;
        if (this.props.selectedStatisticCategory == StatisticCategoryEnum.Custom)
            applyToOptions = Constants.AllStyleOptions;
        return <LabelledToggle
            label={this.props.l.t('Apply_toCOLON', 'Apply to:')}
            //updateKey='useSelectedBarColor'
            nodes={applyToOptions}
            checkedNode={this.props.styles.selectedApplyTo}
            onToggleChange={this.updateApplyToOptions}
        />
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
                    <ComboStylesComponent {...this.props} />
                );
            default:
                return (
                    <div>{this.props.l.t('Sytles_not_present_for_this_widget', 'Sytles not present for this widget')}</div>
                );

        }
    }
}

export default StylesComponent;