import LoginPage from '../login';
import MyDashboardPage from '../dashboard/my-dashboards';
import NewDashboardPage from '../dashboard/new-dashboard';
import ViewDashboardPage from '../dashboard/view-dashboard';
import TestPage from '../components/test-resize';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => (
    [
        {
            path: '/login',
            indexRoute: LoginPage(store),
            childRoutes: []
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
                    path: 'view/:id',
                    indexRoute: ViewDashboardPage(store),
                }
            ]
        },
        {
            path: '/t',
            indexRoute: TestPage(store),
            childRoutes: []
        },
        {
            path: '/**',
            indexRoute: LoginPage(store),
            childRoutes: []
        }
    ])

export default createRoutes
