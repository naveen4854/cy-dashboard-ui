import { connect } from 'react-redux';

import NotificationComponent from "./notification.component";
import * as Reducer from './notification.reducer';
import localize from '../localization/localization.hoc';
import { PageEnums } from '../../shared/enums/page-enum';

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notificationStore,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(NotificationComponent, PageEnums.NOTIFICATIONS))
