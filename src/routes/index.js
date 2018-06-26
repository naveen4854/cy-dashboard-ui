import LoginPage from '../login';
import MyDashboardPage from '../dashboard/my-dashboards';
import MainPage from '../main-component';
import NewDashboardPage from '../dashboard/new-dashboard';
import MainDashboardPage from '../dashboard/main-dashboard';
import ViewDashboardPage from '../dashboard/view-dashboard';
import NewSliderPage from '../dashboard/new-slider';
import TestPage from '../components/test-resize';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => (
    [
        {
            path: '/CyDashboard',
            indexRoute: MainPage(store),
            childRoutes: [LoginPage(store), MainDashboardPage(store)]
        },
        {
            path: '/dashboard',
            indexRoute: MyDashboardPage(store),
            childRoutes: [
                {
                    path: 'mydashboards',
                    indexRoute: MyDashboardPage(store),
                },
                {
                    path: 'new',
                    indexRoute: NewDashboardPage(store),
                },
                {
                    path: 'edit/:id',
                    indexRoute: NewDashboardPage(store)
                },
                {
                    path: 'view/new',
                    indexRoute: ViewDashboardPage(store),
                },
                {
                    path: 'view/:id',
                    indexRoute: ViewDashboardPage(store),
                }
                ,
                {
                    path: 'newslider',
                    indexRoute: NewSliderPage(store),
                }
            ]
        },
        {
            path: '/t',
            indexRoute: TestPage(store),
            childRoutes: []
        },

    ])

export default createRoutes
