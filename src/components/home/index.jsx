import { createClass } from 'utils';
import { Link } from 'react-router';

export default createClass({
  render() {
    return (
      <Link to="/users">Users</Link>
    );
  }
});
