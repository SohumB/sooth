import React from 'react/addons';
import Morearty from 'morearty';
import { compose, lensProp, defaultTo, concat } from 'ramda';

export const CreatureComforts = {
  binding() { return this.getDefaultBinding(); },
  meta() { return this.binding().meta(); }
};

const mixins = lensProp('mixins');
const concatMixins = compose(concat([ Morearty.Mixin, CreatureComforts ]) , defaultTo([]));

export default compose(React.createClass, mixins.map(concatMixins));
