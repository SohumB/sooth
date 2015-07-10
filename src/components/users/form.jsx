import { createClass } from 'utils';
import { input as Input } from 'utils/dom';
import { set } from 'utils/callback';

export default createClass({
  render() {
    const b = this.binding();
    const user = b.get();

    return (
      <div className="form">
        <Input className="name" value={ user.get('name') } onChange={ set(b, 'name') } />
      </div>
    );
  }
});
