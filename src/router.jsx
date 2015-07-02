import React from 'react/addons';
window.React = React;

import Router from 'react-router';
import { DefaultRoute, Route, NotFoundRoute } from 'react-router';

import Root from './root';
import App from './components/app';

import NotFound from './components/not-found';

const routes = (
  <Route handler={Root}>
    <DefaultRoute handler={App} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, Handler => React.render(<Handler />, document.getElementById("container")));
