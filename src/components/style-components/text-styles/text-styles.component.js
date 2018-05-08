import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component'
import { StylesGroup } from '../styles-group';
import ColorPicker from '../../color-picker/color-picker';
import { LabelledInput, LabelledColorPicker, LabelledTextArea, LabelledCustomSelect } from '../../labelled-controls';
import {scrollType} from '../../../shared/constants';

export default class TextStyles extends PureComponent {

    constructor(props) {
        super(props);
        debugger;
        this.updateTitle = this.updateTitle.bind(this);
        this.updateTitleFontStyles = this.updateTitleFontStyles.bind(this);
        this.updateScrollSpeed = this.updateScrollSpeed.bind(this);
        this.onScrollTypeChange = this.onScrollTypeChange.bind(this);
    }

    updateTitle(e) {
        this.props.updateProp('title', e.target.value);
    }
    updateTitleFontStyles(e) {
        this.props.updateProp('titleStyles', e);
    }
    updateScrollSpeed(e) {
        this.props.updateProp('scrollSpeed', e.target.value);
    }
    onScrollTypeChange(e) {
        this.props.updateProp('scrollType', e);
    }

    render() {
        return (
            <div className="col-xs-12">
                <div className="form-group">
                    <LabelledTextArea
                        label={this.props.l.t('TitleCOLON', 'Title:')}
                        value={this.props.styles.title}
                        onCustomInputChange={this.updateTitle}
                    />
                    <StylesGroup
                        l={this.props.l}
                        fontStyles={this.props.styles.titleStyles}
                        colorLabel={this.props.l.t('Title_colorCOLON', 'Title color:')}
                        fontFamilyLabel={this.props.l.t('Title_fontCOLON', 'Title font:')}
                        fontSizeLabel={this.props.l.t('Title_font_sizeCOLON', 'Title font size:')}
                        onUpdateFontStyles={this.updateTitleFontStyles}
                        ColorId="titleStyles"
                        ColorKey="titleStyles"
                    />
                    <LabelledCustomSelect
                        label={this.props.l.t('Scroll_TypeCOLON', 'Scroll Type:')}
                        // updateKey='backgroundColor'
                        placeholder='Select...'
                        value={this.props.styles.scrollType}
                        // className="form-control"
                        onChange={this.onScrollTypeChange}
                        options={scrollType}
                    />
                    <LabelledInput
                        label={this.props.l.t('Scroll_SpeedCOLON', 'Scroll Speed:')}
                        value={this.props.styles.scrollSpeed}
                        className="form-control"
                        onCustomInputChange={this.updateScrollSpeed}
                    />

                </div>
            </div>
        )
    }
}