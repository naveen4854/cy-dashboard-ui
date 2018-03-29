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
        let fonts = { ...this.props.fontStyles, fontFamily: e };
        this.props.onUpdateFontStyles(fonts);
    }
    onColorChange = (e, key) => {
        let fonts = { ...this.props.fontStyles, color: e };
        this.props.onUpdateFontStyles(fonts);
    }
    render() {
        return (
            <div>
                <LabelledInput
                    label={this.props.fontSizeLabel}
                    // updateKey='title'
                    value={this.props.fontStyles.fontSize}
                    className="form-control"
                    onCustomInputChange={this.onFontSizeChange}
                />

                 <LabelledColorPicker
                        label={this.props.colorLabel}
                        // updateKey='backgroundColor'
                        id={this.props.id}
                        key={this.props.key}
                        value={this.props.fontStyles.color}
                        // className="form-control"
                        updateColor={(e) => this.onColorChange(e)}
                    />

                    <LabelledCustomSelect
                        label={this.props.fontFamilyLabel}
                        // updateKey='backgroundColor'
                        placeholder='Select Font'
                        value={this.props.fontStyles.fontFamily}
                        // className="form-control"
                        onChange={this.onFontFamilyChange}
                        options={Fonts}
                    />

                {/* <div className="row">
                    <div className="col-xs-12 col-sm-5 col-md-4 labelContent rtl-labelContent-xs labelContent-xs">
                        <label className="control-label inline">{this.props.fontFamilyLabel}  </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-4" style={{ fontFamily: this.props.fontStyles.fontFamily }}>
                        <CustomSelect name="field-group-options"
                            value={this.props.fontStyles.fontFamily}
                            placeholder='Select Font'
                            options={Fonts}
                            onChange={this.onFontFamilyChange} />

                    </div>
                </div> */}
            </div>
        )
    }
}