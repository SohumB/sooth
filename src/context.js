import Morearty from 'morearty';

const startingWorth = [
  { money: 500000 },
  { asset: 1, quantity: 1000 },
  { asset: 2, quantity: 1000 },
  { asset: 3, quantity: 1000 },
  { asset: 4, quantity: 1000 },
  { asset: 5, quantity: 1000 },
  { asset: 6, quantity: 1000 }
];

const start = new Date('2015-07-07 08:00:00Z');
const step1 = new Date('2015-07-07 09:00:00Z');
const step2 = new Date('2015-07-07 10:00:00Z');
const step3 = new Date('2015-07-07 11:00:00Z');

export default Morearty.createContext({
  initialState: {
    users: [{
      id: 1,
      name: 'Aberforth'
    }, {
      id: 2,
      name: 'Bertrand'
    }, {
      id: 3,
      name: 'Cassie'
    }, {
      id: 4,
      name: 'Deborah'
    }],
    // we're using "assets" to mean the classes of shares
    assets: [{
      id: 1,
      name: 'Jordan is Resistance', // JR
      opposite: 2
    }, {
      id: 2,
      name: 'Jordan is a Spy', // JS
      opposite: 1
    }, {
      id: 3,
      name: 'Marigold is Resistance', // MR
      opposite: 4
    }, {
      id: 4,
      name: 'Marigold is a Spy', // MS
      opposite: 3
    }, {
      id: 5,
      name: 'Nils is Resistance', // NR
      opposite: 6
    }, {
      id: 6,
      name: 'Nils is a Spy', // NS
      opposite: 5
    }],
    market: [
      // these trades with counterparty: null and sending: null are used to set up the game
      { type: 'trade', party: 1, counterparty: null, receiving: startingWorth, sending: null, date: start },
      { type: 'trade', party: 2, counterparty: null, receiving: startingWorth, sending: null, date: start },
      { type: 'trade', party: 3, counterparty: null, receiving: startingWorth, sending: null, date: start },
      { type: 'trade', party: 4, counterparty: null, receiving: startingWorth, sending: null, date: start },

      // Aberforth thinks Jordan is a spy. He tests the waters by trying to sell some of his JRs
      { type: 'order', party: 1, offering: { asset: 1 }, asking: { money: 60 }, quantity: 100, date: step1 },

      // Cassie thinks Jordan is resistance. She sees this sell order and decides to snap up a bunch,
      // and she's happy to drive the price for JRs up, too
      { type: 'order', party: 3, offering: { money: 75 }, asking: { asset: 1 }, quantity: 500, date: step2 },

      // The system sees these matching buy and sell orders, and executes the trade
      // principle: trade the minimum assets/balance necessary to fulfil both sides
      { type: 'trade', party: 1, counterparty: 3, receiving: [{ money: 6000 }], sending: [{ asset: 1, quantity: 100 }], date: step2 },

      // so the computed state of the market now is that Cassie has an outstanding buy order
      // for 400 JRs, for upto $75 each

      // Now Deborah decides she believes Jordan is a spy, but she isn't paying attention to the market
      // She puts in a buy order for cheap JSs
      { type: 'order', party: 4, offering: { money: 40 }, asking: { asset: 2 }, quantity: 200, date: step3 },

      // if she'd been paying attention, she would have seen that she had an arbitrage opportunity.
      // The market is always willing to trade $100 for a matched pair, in any direction
      // so she should have bought 200 JR/JS pairs from the market, and sold the JR halves to Cassie
      // effectively buying the the JS halves for $25, not $40.

      // As is, the market is perfectly happy to do that auto-arbitrage for her. This drains money
      // out of the economy, but the reverse auto-arbitrage effectively puts it back, so we don't
      // think this is a major issue
      { type: 'arbitrage', trades: [
        { type: 'trade', party: 3, counterparty: null, receiving: [{ asset: 1, quantity: 200 }], sending: [{ money: 15000 }]},
        { type: 'trade', party: 4, counterparty: null, receiving: [{ asset: 2, quantity: 200 }], sending: [{ money: 8000 }]},
      ], date: step3 }

    ]

  }
});
