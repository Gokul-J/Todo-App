import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import Signup from './containers/Signup';
import Login from './containers/Login';
// import store from './redux';
import * as serviceWorker from './serviceWorker';

import indexReducer from './reducers/indexReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(indexReducer, applyMiddleware(logger,thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
        <div>
          <Route exact path='/' component={App} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
