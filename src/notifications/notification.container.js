import { connect } from 'react-redux';

import NotificationComponent from "./notification.component";
import * as LocMan from '../../localization/localization.manager';
import * as Reducer from './notification.reducer';
import { PageEnums } from '../../localization/collection';

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
    l: LocMan.getTranslationDataForPage(state.localizationStore, PageEnums.NOTFICATION)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent)
