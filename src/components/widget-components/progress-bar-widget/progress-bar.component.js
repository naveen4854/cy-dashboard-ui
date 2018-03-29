import React, { PureComponent } from 'react'
import { utils } from '../../../utilities';
import PropTypes from 'prop-types';
 
import _ from 'lodash';
import ReactDom from 'react-dom';
const interpolate = require('../../../../lib/color-interpolate');
import '../styles.css';
import * as Color from '../../../shared/lib/color-conversion';
import ProgressBar from './progress-bar.component';
import * as Utils from '../../../../utilities/common-utils'
import { DisplayFormatEnum } from '../../../shared/enums';

export default class ProgressBarWidgetComponent extends PureComponent {
 
        constructor(props) {
            super(props);
            const { widgetBody, titleStyles, valueStyles, isComboWidget, rangeValueStyles } = _.cloneDeep(props);
    
            widgetBody.backgroundColor = Color.ToString(props.appliedBackgroundColor);
    
            titleStyles.color = Color.ToString(titleStyles.color);
            titleStyles.fontSize = `${titleStyles.fontSize}px`;
    
            valueStyles.color = Color.ToString(valueStyles.color);
            valueStyles.fontSize = `${valueStyles.fontSize}px`;
            rangeValueStyles.color = Color.ToString(rangeValueStyles.color);
            rangeValueStyles.fontSize = rangeValueStyles.fontSize;
    
            let displayFormatId = this.props.appliedSettings.dataMetrics.displayFormat ?
                this.props.appliedSettings.dataMetrics.displayFormat.id : DisplayFormatEnum.Number;
    
            let formatter = Utils.getFormatter(displayFormatId);
    
            this.state = {
                id: this.props.id,
                height: this.props.height,
                width: this.props.width,
                title: this.props.title,
                value: this.props.value,
                label: `${this.props.displayValue}`,
                ratio: (this.props.value - this.props.min) / (this.props.max - this.props.min),
                barCount: this.props.barCount,
                interpolateColor: interpolate(this.props.colors),
                max: this.props.max,
                min: this.props.min,
                titleStyles,
                valueStyles,
                widgetBody,
                isComboWidget,
                l: this.props.l,
                rangeValueStyles,
                maxText: formatter(this.props.max),
                minText: formatter(this.props.min)
            }
        }
    
        componentWillReceiveProps(nextProps) {
            const { widgetBody, titleStyles, valueStyles, isComboWidget, rangeValueStyles } = _.cloneDeep(nextProps);
    
            widgetBody.backgroundColor = Color.ToString(nextProps.appliedBackgroundColor);
    
            titleStyles.color = Color.ToString(titleStyles.color);
            titleStyles.fontSize = `${titleStyles.fontSize}px`;
    
            valueStyles.color = Color.ToString(valueStyles.color);
            valueStyles.fontSize = `${valueStyles.fontSize}px`;
    
            rangeValueStyles.color = Color.ToString(rangeValueStyles.color);
            rangeValueStyles.fontSize = rangeValueStyles.fontSize;
            let displayFormatId = nextProps.appliedSettings.dataMetrics.displayFormat ?
                nextProps.appliedSettings.dataMetrics.displayFormat.id : DisplayFormatEnum.Number;
    
            let formatter = Utils.getFormatter(displayFormatId);
            this.setState({
                id: nextProps.id,
                height: nextProps.height || this.state.height,
                width: nextProps.width || this.state.width,
                title: nextProps.title,
                value: nextProps.value,
                label: `${nextProps.displayValue}`,
                ratio: (nextProps.value - nextProps.min) / (nextProps.max - nextProps.min),
                barCount: nextProps.barCount,
                interpolateColor: interpolate(nextProps.colors),
                max: nextProps.max,
                min: nextProps.min,
                titleStyles,
                valueStyles,
                widgetBody,
                isComboWidget,
                l: nextProps.l,
                rangeValueStyles,
                maxText: formatter(nextProps.max),
                minText: formatter(nextProps.min)
            });
        }
    
        shouldComponentUpdate(newProps, newState) {
            return (
                this.state.min !== newState.min
                || this.state.max !== newState.max
                || this.state.value !== newState.value
                || this.state.title !== newState.title
                || this.state.ratio !== newState.ratio
                || this.state.width !== newState.width
                || this.state.height !== newState.height
                || !_.isEqual(this.state.valueStyles, newState.valueStyles)
                || !_.isEqual(this.state.titleStyles, newState.titleStyles)
                || !_.isEqual(this.state.rangeValueStyles, newState.rangeValueStyles)
                || !_.isEqual(this.state.widgetBody, newState.widgetBody)
                || this.state.label !== newState.label
                || this.state.l !== newState.l
            );
        }
    
        render() {
            return (
                <div className="widget-content" style={this.state.widgetBody}>
                    <ProgressBar {...this.state} />
                </div>
    
            )
        }
    }
    
    
    ProgressBarWidget.propTypes = {
        label: PropTypes.string,
        barCount: PropTypes.number,
        value: PropTypes.number,
        colors: PropTypes.array,
        max: PropTypes.number,
    }
    
    ProgressBarWidget.defaultProps = {
        width: 0,
        height: 0,
        barCount: 10,
        value: 1,
        colors: ["#FF0000", "rgb(255, 232, 0)", "#00FF00"],
        label: `${1 * 100}`,
        max: 100
    }
   