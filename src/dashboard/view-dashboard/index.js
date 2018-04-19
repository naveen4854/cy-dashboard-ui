import { browserHistory } from 'react-router';
import { injectReducer } from '../../store/reducers';
import authenticate from '../../authentication/authenticated.hoc';

import ViewDashboardContainer from './view-dashboard.container';
import { DashboardModeEnum } from '../../shared/enums';
import DataMetricsReducer from '../../components/data-metrics/data-metrics.reducer';
import DashboardReducer from '../dashboard.reducer';

export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {

      cb(null, authenticate(ViewDashboardContainer))
    }, 'viewdashboard')
  },
  onEnter: (nextState, replace) => {
    injectReducer(store, { key: 'dashboard', reducer: DashboardReducer })
    let mode = store.getState().dashboard.mode;
    let dashboardMode = mode == DashboardModeEnum.New || mode == DashboardModeEnum.Edit ? DashboardModeEnum.EditToLive : DashboardModeEnum.View;
    store.dispatch(store.getState().dashboard.updateDashboardMode(dashboardMode))
    store.dispatch(store.getState().dashboard.updateShowIcons(dashboardMode))

    injectReducer(store, { key: 'dataMetrics', reducer: DataMetricsReducer })
    store.dispatch((dispatch, getState) => {
      store.getState().dataMetrics.loadDataMetricsMetaData(nextState.params.id)(dispatch, getState).then((response) => {
        if (dashboardMode != DashboardModeEnum.EditToLive)
          store.dispatch(store.getState().dashboard.getDashboardById(nextState.params.id))
      })
    }
    )
    // store.dispatch(store.getState().dashboard.getDashboardById(nextState.params.id))
  },
})
