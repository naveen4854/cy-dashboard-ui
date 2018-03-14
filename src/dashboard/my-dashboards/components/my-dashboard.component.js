import React, { PureComponent } from 'react';
import { browserHistory, Router } from 'react-router';

export default class MyDashboard extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.GetDashboardsList();
	}

	render() {
		return (
			<div>
				<div className="my-files">
					hi!!
				</div>
			</div>
		)
	}
}


