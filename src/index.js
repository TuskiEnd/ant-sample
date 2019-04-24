import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './stores';
import 'babel-polyfill';
import Routes from './App';
import './styles/reset.less';
import './styles/index.less';

const history = syncHistoryWithStore(hashHistory, store());
if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <Provider store={store()}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root')
);
