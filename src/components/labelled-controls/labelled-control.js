import React, { PureComponent } from 'react';
import { CustomInputText } from '../input-component';

export default class LabelledControl extends PureComponent {

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-5 col-md-4 labelContent rtl-labelContent-xs labelContent-xs">
                    <label className="control-label inline"> {this.props.label} </label>
                </div>
                <div className="col-xs-9 col-sm-7 col-md-4">
                    {this.props.children}
                </div>
            </div>
        )
    }
}