import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker } from '../../labelled-controls';
import { ApplyToOptions } from '../../../shared/enums';

export default class BoxStyles extends PureComponent {

    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateTitleFontStyles = this.updateTitleFontStyles.bind(this);
        this.updateValueFontStyles = this.updateValueFontStyles.bind(this);
        this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
        this.updateRefreshInterval = this.updateRefreshInterval.bind(this);
    }

    updateTitle(e) {
        this.props.updateProp('title', e.target.value);
    }
    updateTitleFontStyles(e) {
        this.props.updateProp('titleStyles', e);
    }
    updateValueFontStyles(e) {
        this.props.updateProp('valueStyles', e);
    }
    updateBackgroundColor(e) {
        let widgetBody = { ...this.props.styles.widgetBody, backgroundColor: e };
        this.props.updateProp('widgetBody', widgetBody);
    }
    updateRefreshInterval(e) {
        this.props.updateProp('refreshInterval', e.target.value);
    }

    render() {
        return (
            <div className="col-xs-12">
                <div className="form-group">
                    {!this.props.isComboWidget &&
                        <LabelledInput
                            label={this.props.l.t('TitleCOLON', 'Title:')}
                            // updateKey='title'
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
                            id="1"
                            key="1"
                        />
                    }
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

                    <LabelledColorPicker className={this.props.isComboWidget ? 'grouping-border' : 'grouping-border'}
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
                        ColorId="1"
                        ColorKey="1"
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