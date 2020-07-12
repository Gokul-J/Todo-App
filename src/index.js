import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import Main from './containers/Main'
import User from './containers/User';
import Signup from './containers/Signup';
import Login from './containers/Login';
import * as serviceWorker from './serviceWorker';

import todoReducer from './reducers/todoReducer';
import userReducer from './reducers/userReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = combineReducers({todo: todoReducer, user: userReducer})
const store = createStore(rootReducer, applyMiddleware(logger,thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={test} />          
          <Route path='/main' component={Main} />          
          <Route path='/user' component={User} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            path="*"
            render={() => 
              <Redirect to="/" />
            } />
        </Switch>
      </Router>
    </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
