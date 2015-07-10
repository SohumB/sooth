import React from 'react/addons';
window.React = React;

import ReactRouter from 'react-router';
import { DefaultRoute, Route, NotFoundRoute, RouteHandler } from 'react-router';

import Morearty from 'morearty';

import Ctx from 'context';

import Root from 'root';
import App from 'components/app';

import NotFound from 'components/not-found';

import Users from 'components/users';

import { createClass } from 'utils';

export const BindToChild = path => createClass({
  render() {
    const b = this.binding().sub(path);
    b.meta().set('currentPath', this.meta().get('currentPath'));

    return <RouteHandler binding={ b } />
  }
})

const routes = (
  <Route handler={Root}>
    <DefaultRoute handler={App} />

    <Route path="/users" handler={BindToChild('users')}>
      { Users }
    </Route>

    <NotFoundRoute handler={NotFound} />
  </Route>
);

// this is based off https://github.com/moreartyjs/morearty-react-router
export const Router = createClass({

  componentWillMount() {
    ReactRouter.run(routes, ReactRouter.HistoryLocation, (Handler, state) => {
      this.Handler = Handler; // really? That seems wrong...
      this.meta().set('currentPath', state.path);
    });
  },

  render() {
    const Handler = this.Handler;

    return Handler ? <Handler binding={ this.binding() } /> : false;
  }
});

const Bootstrap = Ctx.bootstrap(Router);
React.render(<Bootstrap />, document.getElementById("container"));
