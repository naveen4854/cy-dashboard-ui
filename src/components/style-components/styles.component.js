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
        this.updateApplyComboStyles = this.updateApplyComboStyles.bind(this);
    }
    updateApplyToOptions(e) {
        this.props.updateApplyToOptions(e);
    }
    updateWidgetStyles() {
        if (this.props.isComboWidget)
            return this.props.updateMatrixStyles();

        if (this.props.widgetType === WidgetTypeEnum.Combo)
            return this.props.updateComboStyles();

        return this.props.updateWidgetStyles();
    }
    updateApplyComboStyles(e) {
        if (this.props.isComboWidget) {
            this.props.updateApplyComboStyles(e);
        }
    }

    render() {
        return (
            <div>
                <div className=" row ">
                    <div className="col-xs-11 pull-left rtl-pull-right text-right rtl-text-right" style={{ marginTop: '10px' }} >

                        <button
                            disabled={this.props.styles.disableSave}
                            type="button"
                            className="btn btn-md btn-primary"
                            onClick={this.updateWidgetStyles}>
                            {this.props.l.t("Apply", "Apply")}
                        </button>
                    </div>
                </div>
                <div className="calculatedVH" >
                    {
                        this.props.isComboWidget &&
                        this.renderApplyOptions()
                    }
                    {
                        this.props.isComboWidget &&
                        this.renderApplyComboStyles()
                    }
                    {this.renderStyles()}

                </div>
            </div>
        )
    }
    renderApplyOptions() {
        let applyToOptions = this.props.isColumnHeader ? Constants.ColumnStyleOptions : this.props.isRowHeader ? Constants.RowStyleOptions : Constants.AllStyleOptions;
        
        if(this.props.isColumnHeader && this.props.isRowHeader){
            applyToOptions = Constants.ColumnStyleOptions;
        }

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
    renderApplyComboStyles() {
        return <LabelledToggle
            label={this.props.l.t('Apply_Combo_StylesCOLON', 'Apply Combo Styles:')}
            nodes={Constants.YesNoOptions}
            checkedNode={this.props.styles.applyComboStyles}
            onToggleChange={this.updateApplyComboStyles}
        />
    }
    renderStyles() {
        switch (this.props.widgetType) {
            case WidgetTypeEnum.Box:
                return (
                    <BoxStyles {...this.props} />
                );

            case WidgetTypeEnum.Progress:
                return (
                    <ProgressBarStyles {...this.props} />
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