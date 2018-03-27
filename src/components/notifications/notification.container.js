import { connect } from 'react-redux';

import NotificationComponent from "./notification.component";
import * as Reducer from './notification.reducer';
import localize from '../localization/localization.hoc';
import { PageEnum } from '../../shared/enums';

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notificationStore,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(NotificationComponent, PageEnum.NOTIFICATIONS))
