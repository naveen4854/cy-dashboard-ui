import { browserHistory } from 'react-router';
import { injectReducer } from '../../store/reducers';
import authenticate from '../../authentication/authenticated.hoc';

export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const newDashboardForm = require('./new-dashboard.container').default

      const dashboardReducer = require('../dashboard.reducer').default
      injectReducer(store, { key: 'dashboard', reducer: dashboardReducer })

      cb(null, authenticate(newDashboardForm))
    }, 'newdashboard')
  },
  onEnter: (nextState, replace) => {

    // load smcdata
    // load refreshinterval
  },
})

