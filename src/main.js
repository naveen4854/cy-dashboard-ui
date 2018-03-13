import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './app/app.container';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store/create-store';

const initialState = window.___INITIAL_STATE__
export const store = createStore(initialState)

let render = () => {
    const routes = require('./routes/index').default(store)
    ReactDOM.render(<AppContainer store={store} routes={routes} />, document.getElementById('root'));
}
render()
registerServiceWorker();
