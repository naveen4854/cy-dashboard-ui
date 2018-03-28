import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker, LabelledToggle, LabelledDurationInput } from '../../labelled-controls';

export default class BarStyles extends PureComponent {

    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateTitleFontStyles = this.updateTitleFontStyles.bind(this);
        this.updateBarStyles = this.updateBarStyles.bind(this);
        this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
        this.updateRefreshInterval = this.updateRefreshInterval.bind(this);
        this.updateUseSelectedBarColor = this.updateUseSelectedBarColor.bind(this);
        this.updateBarColor = this.updateBarColor.bind(this);
        this.updateYAxisStyles = this.updateYAxisStyles.bind(this);
        this.updateXAxisStyles = this.updateXAxisStyles.bind(this);
        this.updateEnableMin = this.updateEnableMin.bind(this);
    }


    updateTitle(e) {
        this.props.updateProp('title', e.target.value);
    }
    updateTitleFontStyles(e) {
        this.props.updateProp('titleStyles', e);
    }
    updateBarStyles(e) {
        this.props.updateProp('barStyles', e);
    }
    updateBackgroundColor(e) {
        let widgetBody = { ...this.props.styles.widgetBody, backgroundColor: e };
        //widgetBody.backgroundColor = e;
        this.props.updateProp('widgetBody', widgetBody);
    }
    updateRefreshInterval(e) {
        this.props.updateProp('refreshInterval', e.target.value);
    }
    updateUseSelectedBarColor(selectedValue) {
        this.props.updateProp('useSelectedBarColor', selectedValue);
    }
    updateBarColor(e) {
        let widgetBody = { ...this.props.styles.barStyles, backgroundColor: e };
        this.props.updateProp('barStyles', widgetBody);
    }
    updateYAxisStyles(e) {
        // let widgetBody = { ...this.props.styles.yAxisStyles, backgroundColor: e };
        this.props.updateProp('yAxisStyles', e);
    }

    updateXAxisStyles(e) {
        //let widgetBody = { ...this.props.styles.yAxisStyles, backgroundColor: e };
        this.props.updateProp('xAxisStyles', e);
    }
    updateEnableMin(e) {
        //let widgetBody = { ...this.props.styles.yAxisStyles, backgroundColor: e };
        this.props.updateProp('enableMin', e);
    }

    render() {
        console.log('this.props bar', this.props)
        //let displayFormatId = this.props.widget.appliedSettings.dataMetrics.displayFormat ? this.props.widget.appliedSettings.dataMetrics.displayFormat.id : displayFormatEnum.Number;

        return (
            <div className="col-xs-12">
                <div className="form-group">
                    <LabelledInput
                        label={this.props.l.t('TitleCOLON', 'Title:')}
                        updateKey='title'
                        value={this.props.styles.title}
                        // className="form-control"
                        onCustomInputChange={this.updateTitle}
                    />
                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.titleStyles}
                        colorLabel={this.props.l.t('Title_colorCOLON', 'Title color:')}
                        fontFamilyLabel={this.props.l.t('Title_fontCOLON', 'Title font:')}
                        fontSizeLabel={this.props.l.t('Title_font_sizeCOLON', 'Title font size:')}
                        onUpdateFontStyles={this.updateTitleFontStyles}
                    //updateKey='titleStyles'
                    />

                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.barStyles}
                        colorLabel={this.props.l.t('Value_colorCOLON', 'Value color:')}
                        fontFamilyLabel={this.props.l.t('Value_fontCOLON', 'Value font:')}
                        fontSizeLabel={this.props.l.t('Value_font_sizeCOLON', 'Value font size:')}
                        onUpdateFontStyles={this.updateBarStyles}
                    //updateKey='barStyles'
                    />
                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.yAxisStyles}
                        colorLabel={this.props.l.t("Y-Axis text color:", "Y-Axis text color:")}
                        fontFamilyLabel={this.props.l.t("Y-Axis font style:", "Y-Axis font style:")}
                        fontSizeLabel={this.props.l.t("Y-Axis font size:", "Y-Axis font size:")}
                        onUpdateFontStyles={this.updateYAxisStyles}
                    //updateKey='barStyles'
                    />

                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.xAxisStyles}
                        colorLabel={this.props.l.t("X-Axis text color:", "X-Axis text color:")}
                        fontFamilyLabel={this.props.l.t("X-Axis font style:", "X-Axis font style:")}
                        fontSizeLabel={this.props.l.t("X-Axis font size:", " X-Axis font size:")}
                        onUpdateFontStyles={this.updateXAxisStyles}
                    //updateKey='barStyles'
                    />
                    <LabelledToggle
                        label={this.props.l.t('Enable_min_valueCOLON', 'Enable min value:')}
                        //updateKey='useSelectedBarColor'
                        nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        checkedNode={this.props.styles.enableMin}
                        onToggleChange={this.updateEnableMin}
                    />


                    {/* <LabelledDurationInput
                        label={this.props.l.t('MinCOLON', 'Min:')}
                        displayFormatId={displayFormatId}
                        value={this.props.styles.min}
                        wKey='min'
                        enableInput={this.props.styles.enableMin}
                        updatePropOnChange={this.updateProp}
                    /> */}




                    <LabelledColorPicker
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
                        //updateKey='backgroundColor'
                        id="111"
                        key="111"
                        value={this.props.styles.widgetBody.backgroundColor}
                        // className="form-control"
                        updateColor={this.updateBackgroundColor}
                    />

                    <LabelledToggle
                        label={this.props.l.t("Use selected bar color:", "Use selected bar color:")}
                        //updateKey='useSelectedBarColor'
                        nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        checkedNode={this.props.styles.useSelectedBarColor}
                        onToggleChange={this.updateUseSelectedBarColor}
                    />


                    <LabelledColorPicker
                        label={this.props.l.t("Bar color:", "Bar color:")}
                        //updateKey='backgroundColor'
                        id="222"
                        key="222"
                        //disabled={!this.state.widget.useSelectedBarColor}
                        value={this.props.styles.barStyles.backgroundColor}
                        // className="form-control"
                        updateColor={this.updateBarColor}
                    />


                </div>
            </div>
        )
    }
}