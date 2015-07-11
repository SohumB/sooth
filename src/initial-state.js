const startingWorth = [
  { money: 500000 },
  { stock: 'JS', quantity: 100 },
  { stock: 'MS', quantity: 100 },
  { stock: 'NS', quantity: 100 }
];

const start = new Date('2015-07-07 08:00:00Z');
const step1 = new Date('2015-07-07 09:00:00Z');
const step2 = new Date('2015-07-07 10:00:00Z');
const step3 = new Date('2015-07-07 11:00:00Z');

export default {
  users: {
    aberforth: { name: 'Aberforth' },
    bertrand: { name: 'Bertrand '},
    cassie: { name: 'Cassie' },
    deb: { name: 'Deborah' }
  },
  // we're using "stocks" to mean the classes of shares
  stocks: {
    JS: { name: 'Jordan is a Spy' },
    MS: { name: 'Marigold is a Spy' },
    NS: { name: 'Nils is a Spy' }
  },
  market: [
    // these trades with counterparty: null and sending: null are used to set up the game
    { type: 'trade', party: 'aberforth', counterparty: null, receiving: startingWorth, sending: null, date: start },
    { type: 'trade', party: 'bertrand', counterparty: null, receiving: startingWorth, sending: null, date: start },
    { type: 'trade', party: 'cassie', counterparty: null, receiving: startingWorth, sending: null, date: start },
    { type: 'trade', party: 'deb', counterparty: null, receiving: startingWorth, sending: null, date: start },

    // Aberforth thinks Jordan is a spy. He tests the waters by trying to buy some JSs
    { type: 'order', party: 'aberforth', offering: { money: 40 }, asking: { stock: 'JS' }, quantity: 200, date: step1 },

    // Cassie thinks Jordan is resistance. She sees this buy order and decides to take advantage
    // and she's happy to drive the price for JSs down, too
    { type: 'order', party: 'cassie', offering: { stock: 'JS' }, asking: { money: 25 }, quantity: 500, date: step2 },

    // The system sees these matching buy and sell orders, and executes the trade
    // principle: second mover advantage, so you can put in an order that takes advantage of an
    // existing counterparty order, but then settle down to your actual price
    { type: 'trade', party: 'aberforth', counterparty: 'cassie', receiving: [{ stock: 'JS', quantity: 200 }], sending: [{ money: 8000 }], date: step2 },

    // note that Cassie now has -100 JSs. This is completely fine, and no one cares.
    // If she still has any outstanding -JSs by the time the market closes, the market
    // will force her to buy them at the then known true value.

    // so the computed state of the market now is that Cassie has an outstanding sell order
    // for 300 JSs, for at least $25 each
  ]

};
