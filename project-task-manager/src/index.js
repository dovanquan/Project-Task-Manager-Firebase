import React from 'react';
import ReactDOM from 'react-dom';

import { firebaseApp } from './firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducers from './reducers/index';

import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
	appReducers, /* preloadedState, */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(firebaseApp);
ReactDOM.render(
	<Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));


serviceWorker.unregister();