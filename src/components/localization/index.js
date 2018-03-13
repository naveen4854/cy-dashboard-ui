import { injectReducer } from '../store/reducers'
import requiresAuth from '../authentication/authenticated.component';

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Localization = require('./localization.container').default
      const reducer = require('./localization.reducer').default
      injectReducer(store, { key: 'localizationStore', reducer })
      cb(null, requiresAuth(Localization))
    }, 'localizationStore')
  }
})
