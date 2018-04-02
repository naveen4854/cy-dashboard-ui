import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Color } from '../../../shared/lib';
import { ScrollTypeEnum } from '../../../shared/enums';
import { utils } from '../../../utilities';

export default class TextWidgetComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        let scrollType = '';
        if (this.props.scrollType) {
            switch (this.props.scrollType.value) {
                case ScrollTypeEnum.LeftToRight:
                    scrollType = 'marqueeLeftRight';
                    break;
                case ScrollTypeEnum.RightToLeft:
                    scrollType = 'marqueeRightLeft';
                    break;
                case ScrollTypeEnum.TopToBottom:
                    scrollType = 'marqueeTopBottom';
                    break;
                case ScrollTypeEnum.BottomToTop:
                    scrollType = 'marqueeBottomTop';
                    break;
                default:
                    break;
            }
        }

        let animationStyle = '';
        if (this.props.scrollType && this.props.scrollType.value != ScrollTypeEnum.None) {
            animationStyle = { 'animation': `${scrollType} ${this.props.scrollSpeed}s linear infinite`, 'WebkitAnimation': `${scrollType} ${this.props.scrollSpeed}s linear infinite` };
        }
        let titleStyles = utils.stylesObjToCss(this.props.titleStyles)

        return (

            <div className="widget-content  centerAlign" style={titleStyles}>
                {
                    (this.props.scrollType && this.props.scrollType.value == ScrollTypeEnum.None) &&
                    <div>{this.props.title}</div>
                }
                {
                    (this.props.scrollType && this.props.scrollType.value != ScrollTypeEnum.None) &&
                    <div className="marquee">
                        <p className={scrollType} style={{ animationDuration: `${this.props.scrollSpeed}s` }}>{this.props.title}</p>
                    </div>
                }
            </div>
        );
    }
}
