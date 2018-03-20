import React from 'react';
import { browserHistory } from 'react-router';
import { Widgets } from '../../shared/constants';

export default class WidgetsBar extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
    }
    componentDidUpdate() {
    }
	render() {
		return (
			<div>
				<div className="page-toolbar dashboard-toolbar">
					<a>
						
					</a>
					<div className="db-actions-left">
						
					</div>
					<div className="db-item-tools">
						{
							_.map(Widgets, (widget) => {
								return <a key={widget.widgetType} onClick={() => this.props.AddWidget(widget.widgetType)} className="action-tool" role="button">
									<i className={`tool-icon ${widget.icon}`} />
									<span className="tool-title">{this.props.l.t(widget.normalizedText, widget.text)}</span>
								</a>
							})
						}
					</div>
					<div className="db-actions-right">
						
					</div>
				</div>
			</div>
		);
	}
}
