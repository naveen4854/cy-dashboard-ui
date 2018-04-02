import React, { PureComponent } from 'react';
import _ from 'lodash';
import {PictureStretchEnum} from '../../../shared/enums';

export default class PictureWidgetComponent extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (this.props.dashboardId && this.props.appliedSettings.group && this.props.appliedSettings.group.isEdit && !this.props.file) {
            this.props.PreviewActionPicture(this.props.dashboardId, this.props.id);
        }
    }
    componentWillReceiveProps(nextProps) {
    }

    render() {
        let picClass = '';
        switch (this.props.pictureStretch && this.props.pictureStretch.value) {
            case PictureStretchEnum.ActualSize:
                picClass = 'image-none';
                break;
            case PictureStretchEnum.Fill:
                picClass = 'image-fill';
                break;
            default:
                picClass = 'image-none';
        }
        return (
            <div className="widget-content" >
                <img src={this.props.picturePath} className={picClass}></img>
            </div>
        );
    }
}