"use strict";
import React from 'react';
import reactCSS from 'reactcss';
import ColorPicker from 'rc-color-picker';
import { SketchPicker } from 'react-color';
import _ from 'lodash';
import 'rc-color-picker/assets/index.css';
import * as Color from '../../shared/lib/color-conversion';

class RCColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color:
        props.value !== undefined &&
          Object.prototype.toString.call(props.value) === '[object Object]' ?
          props.value :
          _.startsWith(props.value, "#") ?
            Color.hexToRgba(props.value) :
            _.startsWith(props.value, "rgba") ? Color.rgbaStringToObject(props.value)
              : {
                r: 255,
                g: 255,
                b: 255,
                a: 1
              }
    };

  }
  componentWillReceiveProps(nextProps) {
    if (!this.state.displayColorPicker) {
      this.setState({
        displayColorPicker: false,
        color:
          nextProps.value !== undefined &&
            Object.prototype.toString.call(nextProps.value) === '[object Object]' ?
            nextProps.value :
            _.startsWith(nextProps.value, "#") ?
              Color.hexToRgba(nextProps.value) :
              _.startsWith(nextProps.value, "rgba") ? Color.rgbaStringToObject(nextProps.value)
                : {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
      })
    }
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.color })
    this.props.updateColor(Color.hexToRgba(color.color));
  };

  render() {
    return (
      <div>
        <ColorPicker color={Color.ToString(this.props.value)} 
          // alpha={50} 
          onChange={this.handleChange} 
          placement={this.props.placement}
        />
      </div>
    )
  }
}

RCColorPicker.defaultProps = {
  value: '#fff',
  placement: 'bottomLeft'
}

export default RCColorPicker