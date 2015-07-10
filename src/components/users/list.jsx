import { createClass } from 'utils';
import { Link } from 'react-router';

export default createClass({
  render() {
    const renderOne = (user, id) => (
      <li>
        <Link to="users.form" params={ { id } }>
          { user.get('name') }
        </Link>
      </li>
    );
    return (
      <ul className="list">
        { this.binding().get().map(renderOne) }
      </ul>
    );
  }
});
