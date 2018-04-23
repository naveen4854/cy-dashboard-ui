import { connect } from 'react-redux'
import LoginComponent from "./login.component"
import * as Reducer from "./login.reducer"
import { browserHistory, Router } from 'react-router'
import { withRouter } from 'react-router'
import { login, defaultRedirection } from './login.actions';

const mapDispatchToProps = (dispatch) => {
  return {
    defaultRedirection: () => {
      dispatch(defaultRedirection());
    },
    clearNotifications: () => {
    },
    login: (loginDetails) => {
      dispatch(login(loginDetails))
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

// export default withRouter((connect(mapStateToProps, mapDispatchToProps)(LoginComponent)))
export default (connect(mapStateToProps, mapDispatchToProps)(LoginComponent))
