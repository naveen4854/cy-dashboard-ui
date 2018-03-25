"use strict";
import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import _ from 'lodash';

import * as Color from '../../shared/lib/color-conversion';

class ColorPicker extends React.Component {
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
    this.setState({ color: color.rgb })
    this.props.updateColor(color.rgb);
  };



  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background:
          `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={this.handleClose} />
          <SketchPicker key={this.props.id} color={this.props.value} onChange={this.handleChange} />
        </div> : null}

      </div>
    )
  }
}

export default ColorPicker