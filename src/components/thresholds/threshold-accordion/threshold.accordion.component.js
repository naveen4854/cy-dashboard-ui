"use srtict"
import React, { PureComponent } from 'react';
import _ from 'lodash';
import ThresholdContentContainer from '../threshold-content';

export default class ThresholdAccordion extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { displayFormatId } = this.props
        return (
            <div>
                {
                    _.map(this.props.threshold.levels, (level) =>
                        <ThresholdContentContainer
                            key={level.id}
                            {...level}
                            displayFormatId={displayFormatId} />
                    )
                }
            </div>
        );
    }
}
