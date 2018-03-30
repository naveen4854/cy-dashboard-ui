import React, { PureComponent } from 'react'
import AnalogClockWidgetComponent from './analog-clock';
import { utils } from '../../../utilities';
import { Color } from "../../../shared/lib";

export default class ClockWidgetComponent extends PureComponent {
    render() {
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = {
            ClockbackgroundColor: Color.ToString(widgetBody.ClockbackgroundColor),
            ClockOuterbackgroundColor: Color.ToString(widgetBody.ClockOuterbackgroundColor),
            clockRoundingColor: Color.ToString(widgetBody.clockRoundingColor)
        }
        let timezoneStyles = utils.stylesObjToCss(this.props.timezoneStyles)
        let numberStyles = utils.stylesObjToCss(this.props.numberStyles)
        let daysStyles = utils.stylesObjToCss(this.props.daysStyles)
        let dateStyles = utils.stylesObjToCss(this.props.dateStyles)
        let timeStyles = utils.stylesObjToCss(this.props.timeStyles)

        let hands = {
            secondhandcolor: Color.ToString(this.props.hands.secondhandcolor),
            minutehandcolor: Color.ToString(this.props.hands.minutehandcolor),
            hourhandcolor: Color.ToString(this.props.hands.hourhandcolor)
        }
        return (
            this.props.isAnalog ?
                <AnalogClockWidgetComponent {...this.props}
                    widgetBodyStyles={widgetBodyStyles}
                    timezoneStyles={timezoneStyles}
                    numberStyles={numberStyles}
                    daysStyles={daysStyles}
                    dateStyles={dateStyles}
                    timeStyles={timeStyles}
                    hands={hands}
                />
                :
                <h1>DigitalWidgetComponent</h1>
        )
    }
}