import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import RequireAuth from './components/auth/Require_Auth';
import Welcome from './components/Welcome';
import configureStore from './store';

import DevTools from './Devtools';
import { AUTH_USER } from './actions/types';

const store = configureStore();
const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
<Provider store={store}>
    <div>
        <Router history={history}>
            <App>
                <Route path="/" exact component={Welcome} />
                <Route path="/signin" component={Signin} />
                <Route path="/signout" component={Signout} />
                <Route path="/signup" component={Signup} />
                <Route path="/feature" component={RequireAuth(Feature)} />
            </App>
        </Router>
    <DevTools />
    </div>
</Provider>
, document.getElementById('root')
);
registerServiceWorker();
