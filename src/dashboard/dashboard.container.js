import { connect } from 'react-redux'
import DashboardComponent from "./dashboard.component"
import * as Reducer from "./dashboard.reducer"
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

const mapStateToProps = (state) => {
  debugger
  return {

  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));
