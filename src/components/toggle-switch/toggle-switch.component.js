import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash';
import './toggle-switch-styles.css';

export default class ToggleSwitch extends PureComponent {
    handleClick(checkedNode) {
        this.props.onChange(checkedNode);
    }
    render() {
        return (
            <div className="toggle-switch rtl-toggle-switch">
                {
                    _.map(
                        this.props.nodes,
                        (node) => {
                            return (!node.isDisabled) ? (
                                <div key={node.label}
                                    className={this.props.checkedNode === node.value ? "toggle-item checked" : "toggle-item"}
                                    onClick={this.handleClick.bind(this, node.value)} >
                                    {node.label}
                                </div>
                            )
                                : (
                                    <div
                                        key={node.label} className={this.props.checkedNode === node.value ? "toggle-item checked disabled" : "toggle-item disabled"}
                                    >
                                        {node.label}
                                    </div>
                                )
                        }
                    )
                }
            </div>
        )
    }
}