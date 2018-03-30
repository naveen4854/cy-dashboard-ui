import { ScrollTypeEnum } from "../enums";

const scrollType = [
    { value: ScrollTypeEnum.None, label: 'No Scroll' },
    { value: ScrollTypeEnum.RightToLeft, label: 'Right-Left' },
    { value: ScrollTypeEnum.LeftToRight, label: 'Left-Right' },
    { value: ScrollTypeEnum.BottomToTop, label: 'Bottom-Top' },
    { value: ScrollTypeEnum.TopToBottom, label: 'Top-Bottom' }
];


export default scrollType;