import { injectReducer } from '../../../store/reducers'
import requiresAuth from '../../../authentication/authenticated.component';

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const myDashboardForm = require('./containers/my-dashboard.container').default
      const reducer = require('./reducers/my-dashboard.reducer').default
      injectReducer(store, { key: 'mydashboard', reducer });
      cb(null, requiresAuth(myDashboardForm))
    }, 'mydashboard')
  }
})
