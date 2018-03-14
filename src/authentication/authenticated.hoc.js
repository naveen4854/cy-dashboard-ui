import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import LoginFormReducer, * as LoginReducer from '../login/login.reducer'
import * as authMan from "./auth-manager";

export default function authenticate(Component, options) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.userAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.userAuthentication(nextProps);
    }

    userAuthentication(props) {
      if (!props.user.userInitalized)
        return

      const { roles } = options ? options : {};

      if (!props.user && (Date.parse(props.user.expiresOn) - Date.parse(new Date().toGMTString()) <= 0))
        return browserHistory.push('/login');

      if (!this.authorize(authMan.getAuth(), roles)) {
        browserHistory.push('/login');
      }
    }

    authorize(auth, authorizedRoles) {
      if (!authorizedRoles)
        return true;

      let authorized = false;
      const userRoles = auth.roles.split(',');
      _.forEach(userRoles, (urole) => {
        if (authorizedRoles.includes(urole)) {
          authorized = true;
        }
      });

      return authorized;
    }

    render() {
      return (
        <Component/>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      initiatePing: () => {
        dispatch(LoginReducer.InitiatePing())
        dispatch(LoginReducer.setTokenRefreshTimeout(0))
      },
      initializeUserFromCache: (userData) => {
        dispatch(LoginReducer.initializeUserFromCache(userData))
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
