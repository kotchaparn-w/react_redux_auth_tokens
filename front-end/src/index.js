import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
import Signin from './components/auth/Signin';
import configureStore from './store';

import DevTools from './Devtools';

const store = configureStore();

ReactDOM.render(
<Provider store={store}>
    <div> 
        <Router history={history}>
            <App >
                <Route path="/signin" component={Signin} />
            </App>
        </Router>
    <DevTools />
    </div>
</Provider>
, document.getElementById('root')
);
registerServiceWorker();
