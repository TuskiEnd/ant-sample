import React from 'react';
import { Router } from 'react-router';

const Index = import('./pages/index/Index');
const getComponent = (pkg) => (location, cb) => {
  pkg.then((module) => {
    cb(null, module.default);
  });
};
const routes = [
  {
    path: '/',
    getComponent: getComponent(Index)
  },
  {
    path: '/employee',
    getComponent: getComponent(Index)
  },
];

export default (props) => <Router history={props.history}
                                  routes={routes} />;

