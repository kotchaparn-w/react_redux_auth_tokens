import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router-dom';

import reducers from './reducers';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
import Signin from './components/auth/Signin';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history}>
        <App >
            <Route path="/signin" component={Signin} />
        </App>
    </Router>
</Provider>
, document.getElementById('root')
);
registerServiceWorker();
