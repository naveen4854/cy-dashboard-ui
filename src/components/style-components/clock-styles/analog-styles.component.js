
import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import { LabelledInput, LabelledColorPicker } from '../../labelled-controls';

export default class AnalogClockStyles extends PureComponent {

    constructor(props) {
        super(props);

        this.updateClockRoundingColor = this.updateClockRoundingColor.bind(this);
        this.updateHourHandColor = this.updateHourHandColor.bind(this);
        this.updateMinuteHandColor = this.updateMinuteHandColor.bind(this);
        this.updateSecondsHandColor = this.updateSecondsHandColor.bind(this);
        this.updateNumbersStyles = this.updateNumbersStyles.bind(this);
    }

    updateClockRoundingColor(e) {
        // let widgetBody = { ...this.props.styles.widgetBody, clockRoundingColor: e };
        this.props.updateClockRoundingColor(e);
    }
    updateHourHandColor(e) {
        let hands = { ...this.props.styles.hands, hourhandcolor: e };
        this.props.updateHandColor(hands);
    }
    updateMinuteHandColor(e) {
        let hands = { ...this.props.styles.hands, minutehandcolor: e };
        this.props.updateHandColor(hands);
    }
    updateSecondsHandColor(e) {
        let hands = { ...this.props.styles.hands, secondsHandColor: e };
        this.props.updateHandColor(hands);
    }
    updateNumbersStyles(e){
        this.props.updateProp('numberStyles', e);
    }
    
    render() {
        return (
            <div className="col-xs-12">
                <div className="form-group">
                    <LabelledColorPicker
                        label={this.props.l.t('Clock_Border_ColorCOLON', 'Clock Border Color:')}
                        ColorId="clockRoundingColor"
                        ColorKey="clockRoundingColor"
                        value={this.props.styles.widgetBody.clockRoundingColor}
                        // className="form-control"
                        updateColor={this.updateClockRoundingColor}
                    />

                    <LabelledColorPicker
                        label={this.props.l.t('Hour_Hand_ColorCOLON', 'Hour Hand Color:')}
                        ColorId="hourhandcolor"
                        ColorKey="hourhandcolor"
                        value={this.props.styles.hands.hourhandcolor}
                        // className="form-control"
                        updateColor={this.updateHourHandColor}
                    />
                    <LabelledColorPicker
                        label={this.props.l.t('Minute_Hand_ColorCOLON', 'Minute Hand Color:')}
                        ColorId="minutehandcolor"
                        ColorKey="minutehandcolor"
                        value={this.props.styles.hands.minutehandcolor}
                        // className="form-control"
                        updateColor={this.updateMinuteHandColor}
                    />
                    <LabelledColorPicker
                        label={this.props.l.t('Seconds_Hand_ColorCOLON', 'Seconds Hand Color:')}
                        ColorId="secondhandcolor"
                        ColorKey="secondhandcolor"
                        value={this.props.styles.hands.secondhandcolor}
                        // className="form-control"
                        updateColor={this.updateSecondsHandColor}
                    />
                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.numberStyles}
                        colorLabel={this.props.l.t('Numbers_Font_ColorCOLON', 'Numbers Font Color:')}
                        fontFamilyLabel={this.props.l.t('Numbers_Font_StyleCOLON', 'Numbers Font Style:')}
                        fontSizeLabel={this.props.l.t('Numbers_Font_SizeCOLON', 'Numbers Font Size:')}
                        onUpdateFontStyles={this.updateNumbersStyles}
                        ColorId="numberStyles"
                        ColorKey="numberStyles"
                    />
                </div>
            </div>
        )
    }
}