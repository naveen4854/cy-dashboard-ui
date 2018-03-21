import { browserHistory } from 'react-router';
import { injectReducer } from '../../store/reducers';
import authenticate from '../../authentication/authenticated.hoc';

export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const newDashboardForm = require('./new-dashboard.container').default

      const dashboardReducer = require('../dashboard.reducer').default
      injectReducer(store, { key: 'dashboard', reducer: dashboardReducer })

      const settingsReducer = require('../../components/settings/settings.reducer').default
      injectReducer(store, { key: 'settings', reducer: settingsReducer })

      cb(null, authenticate(newDashboardForm))
    }, 'newdashboard')
  },
  onEnter: (nextState, replace) => {
    const dataMetricsReducer = require('../../components/data-metrics/data-metrics.reducer').default
    injectReducer(store, { key: 'dataMetrics', reducer: dataMetricsReducer })
    store.dispatch(store.getState().dataMetrics.LoadDataMetricsMetaData())
    // load refreshinterval
  },
})

