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
					<div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 hidden-xs">
						<img src={LogoImg} alt="CyDashboard" title="CyDashboard" />
					</div>
				</div>
				<form>
					<div className="row">
						<div className="col-md-4 offset-md-4 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1">
							<div className="card card-default boxShadow">
								<div className="card-header" style={{ paddingBottom: 0 }}>
									<h6 className="card-title">{this.props.l.t('CCA_Sign_In', 'CCA Sign In')}</h6>
								</div>
								<div className="card-body">
									<div className="form-group">
										<input className="form-control" ref="userName" placeholder='User Name' name="username" type="text" />
									</div>
									<div className="form-group">
										<input className="form-control" ref="password" placeholder='Password' name="password" type="password" />
									</div>
									<div className="form-group  offset-md-8  col-md-4 noPaddingRightLeft">
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
