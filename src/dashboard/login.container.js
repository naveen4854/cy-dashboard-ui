import { connect } from 'react-redux'
import LoginComponent from "./login.component"
import * as Reducer from "./login.reducer"
import { browserHistory, Router } from 'react-router'
import { withRouter } from 'react-router'

const mapDispatchToProps = (dispatch) => {
  return {
    handlePost: (loginDetails) => {
    },
    defaultRedirection: () => {
    },
    ClearNotifications: () => {
    }
  }
}

const mapStateToProps = (state) => ({

})

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(LoginComponent)))
