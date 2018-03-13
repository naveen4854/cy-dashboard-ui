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

    render() {
      return (
        <div className="authenticated">
          <Component {...this.props} />
        </div>
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
      l: state.localizationStore
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
