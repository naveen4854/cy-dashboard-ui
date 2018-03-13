import { injectReducer } from '../store/reducers'
import localize from '../components/localization/localization.hoc';
import { PageEnums } from '../shared/enums/page-enum';

export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LoginPage = require('./login.container').default
      cb(null, localize(LoginPage, PageEnums.LOGIN))
    }, 'login')
  },
  onEnter: (nextState, replace) => {
  }
})
