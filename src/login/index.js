import { injectReducer } from '../store/reducers'
import localize from '../components/localization/localization.hoc';
import { PageEnum } from '../shared/enums/page-enum';

export default (store) => ({
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LoginPage = require('./login.container').default
      cb(null, localize(LoginPage, PageEnum.LOGIN))
    }, 'login')
  },
  onEnter: (nextState, replace) => {
  }
})
