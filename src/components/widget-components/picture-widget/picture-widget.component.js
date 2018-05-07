import React, { PureComponent } from 'react';
import _ from 'lodash';
import { PictureStretchEnum } from '../../../shared/enums';

export default class PictureWidgetComponent extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
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