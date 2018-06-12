import { injectReducer } from '../store/reducers'
import authenticate from '../authentication/authenticated.hoc';

export default (store) => ({
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const MainPage = require('./main-component.component.js').default
            cb(null, authenticate(MainPage))
        }, 'mainpage')
    }
})
