import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import AnalogClockStyles from './analog-styles.component';
import DigitalClockStyles from './digital-styles.component';
import { LabelledInput, LabelledColorPicker } from '../../labelled-controls';

export default class ClockStyles extends PureComponent {

    constructor(props) {
        super(props);
        this.updateClockbackgroundColor = this.updateClockbackgroundColor.bind(this);
        this.updateClockOuterbackgroundColor = this.updateClockOuterbackgroundColor.bind(this);

        this.updateTimezoneStyles = this.updateTimezoneStyles.bind(this);
    }

    updateClockbackgroundColor(e) {
        let widgetBody = { ...this.props.styles.widgetBody, clockbackgroundColor: e };
        this.props.updateProp('widgetBody', widgetBody);
    }
    updateClockOuterbackgroundColor(e) {
        let widgetBody = { ...this.props.styles.widgetBody, clockOuterbackgroundColor: e };
        this.props.updateProp('widgetBody', widgetBody);
    }
    updateTimezoneStyles(e) {
        this.props.updateProp('timezoneStyles', e);
    }

    render() {
        return (
            <div className="col-xs-12">
                <div className="form-group">
                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.timezoneStyles}
                        colorLabel={this.props.l.t('Time_Zone_Font_ColorCOLON', 'Time Zone Font Color:')}
                        fontFamilyLabel={this.props.l.t('Time_Zone_fontCOLON', 'Time Zone font:')}
                        fontSizeLabel={this.props.l.t('Time_Zone_Font_SizeCOLON', 'Time Zone Font Size:')}
                        onUpdateFontStyles={this.updateTimezoneStyles}
                        ColorId="timezoneStyles"
                        ColorKey="timezoneStyles"
                    />
                    {
                        this.props.isAnalog ? <AnalogClockStyles {...this.props} /> : <DigitalClockStyles {...this.props} />
                    }
                    <LabelledColorPicker
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
                        ColorId="clockbackgroundColor"
                        ColorKey="clockbackgroundColor"
                        value={this.props.styles.widgetBody.clockbackgroundColor}
                        // className="form-control"
                        updateColor={this.updateClockbackgroundColor}
                    />
                    <LabelledColorPicker
                        label={this.props.l.t('Outer_Background_ColorCOLON', 'Outer Background Color:')}
                        ColorId="clockOuterbackgroundColor"
                        ColorKey="clockOuterbackgroundColor"
                        value={this.props.styles.widgetBody.clockOuterbackgroundColor}
                        // className="form-control"
                        updateColor={this.updateClockOuterbackgroundColor}
                    />

                </div>
            </div>
        )
    }
}