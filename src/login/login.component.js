import React, { PureComponent } from 'react'
import { dispatch } from 'react'
import { browserHistory, Router } from 'react-router'

import LogoImg from 'public/images/Login_01.png'


class LoginComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
	}

	login(e) {
		e.preventDefault();
		this.props.login({
			userName: this.refs.userName.value,
			password: this.refs.password.value,
		});
	}

	render() {
		return (
			<div className="container" style={{ marginTop: '100px' }}>
				<div className="row">
					<div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 hidden-xs">
						<img src={LogoImg} alt="CyDashboard" title="CyDashboard" />
					</div>
				</div>
				<form>
					<div className="row">
						<div className="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
							<div className="panel panel-default boxShadow">
								<div className="panel-heading">
									<h3 className="panel-title">'CCA_Sign_In</h3>
								</div>
								<div className="panel-body">
									<div className="form-group">
										<input className="form-control" ref="userName" placeholder='User Name' name="username" type="text" />
									</div>
									<div className="form-group">
										<input className="form-control" ref="password" placeholder='Password' name="password" type="password" />
									</div>
									<div className="form-group  col-md-offset-8  col-md-4 noPaddingRightLeft">
										<input className="btn btn-lg btn btn-primary btn-block" type="submit" onClick={this.login} value={'Login'} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		)
	}
}
export default LoginComponent;
