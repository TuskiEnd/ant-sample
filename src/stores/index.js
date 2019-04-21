import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

export default function store() {
  const devtools = window.devToolsExtension || (() => (noop) => noop);

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });
  const middlewares = [routerMiddleware(browserHistory), thunkMiddleware, promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR'] })];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const enhancers = [applyMiddleware(...middlewares), devtools()];

  const initState = {};
  const store = createStore(rootReducer, initState, compose(...enhancers));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers/index');
      const nextRootReducer = combineReducers({
        ...nextReducer,
        routing: routerReducer
      });
      store.replaceReducer(nextReducer);
    });
  }

  return store;

}

