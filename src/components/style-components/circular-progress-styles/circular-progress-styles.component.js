import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker, LabelledToggle, LabelledDurationInput } from '../../labelled-controls';
import { ApplyToOptions } from '../../../shared/enums';

export default class CircularProgressStyles extends PureComponent {

    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateTitleFontStyles = this.updateTitleFontStyles.bind(this);
        this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
        this.updateRefreshInterval = this.updateRefreshInterval.bind(this);
        this.updateWidgetBody = this.updateWidgetBody.bind(this);
        this.updateValueStyles = this.updateValueStyles.bind(this);
        this.updateMinValue = this.updateMinValue.bind(this);
        this.updateMaxValue = this.updateMaxValue.bind(this);
        this.updateShowMaxValueOnWidget = this.updateShowMaxValueOnWidget.bind(this);
        this.updateArcColor = this.updateArcColor.bind(this);
        this.updateArcWidth = this.updateArcWidth.bind(this);
    }


    updateTitle(e) {
        this.props.updateProp('title', e.target.value);
    }
    updateTitleFontStyles(e) {
        this.props.updateProp('titleStyles', e);
    }

    updateWidgetBody(e) {
        this.props.updateProp('widgetBody', e);
    }

    updateBackgroundColor(e) {
        let widgetBody = { ...this.props.styles.widgetBody, backgroundColor: e };
        this.props.updateProp('widgetBody', widgetBody);
    }
    updateRefreshInterval(e) {
        this.props.updateProp('refreshInterval', e.target.value);
    }
    updateValueStyles(e) {
        this.props.updateProp('valueStyles', e);
    }

    updateMinValue(e) {
        this.props.updateProp('min', e);
    }


    updateMaxValue(e) {
        this.props.updateProp('max', e);
    }

    updateShowMaxValueOnWidget(e) {
        this.props.updateProp('showMaxValueOnWidget', e);
    }
    updateArcColor(e) {
        this.props.updateProp('arcColor', e);
    }
    updateArcWidth(e) {
        this.props.updateProp('arcWidth', e.target.value);
    }

    render() {
        console.log('this.props bar', this.props)
        //let displayFormatId = this.props.widget.appliedSettings.dataMetrics.displayFormat ? this.props.widget.appliedSettings.dataMetrics.displayFormat.id : displayFormatEnum.Number;

        return (
            <div className="col-xs-12">
                <div className="form-group">
                    {!this.props.isComboWidget &&
                        <LabelledInput
                            label={this.props.l.t('TitleCOLON', 'Title:')}
                            updateKey='title'
                            value={this.props.styles.title}
                            // className="form-control"
                            onCustomInputChange={this.updateTitle}
                        />
                    }
                    {!this.props.isComboWidget &&
                        <StylesGroup
                            l={this.props.l}
                            fontStyles={this.props.styles.titleStyles}
                            colorLabel={this.props.l.t('Title_colorCOLON', 'Title color:')}
                            fontFamilyLabel={this.props.l.t('Title_fontCOLON', 'Title font:')}
                            fontSizeLabel={this.props.l.t('Title_font_sizeCOLON', 'Title font size:')}
                            onUpdateFontStyles={this.updateTitleFontStyles}
                            id="2"
                            key="2"
                        //updateKey='titleStyles'
                        />
                    }



                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.valueStyles}
                        colorLabel={this.props.l.t('Value_colorCOLON', 'Value color:')}
                        fontFamilyLabel={this.props.l.t('Value_fontCOLON', 'Value font:')}
                        fontSizeLabel={this.props.l.t('Value_font_sizeCOLON', 'Value font size:')}
                        onUpdateFontStyles={this.updateValueStyles}
                        id="valueStyles"
                        key="valueStyles"
                    //updateKey='titleStyles'
                    />

                    {(this.props.styles.selectedApplyTo != ApplyToOptions.Row) &&
                        <div>
                            <LabelledInput
                                label={this.props.l.t('Arc_width', 'Arc width:')}
                                value={this.props.styles.arcWidth}
                                className="form-control"
                                onCustomInputChange={this.updateArcWidth}
                            />
                            <LabelledColorPicker
                                label={this.props.l.t('Arc_colorCOLON', 'Arc color:')}
                                //updateKey='backgroundColor'
                                ColorId="arcColor"
                                ColorKey="arcColor"
                                value={this.props.styles.arcColor}
                                // className="form-control"
                                updateColor={this.updateArcColor}
                            />
                             <hr className='grouping-border'/>
                            <LabelledDurationInput
                                label={this.props.l.t('MinCOLON', 'Min:')}
                                displayFormatId={this.props.displayFormatId}
                                value={this.props.styles.min}
                                wKey='min'
                                enableInput={true}
                                updatePropOnChange={this.updateMinValue}
                            />


                            <LabelledDurationInput
                                label={this.props.l.t('MaxCOLON', 'Max:')}
                                displayFormatId={this.props.displayFormatId}
                                value={this.props.styles.max}
                                wKey='max'
                                enableInput={true}
                                updatePropOnChange={this.updateMaxValue}
                            />

                            <LabelledToggle
                                label={this.props.l.t('Show_Max_ValueCOLON', 'Show Max Value:')}
                                //updateKey='useSelectedBarColor'
                                nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                                checkedNode={this.props.styles.showMaxValueOnWidget}
                                onToggleChange={this.updateShowMaxValueOnWidget}
                            />

                        </div>
                    }
                    <LabelledColorPicker
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
                        //updateKey='backgroundColor'
                        ColorId="444"
                        ColorKey="111"
                        value={this.props.styles.widgetBody.backgroundColor}
                        // className="form-control"
                        updateColor={this.updateBackgroundColor}
                    />

                    {!this.props.isComboWidget &&
                        <LabelledInput
                            label={this.props.l.t('Refresh_interval__in_sec_COLON', 'Refresh interval (in sec):')}
                            value={this.props.styles.refreshInterval}
                            className="form-control"
                            onCustomInputChange={this.updateRefreshInterval}
                        />
                    }


                </div>
            </div>
        )
    }
}