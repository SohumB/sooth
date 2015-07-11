import { createClass } from 'utils';

export default path => createClass({
  render() {
    const b = this.binding().sub(path);
    b.meta().set('currentPath', this.meta().get('currentPath'));

    return <RouteHandler binding={ b } />;
  }
})
