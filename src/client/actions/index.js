import request from 'superagent' ;

export function saveEditedTrade(mode, trade) {
    let packet = { mode: mode, trade: trade };
    console.log("what is the trade I am sending for editing",trade.quantity);
    let servicePromise = request.put('/api/trade/editTrade')
            .query({
              tradeId : trade.tradeId
            })
            //.set('Content-Type', 'application/json')
            //.send(JSON.stringify(trade))
            .send(trade)
            .then(
              res => {
                console.log("my edited trade response",res);
                return {mode,trade} ;
              }
            );
    return {
        type: 'SAVE_EDITED_TRADE',
        payload: servicePromise
    };
}

export function saveCreatedTrade(mode, trade) {

  console.log("what is the trade I am sending for creating",trade);
  let servicePromise = request.put('/api/trade/createTrade')
          // .query({
          //   tradeId : trade.tradeId
          // })
          //.set('Content-Type', 'application/json')
          //.send(JSON.stringify(trade))
          .send(trade)
          .then(
            res => {
              console.log("my created trade response",res);
              return {mode,trade} ;
            }
          );
  return {
      type: 'SAVE_CREATED_TRADE',
      payload: servicePromise
  };
}

export function createTrade(mode) {
    let packet = { mode: mode };
    return {
        type: 'CREATE_TRADE',
        payload: packet
    };
}

export function deleteTrade(mode, trade) {
    let packet = { mode: mode, trade: trade };

    return {
        type: 'DELETE_TRADE',
        payload: packet
    };
}

export function viewTrade(mode, trade) {

    let packet = { mode: mode, trade: trade };
    return {
        type: 'VIEW_TRADE',
        payload: packet
    };
}

export function editTrade(mode, trade) {
    let packet = { mode: mode, trade: trade };
    return {
        type: 'EDIT_TRADE',
        payload: packet
    };
}

export function searchTrades(searchQuery) {
 const selectedTradeId = 0
   let servicePromise =  request.get('/api/trade/searchTrades')
          .query({
            buy : searchQuery.buySide ? 1 : 0,
            sell : searchQuery.sellSide ? 1 : 0,
            startDate : searchQuery.startDate,
            endDate : searchQuery.endDate,
            commodity : searchQuery.commodity ,
            counterparty : searchQuery.counterparty,
            location : searchQuery.location,
            trader : searchQuery.trader
          })
          .then(
            res => {
              console.log("actions/index.js/Searchtrades : Search query response",res);

              const trades = res.body.trades ;
              const mappedTrades = trades.map(trade => {
                return {
                        tradeDate: new Date(trade.tradeDate).toLocaleDateString("en-US") ,
                        commodity: trade.commodity,
                        side: trade.side,
                        quantity: trade.quantity,
                        price: trade.price,
                        location: trade.location,
                        counterparty: trade.counterparty,
                        tradeId: trade.tradeId
                      }
              });

              return {selectedTradeId : 0, trades : mappedTrades}
            }
          ).catch(err => {console.log(1,err)})
    // let trades = [];
    // let selectedTradeId = 0;
    // for (var i = 10; i >= 0; i--) {
    //     trades.push(createDummyTrades());
    // }
    return {
        type: 'SEARCH_TRADES', //always instantiated
        payload: servicePromise //not necessary
    };
}


function createDummyTrades() {
    const metal = ['Iron', 'Gold', 'Silver', 'Platinum', 'Alu', 'Uranium'];
    const cp = ['ABC', 'XYZ', 'WRU', 'PS', 'Corp'];
    const side = ['Buy', 'Sell'];
    const location = ['China', 'Japan', 'Singapore', 'Malaysia'];

    return {
        tradeDate: (new Date((new Date()).getTime() + 10000000000 * Math.random())).toLocaleDateString("en-US"),
        commodity: metal[Math.floor(Math.random() * metal.length)],
        side: side[Math.floor(Math.random() * side.length)],
        quantity: Math.floor(10 + 50 * Math.random()),
        price: Math.floor(134 - 20 * Math.random()),
        location: location[Math.floor(Math.random() * location.length)],
        counterparty: cp[Math.floor(Math.random() * cp.length)],
        tradeId: Math.floor(Math.random() * 10000)
    };
}
