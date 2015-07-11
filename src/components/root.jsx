import { createClass } from 'utils';
import { RouteHandler } from 'react-router';

export default createClass({
  render() {
    return (
      <div>
        <header></header>
        <section className="content">
          <RouteHandler binding={ this.binding() } />
        </section>
        <footer></footer>
      </div>
    );
  }
});
