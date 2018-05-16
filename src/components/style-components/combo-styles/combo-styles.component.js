import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker, LabelledToggle, LabelledDurationInput } from '../../labelled-controls';

export default class ComboStyles extends PureComponent {

    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateRefreshInterval = this.updateRefreshInterval.bind(this);
        this.updateValueFontStyles = this.updateValueFontStyles.bind(this);
        this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
    }


    updateTitle(e) {
        this.props.updateProp('title', e.target.value);
    }

    updateRefreshInterval(e) {
        this.props.updateProp('refreshInterval', e.target.value);
    }
    updateValueFontStyles(e) {
        this.props.updateProp('valueStyles', e);
    }
    updateBackgroundColor(e) {
        let widgetBody = { ...this.props.styles.widgetBody, backgroundColor: e };
        this.props.updateProp('widgetBody', widgetBody);
    }
    // setRefreshInterval(e){
    //     this.props.updateProp('refreshInterval', this.props.styles.refreshInterval);
    // }
    render() {
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
                    {/* <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.titleStyles}
                        colorLabel={this.props.l.t('Title_colorCOLON', 'Title color:')}
                        fontFamilyLabel={this.props.l.t('Title_fontCOLON', 'Title font:')}
                        fontSizeLabel={this.props.l.t('Title_font_sizeCOLON', 'Title font size:')}
                        onUpdateFontStyles={this.updateTitleFontStyles}
                        id="1"
                        key="1"
                    //updateKey='titleStyles'
                    /> */}

                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.valueStyles}
                        colorLabel={this.props.l.t('Value_colorCOLON', 'Value color:')}
                        fontFamilyLabel={this.props.l.t('Value_fontCOLON', 'Value font:')}
                        fontSizeLabel={this.props.l.t('Value_font_sizeCOLON', 'Value font size:')}
                        onUpdateFontStyles={this.updateValueFontStyles}
                        id="2"
                        key="2"
                    />


                    <LabelledColorPicker
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
                        //updateKey='backgroundColor'
                        ColorId="111"
                        ColorKey="111"
                        value={this.props.styles.widgetBody.backgroundColor}
                        // className="form-control"
                        updateColor={this.updateBackgroundColor}
                    />


                    <LabelledInput
                        label={this.props.l.t('Refresh_interval__in_sec_COLON', 'Refresh interval (in sec):')}
                        value={this.props.styles.refreshInterval}
                        className="form-control"
                        onCustomInputChange={this.updateRefreshInterval}
                    />
                    {/* <button
                        disabled={this.props.styles.disableSave}
                        type="button"
                        className="btn btn-md btn-primary"
                        onClick={this.setRefreshInterval}>
                        {this.props.l.t("Set Refresh Interval", "Set Refresh Interval")}
                    </button> */}
                </div>
            </div>
        )
    }
}