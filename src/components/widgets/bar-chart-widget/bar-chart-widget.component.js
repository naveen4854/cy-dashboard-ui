import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import BarTitle from "../bar-chart-widget/bar-chart-title.component";
import BarChart from "../bar-chart-widget/bar-chart.component"
import { utils } from '../../../utilities';

export default class BarChartWidget extends React.Component {

    render() {
console.log('bar props  ', this.props)
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCss(widgetBody.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color)
        //let valueStyles = utils.stylesObjToCss(this.props.valueStyles)
        //let titleStyles = utils.stylesObjToCss(this.props.titleStyles)

        return (
            <div className="widget-content" style={{ backgroundColor: widgetBodyStyles.backgroundColor }}>
                <BarTitle title={this.props.title} titleStyles={this.props.titleStyles} />
                <BarChart {...this.props} />
            </div>
        );
    }
}

BarChartWidget.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    titleStyles: PropTypes.object,
    widgetBody: PropTypes.object,
}
