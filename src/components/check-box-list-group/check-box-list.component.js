'use strict';
var _ = require('lodash');
import React, { PureComponent } from 'react';


export default class CheckBoxList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.defaultData || []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ data: nextProps.defaultData });
	}

	handleItemChange(e) {
		_.map(this.state.data, (item) => {
			if (item.value === e.value) {
				item.checked = !e.checked;
			}
		})

		this.setState({ data: this.state.data });
		this.props.onChange(e);
	}

	render() {
		var options;

		options = _.map(this.state.data, (item, index) => {
			return (
				React.createElement("div", { key: 'chk-' + index, className: "check-box", onClick: () => this.handleItemChange(item) },
					React.createElement("input", {
						type: "checkbox",
						value: item.value,
						checked: item.checked ? true : false
					}),
					React.createElement("label", null, null
						, " ", item.label
					)
				)
			);
		});
		return (
			React.createElement("div", null,
				options
			)
		)
	}
}
