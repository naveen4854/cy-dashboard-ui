import { connect } from 'react-redux';

import NotificationComponent from "./notification.component";
import * as Reducer from './notification.reducer';

const mapDispatchToProps = (dispatch) => {
  return {
    ShowNotification: (messagesConfiguration) => {
      dispatch(Reducer.ShowNotification(messagesConfiguration))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notificationStore,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent)
