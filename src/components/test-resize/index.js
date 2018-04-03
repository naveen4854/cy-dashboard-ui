import { injectReducer } from '../../store/reducers'
import authenticate from '../../authentication/authenticated.hoc';

export default (store) => ({
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Resizepage = require('./test-layout').default
            cb(null, Resizepage)
        }, 'resize')
    }
})
