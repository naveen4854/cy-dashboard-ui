import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker, LabelledToggle, LabelledDurationInput } from '../../labelled-controls';
import { ApplyToOptions } from '../../../shared/enums';

export default class SpeedoStyles extends PureComponent {

    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateTitleFontStyles = this.updateTitleFontStyles.bind(this);
        this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
        this.updateRefreshInterval = this.updateRefreshInterval.bind(this);
        this.updateShowLegends = this.updateShowLegends.bind(this);
        this.updateShowLabels = this.updateShowLabels.bind(this);
        this.updateWidgetBody = this.updateWidgetBody.bind(this);
        this.updateFirstSegmentColor = this.updateFirstSegmentColor.bind(this);
        this.updateSecondSegmentColor = this.updateSecondSegmentColor.bind(this);
        this.updateThirdSegmentColor = this.updateThirdSegmentColor.bind(this);
        this.updateValueStyles = this.updateValueStyles.bind(this);
        this.updateMinValue = this.updateMinValue.bind(this);
        this.updateMaxValue = this.updateMaxValue.bind(this);
        this.updateRangeValueStyles = this.updateRangeValueStyles.bind(this);


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
        //widgetBody.backgroundColor = e;
        this.props.updateProp('widgetBody', widgetBody);
    }
    updateRefreshInterval(e) {
        this.props.updateProp('refreshInterval', e.target.value);
    }
    updateShowLegends(e) {
        this.props.updateProp('showLegends', e);
    }
    updateShowLabels(e) {
        this.props.updateProp('showLabels', e);
    }
    updateFirstSegmentColor(e) {
        this.props.updateProp('segmentColors', this.getUpdatedSegmentColors(e, 0));
    }

    updateSecondSegmentColor(e) {
        this.props.updateProp('segmentColors', this.getUpdatedSegmentColors(e, 1));
    }

    updateThirdSegmentColor(e) {
        this.props.updateProp('segmentColors', this.getUpdatedSegmentColors(e, 2));
    }
    updateValueStyles(e) {
        this.props.updateProp('valueStyles', e);
    }
    updateRangeValueStyles(e) {
        this.props.updateProp('rangeValueStyles', e);
    }
    getUpdatedSegmentColors(color, index) {
        let segments = this.props.styles.segmentColors;
        let updatedSegments = segments.map((eachSegment, segmentIndex) => {
            if (segmentIndex !== index) {
                return eachSegment;
            }
            return {
                ...color
            };
        });

        return updatedSegments;
    }


    updateMinValue(e) {
        this.props.updateProp('min', e);
    }


    updateMaxValue(e) {
        this.props.updateProp('max', e);
    }

    render() {
        console.log('this.props bar', this.props)
        //let displayFormatId = this.props.widget.appliedSettings.dataMetrics.displayFormat ? this.props.widget.appliedSettings.dataMetrics.displayFormat.id : displayFormatEnum.Number;
        return (
            <div className="col-xs-12">
                <div className="form-group">

                    {!this.props.isComboWidget &&
                        <div><LabelledInput
                            label={this.props.l.t('TitleCOLON', 'Title:')}
                            updateColorKey='title'
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
                                ColorId="2"
                                ColorKey="2"
                            />
                        </div>
                    }
                    {(this.props.styles.selectedApplyTo != ApplyToOptions.Row) &&
                        <div>
                            <LabelledColorPicker
                                label={this.props.l.t('Segment_Color_1COLON', 'Segment Color 1:')}
                                ColorId="segmentColors0"
                                ColorKey="segmentColors0"
                                value={this.props.styles.segmentColors[0]}
                                // className="form-control"
                                updateColor={this.updateFirstSegmentColor}
                            />
                            <LabelledColorPicker
                                label={this.props.l.t('Segment_Color_2COLON', 'Segment Color 2:')}
                                ColorId="segmentColors1"
                                ColorKey="segmentColors1"
                                value={this.props.styles.segmentColors[1]}
                                // className="form-control"
                                updateColor={this.updateSecondSegmentColor}
                            />
                            <LabelledColorPicker
                                label={this.props.l.t('Segment_Color_3COLON', 'Segment Color 3:')}
                                ColorId="segmentColors2"
                                ColorKey="segmentColors2"
                                value={this.props.styles.segmentColors[2]}
                                // className="form-control"
                                updateColor={this.updateThirdSegmentColor}
                            />
                            <hr className='grouping-border' />
                        </div>
                    }



                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.valueStyles}
                        colorLabel={this.props.l.t('Value_colorCOLON', 'Value color:')}
                        fontFamilyLabel={this.props.l.t('Value_fontCOLON', 'Value font:')}
                        fontSizeLabel={this.props.l.t('Value_font_sizeCOLON', 'Value font size:')}
                        onUpdateFontStyles={this.updateValueStyles}
                        ColorId="valueStyles"
                        ColorKey="valueStyles"
                    />

                    {(this.props.styles.selectedApplyTo != ApplyToOptions.Row) &&
                        <div>
                            <StylesGroup
                                l={this.props.l}
                                fontStyles={this.props.styles.rangeValueStyles}
                                colorLabel={this.props.l.t('Range_colorCOLON', 'Range color:')}
                                fontFamilyLabel={this.props.l.t('Range_fontCOLON', 'Range font:')}
                                fontSizeLabel={this.props.l.t('Range_font_sizeCOLON', 'Range font size:')}
                                onUpdateFontStyles={this.updateRangeValueStyles}
                                ColorId="rangeValueStyles"
                                ColorKey="rangeValueStyles"
                            />
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
                        </div>
                    }
                    <LabelledColorPicker
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
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