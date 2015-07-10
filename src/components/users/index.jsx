import React from 'react/addons';
import { Route } from 'react-router';

import Root from './root';
import List from './list';
import Form from './form';

export default (
  <Route path="" handler={Root}>
    <Route path="" handler={List} />
    <Route path=":id" handler={Form} name="users.form" />
  </Route>
);
