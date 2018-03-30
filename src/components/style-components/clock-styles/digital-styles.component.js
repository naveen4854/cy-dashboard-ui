
import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker } from '../../labelled-controls';

export default class DigitalClockStyles extends PureComponent {
 
    constructor(props){
        super(props);
        this.updateDaysStyles = this.updateDaysStyles.bind(this);
        this.updateCurrentDayColor = this.updateCurrentDayColor.bind(this);
        this.updateDateStyles = this.updateDateStyles.bind(this);
        this.updateTimeStyles = this.updateTimeStyles.bind(this);
    }

    updateDaysStyles(e){
        this.props.updateProp('DaysStyles', e);
    }
    updateCurrentDayColor(e){
        this.props.updateProp('CurrentDayColor', e);
    }
    updateDateStyles(e){
        this.props.updateProp('DateStyles', e);
    }
    updateTimeStyles(e){
        this.props.updateProp('TimeStyles', e);
    }

    render() {
        return (
            <div className="col-xs-12">
                <div className="form-group">
                
                <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.DaysStyles}
                        colorLabel= {this.props.l.t('Days_Font_ColorCOLON', 'Days Font Color:')}
                        fontFamilyLabel= {this.props.l.t('Days_Font_StyleCOLON', 'Days Font Style:')}
                        fontSizeLabel= {this.props.l.t('Days_Font_SizeCOLON', 'Days Font Size:')}
                        onUpdateFontStyles={this.updateDaysStyles}
                        id="DaysStyles"
                        key="DaysStyles"
                    />
 
                     <LabelledColorPicker
                        label= {this.props.l.t('Current_Day_Font_ColorCOLON', 'Current Day Font Color:')}
                        id="CurrentDayColor"
                        key="CurrentDayColor"
                        value={this.props.styles.CurrentDayColor}
                        // className="form-control"
                        updateColor={this.updateCurrentDayColor}
                    />
                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.DateStyles}
                        colorLabel={this.props.l.t('Date_Font_ColorCOLON', 'Date Font Color:')}
                        fontFamilyLabel={this.props.l.t('Date_Font_StyleCOLON', 'Date Font Style:')}
                        fontSizeLabel={this.props.l.t('Date_Font_SizeCOLON', 'Date Font Size:')}
                        onUpdateFontStyles={this.updateDateStyles}
                        id="DateStyles"
                        key="DateStyles"
                    />

                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.TimeStyles}
                        colorLabel={this.props.l.t('Time_Font_ColorCOLON', 'Time Font Color:')}
                        fontFamilyLabel={this.props.l.t('Time_Font_StyleCOLON', 'Time Font Style:')} 
                        fontSizeLabel={this.props.l.t('Time_Font_SizeCOLON', 'Time Font Size:')} 
                        onUpdateFontStyles={this.updateTimeStyles}
                        id="TimeStyles"
                        key="TimeStyles"
                    />

                    <LabelledColorPicker
                        label={this.props.l.t('Background_ColorCOLON', 'Background Color:')}
                        id="1"
                        key="1"
                        value={this.props.styles.widgetBody.backgroundColor}
                        // className="form-control"
                        updateColor={this.updateClockbackgroundColor}
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