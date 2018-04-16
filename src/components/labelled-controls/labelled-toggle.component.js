import React, { PureComponent } from 'react';
import LabelledControl from './labelled-control'
import ToggleSwitch from '../toggle-switch';

export default class LabelledToggle extends PureComponent {

    render() {
        return (
            <div className="marginTop10">
                <LabelledControl label={this.props.label}>
                    <ToggleSwitch
                        className="form-control"
                        nodes={this.props.nodes}
                        checkedNode={this.props.checkedNode}
                        onChange={this.props.onToggleChange}
                    />
                </LabelledControl>
            </div>
        )
    }
}