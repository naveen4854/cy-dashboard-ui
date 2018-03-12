import React from 'react'
import { dispatch } from 'react'
import { browserHistory, Router } from 'react-router'


class DashboardComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="container" style={{ marginTop: '100px' }}>
				hellow!!!
			</div>
		)
	}
}

export default DashboardComponent;
