import React, { PureComponent } from 'react';
import {CustomInputText} from '../../input-component'

export default class BoxStyles extends PureComponent {

    render() {
        return (
            <div>
                <div>
                    <div className="col-xs-12">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12 col-sm-5 col-md-4 labelContent rtl-labelContent-xs labelContent-xs">
                                    <label className="control-label inline"> {this.props.l.t('TitleCOLON', 'Title:')} </label>
                                </div>
                                <div className="col-xs-9 col-sm-7 col-md-4">
                                   <CustomInputText 
                                        updateKey='title'
                                        value={this.props.styles.title} 
                                        className="form-control"
                                        onCustomInputChange={this.props.updateProp}
                                        />
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.props.styles.title} 
                                        onChange={(e) => this.updateProp(e, "title")}  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}