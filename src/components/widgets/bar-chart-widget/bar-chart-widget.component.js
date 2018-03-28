import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import BarTitle from "../bar-chart-widget/bar-chart-title.component";
import BarChart from "../bar-chart-widget/bar-chart.component"
import { utils } from '../../../utilities';

export default class BarChartWidgetComponent extends React.Component {

    render() {
        let widgetBody = this.props.widgetBody;
        let widgetBodyStyles = utils.stylesToCss(this.props.appliedBackgroundColor, widgetBody.fontSize, widgetBody.fontFamily, widgetBody.color)
        
        return (
            <div className="widget-content" style={{ backgroundColor: widgetBodyStyles.backgroundColor }}>
                <BarTitle title={this.props.title} titleStyles={this.props.titleStyles} />
                <BarChart {...this.props} />
            </div>
        );
    }
}

BarChartWidgetComponent.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    titleStyles: PropTypes.object,
    widgetBody: PropTypes.object,
}
