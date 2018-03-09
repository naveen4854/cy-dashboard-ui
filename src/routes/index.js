import LoginPage from '../login';

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
            path: '/**',
            indexRoute: LoginPage(store),
            childRoutes: []
        }
    ])

export default createRoutes
