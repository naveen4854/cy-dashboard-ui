import { injectReducer } from '../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const DashboardPage = require('./dashboard.container').default
      
      const reducer = require('./dashboard.reducer').default
      injectReducer(store, { key: 'dashboard', reducer });

      cb(null, DashboardPage)
    }, 'dashboard')
  }
})
