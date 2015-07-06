import React from 'react/addons';
window.React = React;

import ReactRouter from 'react-router';
import { DefaultRoute, Route, NotFoundRoute } from 'react-router';

import Morearty from 'morearty';

import Root from 'root';
import App from 'components/app';

import NotFound from 'components/not-found';

import { createClass } from 'utils';

const routes = (
  <Route handler={Root}>
    <DefaultRoute handler={App} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

const Ctx = Morearty.createContext({
  initialState: {

  }
});

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
