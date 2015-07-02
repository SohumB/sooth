import React from 'react/addons';
import { RouteHandler } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div>
        <header></header>
        <section className="content">
          <RouteHandler />
        </section>
        <footer></footer>
      </div>
    );
  }
});
