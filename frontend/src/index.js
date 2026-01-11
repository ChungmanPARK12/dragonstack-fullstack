import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import rootReducer from './reducers';
import Root from './components/Root';
import AccountDragons from './components/AccountDragons';
import { fetchAuthenticated } from './actions/account';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const AuthRoute = props => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: '/'}} />
  }
  const { component, path} = props;
  return <Route poth={path} component={component} />;
}

store.dispatch(fetchAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Root} />
          <AuthRoute Route path='/account-dragons' component={AccountDragons} />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
});
