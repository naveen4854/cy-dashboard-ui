import LoginPage from '../login';
import MyDashboardPage from '../dashboard/my-dashboards';
import NewDashboardPage from '../dashboard/new-dashboard';

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
