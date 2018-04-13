import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component';
import ColorPicker from '../../color-picker/color-picker';
import { Fonts } from "../../../shared/constants";
import CustomSelect from '../../custom-dropdown';
import { LabelledInput, LabelledColorPicker, LabelledCustomSelect } from '../../labelled-controls';

/**
 * Grouping of styles component. 
 */
export default class StylesGroup extends PureComponent {

    onFontSizeChange = (e, key) => {
        let fonts = { ...this.props.fontStyles, fontSize: e.target.value }; //just e not e.target.value because CustomInputText returns e.target.value  
        this.props.onUpdateFontStyles(fonts);
    }
    onFontFamilyChange = (e, key) => {
        if (!e.value)
            return;
        let fonts = { ...this.props.fontStyles, fontFamily: e.value };
        this.props.onUpdateFontStyles(fonts);
    }
    onColorChange = (e, key) => {
        let fonts = { ...this.props.fontStyles, color: e };
        this.props.onUpdateFontStyles(fonts);
    }
    render() {
        return (
            <div >
                <LabelledInput
                    label={this.props.fontSizeLabel}
                    // updateKey='title'
                    value={this.props.fontStyles.fontSize}
                    onCustomInputChange={this.onFontSizeChange}
                />

                <LabelledColorPicker
                    label={this.props.colorLabel}
                    // updateKey='backgroundColor'
                    ColorId={this.props.ColorId}
                    ColorKey={this.props.ColorKey}
                    value={this.props.fontStyles.color}
                    updateColor={(e) => this.onColorChange(e)}
                />

                <LabelledCustomSelect
                    label={this.props.fontFamilyLabel}
                    // updateKey='backgroundColor'
                    placeholder='Select Font'
                    value={this.props.fontStyles.fontFamily}
                    onChange={this.onFontFamilyChange}
                    options={Fonts}
                />
                <hr className='grouping-border'/>
            </div>
        )
    }
}