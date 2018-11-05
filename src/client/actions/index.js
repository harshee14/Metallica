import request from 'superagent' ;

export function saveEditedTrade(mode, trade) {
    let packet = { mode: mode, trade: trade };
    console.log('how does my save editedTrade packet look like ?', packet);
    return {
        type: 'SAVE_EDITED_TRADE',
        payload: packet
    };
}

export function saveCreatedTrade(mode, trade) {
    let temptrade = {
        tradeDate: trade.tradeDate,
        commodity: trade.commodity,
        side: trade.side,
        quantity: trade.quantity,
        price: trade.price,
        location: trade.location,
        counterparty: trade.counterparty,
        tradeId: Math.floor(Math.random() * 10000),
        startDate: trade.startDate.format("MM/DD/YYYY"),
        endDate: trade.endDate.format("MM/DD/YYYY")
    };
    let packet = { mode: mode, trade: temptrade };

    console.log('how does my save createdTrade packet look like ?', packet);
    return {
        type: 'SAVE_CREATED_TRADE',
        payload: packet
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
    console.log('how does my save deletedTrade packet look like ?', packet);
    return {
        type: 'DELETE_TRADE',
        payload: packet
    };
}

export function viewTrade(mode, trade) {
    console.log('how does my save viewTrade packet look like ?', packet);
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
            startDate : Math.floor(new Date(searchQuery.startDate).getTime()/1000),
            endDate : Math.floor(new Date(searchQuery.endDate).getTime()/1000),
            commodity : searchQuery.commodity[0].name ,
            counterpartyId : searchQuery.counterparty[0].name,
            location : searchQuery.location[0].name
          })
          .then(
            res => {
              console.log(res);

              const trades = res.body.trades ;
              const mappedTrades = trades.map(trade => {
                return {
                        tradeDate: new Date(trade.tradeDate).toLocaleDateString("en-US") ,
                        commodity: trade.commodityId,
                        side: trade.side,
                        quantity: trade.quantity,
                        price: trade.price,
                        location: trade.location,
                        counterparty: trade.counterpartyId,
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
        tradeId: Math.floor(Math.random() * 10000),
        startDate: (new Date((new Date()).getTime() + 30000000000 * Math.random())).toLocaleDateString("en-US"),
        endDate: (new Date((new Date()).getTime() + 60000000000 * Math.random())).toLocaleDateString("en-US")
    };
}
