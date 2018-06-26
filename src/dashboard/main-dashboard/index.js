import { injectReducer } from '../../store/reducers'
import authenticate from '../../authentication/authenticated.hoc';
import MyDashboards from '../my-dashboards'
import ViewDashboards from '../view-dashboard'
import MainDashBoard from './main-dashboard.container'
import NewDashboardPage from '../new-dashboard';
import EditDashboardPage from '../edit-dashboard';
import { DashboardModeEnum } from '../../shared/enums';
import DashboardReducer from '../dashboard.reducer';
import NewSlider from '../new-slider';

export default (store) => ({
    path: 'dashboard',
    component: MainDashBoard,
    childRoutes: [MyDashboards(store), ViewDashboards(store), NewDashboardPage(store), EditDashboardPage(store),NewSlider(store)],
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const DashboardPage = require('./main-dashboard.container.js').default
            const reducer = require('./main-dashboard.reducer').default
            injectReducer(store, { key: 'maindashboard', reducer })
            cb(null, authenticate(DashboardPage))
        }, 'maindashboard')
    }
})
