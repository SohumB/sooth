import React from 'react/addons';
window.React = React;

import { DefaultRoute, Route, NotFoundRoute, RouteHandler } from 'react-router';
import Morearty from 'morearty';

import initialState from 'initial-state';
import BindToChild from './bind-to-child';
import Router from './router';

import Root from 'components/root';
import App from 'components/app';
import Users from 'components/users';
import NotFound from 'components/not-found';

import { createClass } from 'utils';



const Ctx = Morearty.createContext({ initialState });

const routes = (
  <Route handler={Root}>
    <DefaultRoute handler={App} />

    <Route path="/users" handler={BindToChild('users')}>
      { Users }
    </Route>

    <NotFoundRoute handler={NotFound} />
  </Route>
);

const Bootstrap = Ctx.bootstrap(Router(routes));
React.render(<Bootstrap />, document.getElementById("container"));
