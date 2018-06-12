import React, { PureComponent } from 'react'
import { dispatch } from 'react'
import { browserHistory, Router } from 'react-router'
import * as authMan from '../authentication/auth-manager'

import LogoImg from '../public/images/Login_01.png'


class LoginComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
	}

	componentWillMount() {
		if (this.props.user.loggedIn) {
			this.props.defaultRedirection()
		}
	}

	componentDidMount() {
		this.refs.userName.value = 'Administrator'
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
									<h3 className="panel-title">{this.props.l.t('CCA_Sign_In', 'CCA Sign In')}</h3>
								</div>
								<div className="panel-body">
									<div className="form-group">
										<input className="form-control" ref="userName" placeholder={this.props.l.t('Username', 'Username')} name="username" type="text" />
									</div>
									<div className="form-group">
										<input className="form-control" placeholder={this.props.l.t('Password', 'Password')} ref="password" name="password" type="password" />
									</div>
									<div className="form-group  col-md-offset-8  col-md-4 noPaddingRightLeft">
										<input className="btn btn-lg btn btn-primary btn-block" type="submit" onClick={this.login} value={this.props.l.t('Login', 'Login')} />
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
