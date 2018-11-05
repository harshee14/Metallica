import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware' ;
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>,
    document.getElementById('root')
  );
