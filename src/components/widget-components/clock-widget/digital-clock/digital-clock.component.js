import React, { PureComponent } from 'react'
import { DateZone } from '../../../../shared/lib';

export default class DigitalClockComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        setTimeout(() => {
            this.loadInterval = setInterval(() => {
                const
                    takeTwelve = (n, h) => n > 12 ? n - h : n,
                    addZero = n => n < 10 ? "0" + n : n;
                let dateTime, h, m, s, t, amPm;
                var k = this.props.selectedHoursFormat == 1 ? 0 : 12;
                dateTime = DateZone.timezoneDate(this.props.selectedTimeZoneItem);
                // console.log(d, 'digital',this.props.selectedTimeZoneItem.tz)
                h = addZero(takeTwelve(dateTime.getHours(), k));
                m = addZero(dateTime.getMinutes());
                s = addZero(dateTime.getSeconds());
                t = this.props.selectedTimeFormat == 1 ? `${h}:${m}:${s}` : `${h}:${m}`;

                amPm = dateTime.getHours() >= 12 ? "PM" : "AM";
                this.loadInterval && this.setState({
                    time: { h, m, s },
                    amPm: this.props.selectedHoursFormat == 1 ? "" : amPm,
                });
            }, 1000);
        }, 1000 - DateZone.timezoneDate(this.props.selectedTimeZoneItem).getUTCMilliseconds())
    }

    componentWillUnmount() {
        this.loadInterval && clearInterval(this.loadInterval);
    }


    render() {
        return (
            < div className="container-fluid text-center" style={{ height: '100%' }} >
                <div className="row" style={{ height: '100%', backgroundColor: this.props.widgetBodyStyles.ClockOuterbackgroundColor }}>
                    <div className="col-xs-12 padding-none" style={{ height: '100%' }}>
                        <div className="clock" style={{ height: '100%' }}>
                            <div id="clockTitle" style={{ fontSize: this.props.timezoneStyles.fontSize, color: this.props.timezoneStyles.color, fontFamily: this.props.timezoneStyles.fontFamily }} className="clock-title">
                                <p>{this.props.title}</p>
                            </div>
                            <div className="inside" style={{ backgroundColor: this.props.widgetBodyStyles.ClockbackgroundColor }}>
                                <div className="content">
                                    {
                                        this.props.displayDays ? <p className='days' style={{ fontSize: this.props.daysStyles.fontSize }}>
                                            {
                                                _.map(this.props.days, (day, i) => {
                                                    return <span key={i} style={{ color: i == this.props.currentDay ? this.props.currentDayColor : this.props.daysStyles.color }}>{day}</span>
                                                })
                                            }
                                        </p> : null
                                    }
                                    {
                                        this.state.time ? <p className='time' style={{ fontSize: this.props.timeStyles.fontSize, color: this.props.timeStyles.color }}>
                                            <span id='hours'>{this.state.time.h}</span>
                                            <span className="separator">:</span>
                                            <span id='min'>{this.state.time.m}</span>
                                            {
                                                this.state.selectedTimeFormat == 1 ? <span>
                                                    <span className="separator">:</span>
                                                    <span id='sec'>{this.state.time.s}</span>
                                                </span> : ""
                                            }
                                            <span id='period'>{this.state.amPm}</span>
                                        </p> : null
                                    }
                                    {
                                        this.props.displayDate ?
                                            <p className='date' style={{ fontSize: this.props.dateStyles.fontSize, color: this.props.dateStyles.color }} >
                                                <span id='cal'>
                                                    <i className="fa fa-calendar fa-lg"></i>
                                                </span>
                                                {this.props.digitalDate}
                                            </p> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
