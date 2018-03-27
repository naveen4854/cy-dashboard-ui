import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker, LabelledToggle } from '../../labelled-controls';

export default class BarStyles extends PureComponent {
    // updateBackgroundColor = (e) => {
    //     let widgetBody = {};
    //     widgetBody.backgroundColor = e;
    //     this.props.updateProp(widgetBody, 'widgetBody');
    //     //  this.props.updateProp(widgetBody, 'widgetBody');
    // }
    render() { 
        console.log('this.props bar', this.props)
        return (
            <div className="col-xs-12">
                <div className="form-group">
                    <LabelledInput
                        label={this.props.l.t('TitleCOLON', 'Title:')}
                        updateKey='title'
                        value={this.props.styles.title}
                        // className="form-control"
                        onCustomInputChange={this.props.updateProp.bind(null, 'title','title1' )}
                    />
                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.titleStyles}
                        colorLabel={this.props.l.t('Title_colorCOLON', 'Title color:')}
                        fontFamilyLabel={this.props.l.t('Title_fontCOLON', 'Title font:')}
                        fontSizeLabel={this.props.l.t('Title_font_sizeCOLON', 'Title font size:')}
                        onUpdateFontStyles={this.props.updateFontStyles}
                        updateKey='titleStyles'
                    />

                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.barStyles}
                        colorLabel={this.props.l.t('Value_colorCOLON', 'Value color:')}
                        fontFamilyLabel={this.props.l.t('Value_fontCOLON', 'Value font:')}
                        fontSizeLabel={this.props.l.t('Value_font_sizeCOLON', 'Value font size:')}
                        onUpdateFontStyles={this.props.updateFontStyles}
                        updateKey='barStyles'
                    />

                    <LabelledColorPicker
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
                        updateKey='backgroundColor'
                        id="1"
                        key="1"
                        value={this.props.styles.widgetBody.backgroundColor}
                        // className="form-control"
                        updateColor={this.props.updateBackgroundColor}
                    />
 
                    <LabelledToggle 
                        label={this.props.l.t("Use selected bar color:", "Use selected bar color:")}
                        updateKey='useSelectedBarColor'
                        nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        checkedNode={this.props.styles.useSelectedBarColor}
                        onToggleChange={this.props.updateProp.bind(this,'useSelectedBarColor')}
                    />
                    {/* <ToggleSwitch
                        className="form-control"
                        nodes={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        checkedNode={this.state.widget.useSelectedBarColor}
                        onChange={(e) => this.updateProp(e, "useSelectedBarColor")}
                    /> */}

                </div>
            </div>
        )
    }
}