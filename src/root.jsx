import React from 'react/addons';
import { RouteHandler } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div>
        <header></header>
        <section className="content">
          <RouteHandler binding={ this.getDefaultBinding() } />
        </section>
        <footer></footer>
      </div>
    );
  }
});
