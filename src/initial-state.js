const startingWorth = [
  { money: 500000 },
  { stock: 'JR', quantity: 1000 },
  { stock: 'JS', quantity: 1000 },
  { stock: 'MR', quantity: 1000 },
  { stock: 'MS', quantity: 1000 },
  { stock: 'NR', quantity: 1000 },
  { stock: 'NS', quantity: 1000 }
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
    JR: {
      name: 'Jordan is Resistance',
      opposite: 'JS'
    },
    JS: {
      name: 'Jordan is a Spy',
      opposite: 'JR'
    },
    MR: {
      name: 'Marigold is Resistance',
      opposite: 'MS'
    },
    MS: {
      name: 'Marigold is a Spy',
      opposite: 'MR'
    },
    NR: {
      name: 'Nils is Resistance',
      opposite: 'NS'
    },
    NS: {
      name: 'Nils is a Spy',
      opposite: 'NR'
    }
  },
  market: [
    // these trades with counterparty: null and sending: null are used to set up the game
    { type: 'trade', party: 'aberforth', counterparty: null, receiving: startingWorth, sending: null, date: start },
    { type: 'trade', party: 'bertrand', counterparty: null, receiving: startingWorth, sending: null, date: start },
    { type: 'trade', party: 'cassie', counterparty: null, receiving: startingWorth, sending: null, date: start },
    { type: 'trade', party: 'deb', counterparty: null, receiving: startingWorth, sending: null, date: start },

    // Aberforth thinks Jordan is a spy. He tests the waters by trying to sell some of his JRs
    { type: 'order', party: 'aberforth', offering: { stock: 'JR' }, asking: { money: 60 }, quantity: 100, date: step1 },

    // Cassie thinks Jordan is resistance. She sees this sell order and decides to snap up a bunch,
    // and she's happy to drive the price for JRs up, too
    { type: 'order', party: 'cassie', offering: { money: 75 }, asking: { stock: 'JR' }, quantity: 500, date: step2 },

    // The system sees these matching buy and sell orders, and executes the trade
    // principle: second mover advantage, so you can put in an order that takes advantage of an
    // existing counterparty order, but then settle down to your actual price
    { type: 'trade', party: 'aberforth', counterparty: 'cassie', receiving: [{ money: 6000 }], sending: [{ stock: 'JR', quantity: 100 }], date: step2 },

    // so the computed state of the market now is that Cassie has an outstanding buy order
    // for 400 JRs, for upto $75 each

    // Now Deborah decides she believes Jordan is a spy, but she isn't paying attention to the market
    // She puts in a buy order for cheap JSs
    { type: 'order', party: 'deb', offering: { money: 40 }, asking: { stock: 'JS' }, quantity: 200, date: step3 },

    // if she'd been paying attention, she would have seen that she had an arbitrage opportunity.
    // The market is always willing to trade $100 for a matched pair, in any direction
    // so she should have bought 200 JR/JS pairs from the market, and sold the JR halves to Cassie
    // effectively buying the the JS halves for $25, not $40.

    // As is, the market is perfectly happy to do that auto-arbitrage for her. This drains money
    // out of the economy, but the reverse auto-arbitrage effectively puts it back, so we don't
    // think this is a major issue
    { type: 'arbitrage', trades: [
      { type: 'trade', party: 'cassie', counterparty: null, receiving: [{ stock: 'JR', quantity: 200 }], sending: [{ money: 15000 }]},
      { type: 'trade', party: 'deb', counterparty: null, receiving: [{ stock: 'JS', quantity: 200 }], sending: [{ money: 8000 }]},
    ], date: step3 }

  ]

};
