import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import { LabelledCustomSelect } from '../../labelled-controls';
import { pictureOptions } from '../../../shared/constants/constants';

export default class PictureStyles extends PureComponent {

    constructor(props) {
        super(props);
        this.onPictureStretchChange = this.onPictureStretchChange.bind(this);
        this.selectPicture = this.selectPicture.bind(this);

    }

    onPictureStretchChange(e) {
        this.props.updateProp('pictureStretch', e);
    }
    selectPicture(e) {
        this.props.onSelectingPicture(e);
    }

    render() {

        return (
            <div className="col-xs-12">
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12 col-md-offset-3 col-md-6">
                            <Dropzone
                                multiple={false}
                                ref="picturePath"
                                accept="image/*"
                                className="dropZoneDimensions"
                                onDrop={this.selectPicture}>
                                <button className="browse btn btn-primary input-md">{this.props.l.t('Choose_file_to_uploadPERIOD', 'Choose file to upload.')}</button>
                                <span><b> &nbsp;{this.props.styles.pictureSelected} </b> {this.props.l.t('selected', 'selected')}</span>
                            </Dropzone>
                        </div>
                    </div>
                    <div className="row picturePadding">
                        <div className="col-sm-12 col-md-offset-4 col-md-6">
                            <span style={{ color: 'red' }}> {this.props.l.t('NoteCOLON_Max_file_siz_is_4MB', 'Note: Max file size is 4MB')}</span>
                        </div>
                    </div>
                    {this.props.styles.showMessage && <div className="row picturePadding">
                        <div className="col-sm-12 col-md-offset-4 col-md-6">
                            <span style={{ color: 'red' }}>{this.props.l.t('Image_Exceeding_Max_Size', 'Image is larger than allowed size. It should be less than 4MB')}</span>
                        </div>
                    </div>}
                    <LabelledCustomSelect
                        label={this.props.l.t('Picture_StretchCOLON', 'Picture Stretch:')}
                        placeholder='Select...'
                        value={this.props.styles.pictureStretch}
                        onChange={this.onPictureStretchChange}
                        options={pictureOptions}
                    />
                </div>
            </div>
        )
    }
}