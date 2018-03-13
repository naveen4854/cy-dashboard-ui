import { combineReducers } from 'redux'
import { browserHistory } from 'react-router';
import LoginReducer from '../login/login.reducer';
import LocalizationReducer from '../components/localization/localization.reducer';
import SpinnerReducer from '../components/spinner/spinner.reducer';
import NotificationReducer from '../components/notifications/notification.reducer';
import { reducer as toastrReducer } from 'react-redux-toastr'

export const makeRootReducer = (asyncReducers) =>
  (state, action) => {
    return combineReducers({
      toastr: toastrReducer,
      user: LoginReducer,
      localizationStore: LocalizationReducer,
      spinnerStore: SpinnerReducer,
      notificationStore: NotificationReducer,
      ...asyncReducers
    })(action.type == "Constants.USER_LOGOUT" ? retainOnLogOut(state) : state, action);
  }

const retainOnLogOut = (state) => {
  return {
    localizationStore: state.localizationStore,
    toastr: state.toastr,
    notificationStore: state.notificationStore,
    app: state.app
  }
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
