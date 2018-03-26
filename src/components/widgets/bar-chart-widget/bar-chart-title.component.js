import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import { utils } from '../../../utilities';

class BarTitle extends React.Component {
    render() {
        let titleStyles = utils.stylesObjToCss(this.props.titleStyles)
        return (
            <div id="barTitle" style={titleStyles}>
                {this.props.title}
            </div>

        );
    }
}

export default BarTitle;



