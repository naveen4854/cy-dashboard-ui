import { injectReducer } from '../../store/reducers'
import authenticate from '../../authentication/authenticated.hoc';

export default (store) => ({
  path:'newslider',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const NewSliderPage = require('./new-slider.container').default
    //   const reducer = require('./reducers/my-dashboard.reducer').default
    //   injectReducer(store, { key: 'mydashboard', reducer });

      cb(null, authenticate(NewSliderPage))
    }, 'mydashboard')
  }
})
