import { injectReducer } from '../../store/reducers'
import authenticate from '../../authentication/authenticated.hoc';


export default (store) => ({
  path:'newslider',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const NewSliderPage = require('./new-slider.container').default
       const reducer = require('../my-dashboards/reducers/my-dashboard.reducer').default
       injectReducer(store, { key: 'mydashboard', reducer });
       store.dispatch(store.getState().mydashboard.GetDashboardsList());
      cb(null, authenticate(NewSliderPage))
    }, 'mydashboard')
  }
})
