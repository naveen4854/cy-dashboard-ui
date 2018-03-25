import React, { PureComponent } from 'react';
import { CustomInputText } from '../../input-component';
import ColorPicker from '../../color-picker/color-picker';
import { Fonts } from "../../../shared/constants";
import CustomSelect from '../../custom-dropdown';
import { LabelledInput } from '../../labelled-input';


export default class TitleStyles extends PureComponent {

    onFontSizeChange = (e) => {
        let fonts = { ...this.props.fontStyles, fontSize: e }; //just e not e.target.value because CustomInputText returns e.target.value  
        this.props.onUpdateFontStyles(fonts, this.props.updateKey);
    }
    onFontFamilyChange = (e) => {
        let fonts = { ...this.props.fontStyles, fontFamily: e };
        this.props.onUpdateFontStyles(fonts, this.props.updateKey);
    }
    onColorChange = (e) => {
        let fonts = { ...this.props.fontStyles, color: e };
        this.props.onUpdateFontStyles(fonts, this.props.updateKey);
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
                <div className="row">
                    <div className="col-xs-12 col-sm-5 col-md-4 labelContent rtl-labelContent-xs labelContent-xs">
                        <label className="control-label inline">{this.props.colorLabel}  </label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-4">
                        <ColorPicker
                            id="2"
                            key="2"
                            value={this.props.fontStyles.color}
                            updateColor={(e) => this.onColorChange(e)}
                            defaultColor="red"
                        />
                    </div>
                </div>
                <div className="row">
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
                </div>
            </div>
        )
    }
}