import LoginPage from '../login';
import DashboardPage from '../dashboard';
import MyDashboardPage from '../dashboard/my-dashboards';

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
            indexRoute: DashboardPage(store),
            childRoutes: [
                {
                    path: 'mydashboards',
                    indexRoute: MyDashboardPage(store),
                }
            ]
        },
        {
            path: '/**',
            indexRoute: LoginPage(store),
            childRoutes: []
        }
    ])

export default createRoutes
