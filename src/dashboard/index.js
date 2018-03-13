import { injectReducer } from '../store/reducers'
import authenticate from '../authentication/authenticated.hoc';

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const DashboardPage = require('./dashboard.container').default
      
      const reducer = require('./dashboard.reducer').default
      injectReducer(store, { key: 'dashboard', reducer });

      cb(null, authenticate(DashboardPage))
    }, 'dashboard')
  }
})
