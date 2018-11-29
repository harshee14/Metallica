import request from 'superagent' ;

export function login(response)
{
  return {
            type: 'LOGIN',
            payload: response
        };
}

export function logout()
{
   let nullUser = { isAuthenticated: false, user: null, token: ''};
   return {
     type : 'LOGOUT',
     payload : nullUser
   };
}

export function saveEditedTrade(mode, trade) {
    let packet = { mode: mode, trade: trade };
    let servicePromise = request.put('/api/trade/editTrade')
            .query({
              tradeId : trade.tradeId
            })
            //.set('Content-Type', 'application/json')
            //.send(JSON.stringify(trade))
            .send(trade)
            .then(
              res => {
                return {mode,trade} ;
              }
            );
    return {
        type: 'SAVE_EDITED_TRADE',
        payload: servicePromise
    };
}

export function saveCreatedTrade(mode, createdTrade) {

  let servicePromise = request.post('/api/trade/createTrade')
          .send(createdTrade)
          .then(
            res => {
              let tradeId = res.body.trade.tradeId ;
              let trade =  {...createdTrade,tradeId};

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

export function deleteTrade(mode, deletedTrade) {
    let packet = { mode: mode, trade: deletedTrade };
    let servicePromise = request.delete('/api/trade/deleteTrade')
            .query({
              tradeId : deletedTrade.tradeId
            })
            .then(
              res => {
                console.log("my deleted trade response",res);
                return {mode,trade: deletedTrade} ;
              }
            );

    return {
        type: 'DELETE_TRADE',
        payload: servicePromise
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

    return {
        type: 'SEARCH_TRADES', //always instantiated
        payload: servicePromise //not necessary
    };
}
