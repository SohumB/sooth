import ReactRouter from 'react-router';
import { createClass } from 'utils';

// this is based off https://github.com/moreartyjs/morearty-react-router
export default routes => createClass({

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
