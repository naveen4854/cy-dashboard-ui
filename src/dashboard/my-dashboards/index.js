import { injectReducer } from '../../store/reducers'
import authenticate from '../../authentication/authenticated.hoc';
import NewDashboard from '../new-slider/new-slider.reducer';

export default (store) => ({
  path:'mydashboards',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const MyDashboardPage = require('./list.container').default
      const reducer = require('./reducers/my-dashboard.reducer').default
      injectReducer(store, { key: 'mydashboard', reducer });
     
      cb(null, authenticate(MyDashboardPage))
    }, 'mydashboard')
  }
})
