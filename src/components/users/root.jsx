import { RouteHandler } from 'react-router';
import { createClass } from 'utils';

export default createClass({
  render() {
    const id = this.props.params && this.props.params.id;
    const b = id ? this.binding().sub(id) : this.binding();

    return (
      <div className="users">
        <RouteHandler binding={ b } />
      </div>
    );
  }
});
