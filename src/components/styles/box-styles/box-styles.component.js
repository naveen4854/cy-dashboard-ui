import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { TitleStyles } from '../title-styles';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput } from '../../labelled-input';

export default class BoxStyles extends PureComponent {
    updateBackgroundColor = (e) => {
        let widgetBody = {};
        widgetBody.backgroundColor = e;
        this.props.updateProp(widgetBody, 'widgetBody');
        //  this.props.updateProp(widgetBody, 'widgetBody');
    }
    render() {
        console.log('props box styles ', this.props)
        return (
            <div className="col-xs-12">
                <div className="form-group">
                    <LabelledInput
                        label={this.props.l.t('TitleCOLON', 'Title:')}
                        updateKey='title'
                        value={this.props.styles.title}
                        className="form-control"
                        onCustomInputChange={this.props.updateProp}
                    />
                    <TitleStyles
                        l={this.props.l}
                        fontStyles={this.props.styles.titleStyles}
                        colorLabel={this.props.l.t('Title_colorCOLON', 'Title color:')}
                        fontFamilyLabel={this.props.l.t('Title_fontCOLON', 'Title font:')}
                        fontSizeLabel={this.props.l.t('Title_font_sizeCOLON', 'Title font size:')}
                        onUpdateFontStyles={this.props.updateFontStyles}
                        updateKey='titleStyles'
                    />

                    <TitleStyles
                        l={this.props.l}
                        fontStyles={this.props.styles.valueStyles}
                        colorLabel={this.props.l.t('Value_colorCOLON', 'Value color:')}
                        fontFamilyLabel={this.props.l.t('Value_fontCOLON', 'Value font:')}
                        fontSizeLabel={this.props.l.t('Value_font_sizeCOLON', 'Value font size:')}
                        onUpdateFontStyles={this.props.updateFontStyles}
                        updateKey='valueStyles'
                    />

                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-md-4 rtl-labelContent-xs labelContent-xs labelContent">
                            <label className="control-label inline"> {this.props.l.t('Background_ColorCOLON', 'Background Color:')} </label>
                        </div>
                        <div className="col-xs-9 col-sm-7 col-md-4">
                            <ColorPicker
                                id="1"
                                key="1"
                                value={this.props.styles.widgetBody.backgroundColor}
                                updateColor={this.updateBackgroundColor} />
                        </div>
                    </div>
                    <LabelledInput
                        label={this.props.l.t('Refresh_interval__in_sec_COLON', 'Refresh interval (in sec):')}
                        updateKey='refreshInterval'
                        value={this.props.styles.refreshInterval}
                        className="form-control"
                        onCustomInputChange={this.props.updateProp}
                    />

                </div>
            </div>
        )
    }
}