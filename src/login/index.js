import { injectReducer } from '../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginPage = require('./login.container').default
      cb(null, LoginPage)
    }, 'login')
  }
})
