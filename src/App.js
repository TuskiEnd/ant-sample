import React from 'react';
import { Router } from 'react-router';

const Index = import('./pages/index/Index');
const Edit = import('./pages/Edit/index');
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
  {
    path: '/admin',
    getComponent: getComponent(Index)
  },
  {
    path: '/edit',
    getComponent: getComponent(Edit)
  },
];

export default (props) => <Router history={props.history}
                                  routes={routes} />;

