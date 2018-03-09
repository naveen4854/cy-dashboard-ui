import React from 'react'
import { dispatch } from 'react'
import { browserHistory, Router } from 'react-router'


class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="container" style={{ marginTop: '100px' }}>
				<div className="row">
					<div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 hidden-xs">
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
						<div className="panel panel-default boxShadow">
							<div className="panel-heading">
								<h3 className="panel-title"></h3>
							</div>
							<div className="panel-body">
								<div className="form-group">
									<input className="form-control" ref="userName" name="username" type="text" />
								</div>
								<div className="form-group">
									<input className="form-control" ref="password" name="password" type="password" />
								</div>
								<div className="form-group  col-md-offset-8  col-md-4 noPaddingRightLeft">
									<input className="btn btn-lg btn btn-primary btn-block" type="button" value={'Login'} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LoginComponent;
