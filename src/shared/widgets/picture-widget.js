import { Widget } from "./widget";
import { WidgetTypeEnum, PictureStretchEnum } from "../enums";
import DefaultImage from '../../public/Images/NoImage.jpg';

export default class PrictureWidget extends Widget {
    constructor(props) {
        super(props)
    }
    widgetType = WidgetTypeEnum.Picture;
    width = 100;
    height = 100;
    styleEditorTitle = 'Picture Styles';
    title = 'picture';
    picturePath = DefaultImage; //Need to set default image.
    pictureStretch = { value: PictureStretchEnum.Fill, label: 'Fill' };
    //pictureStretch = PictureStretchEnum.Fill;
    pictureSelected = "No picture"
}