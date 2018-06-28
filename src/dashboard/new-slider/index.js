import { injectReducer } from '../../store/reducers'
import authenticate from '../../authentication/authenticated.hoc';
import myDashboardReducer from '../my-dashboards/reducers/my-dashboard.reducer';

export default (store) => ({
  path:'newslider',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const NewSliderPage = require('./new-slider.container').default
       const reducer = require('./new-slider.reducer').default
       injectReducer(store, { key: 'newslider', reducer });
       injectReducer(store, { key: 'mydashboard', reducer: myDashboardReducer })

      
      
      cb(null, authenticate(NewSliderPage))
    }, 'newslider')
  }
})
