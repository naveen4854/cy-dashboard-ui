import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app/app.component';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store/create-store';

const initialState = window.___INITIAL_STATE__
export const store = createStore(initialState)

let render = () => {
    const routes = require('./routes/index').default(store)
    ReactDOM.render(<AppComponent store={store} routes={routes} />, document.getElementById('root'));
}
render()
registerServiceWorker();
