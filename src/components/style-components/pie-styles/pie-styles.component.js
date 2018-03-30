import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker, LabelledToggle, LabelledDurationInput } from '../../labelled-controls';

export default class PieStyles extends PureComponent {

    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateTitleFontStyles = this.updateTitleFontStyles.bind(this);
        this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
        this.updateRefreshInterval = this.updateRefreshInterval.bind(this);
        this.updateShowLegends = this.updateShowLegends.bind(this);
        this.updateShowLabels = this.updateShowLabels.bind(this);
        this.updateWidgetBody = this.updateWidgetBody.bind(this);

        
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
    updateRefreshInterval(e) {
        this.props.updateProp('refreshInterval', e.target.value);
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
                        id="2"
                        key="2"
                    //updateKey='titleStyles'
                    />



                    <LabelledColorPicker
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
                        //updateKey='backgroundColor'
                        id="111"
                        key="111"
                        value={this.props.styles.widgetBody.backgroundColor}
                        // className="form-control"
                        updateColor={this.updateBackgroundColor}
                    />
                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.widgetBody}
                        colorLabel={this.props.l.t('Text_colorCOLON', 'Text color:')}
                        fontFamilyLabel= {this.props.l.t('Label_font_sizeCOLON', 'Label font size:')}
                        fontSizeLabel={this.props.l.t('Label_font_styleCOLON', 'Label font style:')}
                        onUpdateFontStyles={this.updateWidgetBody}
                        id="1"
                        key="1"
                    //updateKey='titleStyles'
                    />

                    <LabelledToggle
                        label={this.props.l.t('Show_legendCOLON', 'Show legend:')}
                        //updateKey='useSelectedBarColor'
                        nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        checkedNode={this.props.styles.showLegends}
                        onToggleChange={this.updateShowLegends}
                    />

                    <LabelledToggle
                        label={this.props.l.t('Show_labelsCOLON', 'Show labels:')}
                        //updateKey='useSelectedBarColor'
                        nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        checkedNode={this.props.styles.showLabels}
                        onToggleChange={this.updateShowLabels}
                    />
                    <LabelledInput
                        label={this.props.l.t('Refresh_interval__in_sec_COLON', 'Refresh interval (in sec):')}
                        value={this.props.styles.refreshInterval}
                        className="form-control"
                        onCustomInputChange={this.updateRefreshInterval}
                    />

                </div>
            </div>
        )
    }
}