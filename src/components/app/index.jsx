import { createClass } from 'utils';
import { RouteHandler } from 'react-router';
import I from 'immutable';
import { compose } from 'ramda';

export default createClass({
  cache() {
    const b = this.binding().sub('market');

    return b.get().reduce((acc, event) => {
      const type = event.get('type');

      // users
      if (type === 'new-user') {
        const user = event.get('user');

        // TODO: assert type of user object

        return acc.setIn(['users', user.get('id')], user);
      }

      // stocks
      if (type === 'open-stock') {
        const stock = event.get('stock').merge({ closed: false });

        // TODO: assert type of stock object

        return acc.setIn(['stocks', stock.get('id')], stock);
      }

      if (type === 'close-stock') {
        const id = event.get('stock');
        const finalValue = event.get('money');

        // TODO: assert type of finalValue

        return acc.updateIn(['stocks', id], stock => stock.merge({
          closed: true,
          money: finalValue

        })).update('users', users => users.map(user => {
          // the market forces anyone with the stock in their
          // inventory to trade it at its final value

          // i.e. they have to buy it at the final value if they have a negative quantity
          // and they have to to sell it at the final value if they have a positive quantity

          const path = ['inventory', id];
          return user.update('money',
                             money => money + user.getIn(path, 0) * finalValue).deleteIn(path);
        }));
      }

      // trades
      if (type === 'trade') {
        const partyId = event.get('party');
        const counterpartyId = event.get('counterparty');

        const modify = sign => (id, what) => users => {
          if (id) {
            const user = users.get(id);

            if (what.has('money')) {
              return users.updateIn([id, 'money'],
                                    money => money + (sign * what.get('money')));

            } else if (what.has('stock')) {
              return users.updateIn([id, 'inventory', what.get('stock')],
                                    quantity => quantity + (sign * what.get('quantity')));

            } else {
              throw new Error('Unknown trade item found' + what);
            }
          } else {
            return users;
          }
        };

        const add = modify(1);
        const remove = modify(-1);

        const receiving = event.get('receiving');
        const sending = event.get('sending');

        // TODO: assert type of receiving and sending objects

        const party = compose(add(partyId, receiving), remove(partyId, sending));
        const counterparty = compose(add(counterpartyId, sending), remove(counterpartyId, receiving));

        return acc.update('users', compose(party, counterparty));
      }

      // orders
      if (type === 'order') {
        // TODO: order
      }

      return acc;

    }, I.Map());
  },

  render() {
    return (
      <div>
        <header></header>
        <section className="content">
          { /* this.cache() is a pure function of the binding,
               and Morearty.Mixin ignores non-binding props in its default shouldComponentUpdate
               so this does the right thing, passing down the current cache
               but only recomputing it when it's needed to */ }
          <RouteHandler binding={ this.binding() } cache={ this.cache() } />
        </section>
        <footer></footer>
      </div>
    );
  }
});
