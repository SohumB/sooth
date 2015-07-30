const start = new Date('2015-07-07 08:00:00Z');
const step1 = new Date('2015-07-07 09:00:00Z');
const step2 = new Date('2015-07-07 10:00:00Z');
const step3 = new Date('2015-07-07 11:00:00Z');

export default {
  market: [
    // first, the stocks are opened
    // we're using "stocks" to mean the classes of shares
    { type: 'open-stock', stock: { id: 'JS', name: 'Jordan is a Spy' }, date: start },
    { type: 'open-stock', stock: { id: 'MS', name: 'Marigold is a Spy' }, date: start },
    { type: 'open-stock', stock: { id: 'NS', name: 'Nils is a Spy' }, date: start },

    // then, the users are created
    {
      type: 'new-user',
      date: start,
      user: {
        id: 'aberforth',
        name: 'Aberforth',
        money: 50000,
        inventory: { JS: 100, MS: 100, NS: 100 }
      }
    },

    {
      type: 'new-user',
      date: start,
      user: {
        id: 'bertrand',
        name: 'Bertrand',
        money: 50000,
        inventory: { JS: 100, MS: 100, NS: 100 }
      }
    },

    {
      type: 'new-user',
      date: start,
      user: {
        id: 'cassie',
        name: 'Cassie',
        money: 50000,
        inventory: { JS: 100, MS: 100, NS: 100 }
      }
    },

    {
      type: 'new-user',
      date: start,
      user: {
        id: 'deb',
        name: 'Deborah',
        money: 50000,
        inventory: { JS: 100, MS: 100, NS: 100 }
      }
    },


    // Aberforth thinks Jordan is a spy. He tests the waters by trying to buy some JSs
    { type: 'order', party: 'aberforth', offering: { money: 40 }, asking: { stock: 'JS' }, quantity: 200, date: step1 },

    // Cassie thinks Jordan is resistance. She sees this buy order and decides to take advantage
    // and she's happy to drive the price for JSs down, too
    { type: 'order', party: 'cassie', offering: { stock: 'JS' }, asking: { money: 25 }, quantity: 500, date: step2 },

    // The system sees these matching buy and sell orders, and executes the trade
    // principle: second mover advantage, so you can put in an order that takes advantage of an
    // existing counterparty order, but then settle down to your actual price
    { type: 'trade', party: 'aberforth', counterparty: 'cassie', receiving: { stock: 'JS', quantity: 200 }, sending: { money: 8000 }, date: step2 },

    // note that Cassie now has -100 JSs. This is completely fine, and no one cares.
    // If she still has any outstanding -JSs by the time the market closes, the market
    // will force her to buy them at the then known true value.

    // so the computed state of the market now is that Cassie has $508000,
    // an outstanding sell order for 300 JSs, for at least $25 each

    // now the market closes JS. Bad news for Cassie; Jordan was a spy,
    // so the market is going to close the stock at $100

    { type: 'close-stock', stock: 'JS', money: 100, date: step3 }

    // implicitly, Cassie's outstanding buy order is now also no longer in effect.

    // the market forces anyone with the stock in their inventory to trade it at the final value
    // so effectively the following "trades" happen

    // they're not stored as actual trades in the market,
    // so as to not affect the historical details of the stock

    // { type: 'trade', party: 'aberforth', counterparty: null, receiving: { money: 30000 }, sending: { stock: 'JS', quantity: 300 }, date: step3 },
    // { type: 'trade', party: 'bertrand', counterparty: null, receiving: { money: 10000 }, sending: { stock: 'JS', quantity: 100 }, date: step3 },
    // { type: 'trade', party: 'cassie', counterparty: null, receiving: { stock: 'JS', quantity: 100 }, sending: { money: 10000 }, date: step3 },
    // { type: 'trade', party: 'deb', counterparty: null, receiving: { money: 10000 }, sending: { stock: 'JS', quantity: 100 }, date: step3 }
  ]

};
