import request from 'superagent' ;

export default function(state = {}, action) {
  console.log("reducer_tradeslist | what is my payload",action);

    switch(action.type) {
        case 'SEARCH_TRADES_FULFILLED':
        {
          console.log("reducer_tradeslist | search_trades | what is my payload",action.payload);
            return action.payload;
        }


        case 'SAVE_EDITED_TRADE_FULFILLED': {
            let tradesCopy = state.trades.slice();
            let index = tradesCopy.findIndex(x => x.tradeId===action.payload.trade.tradeId);
            tradesCopy[index].quantity = action.payload.trade.quantity ;
            tradesCopy[index].price = action.payload.trade.price ;
            return {
                ...state,
                selectedTradeId: action.payload.trade.tradeId,
                trades: tradesCopy
            };
        }

        case 'SAVE_CREATED_TRADE_FULFILLED': {
            let tradesCopy = state.trades.slice();
            tradesCopy.push(action.payload.trade) ;
            return {
                ...state,
                selectedTradeId: action.payload.trade.tradeId,
                trades: tradesCopy
            }
        }

        case 'DELETE_TRADE': {
            return {
                ...state,
                selectedTradeId:0,
                trades: state.trades.slice().filter(value => value.tradeId != action.payload.trade.tradeId)
            }
        }

    }



    //get the default trades for first rendering
    //if(!state.hasOwnProperty('selectedTradeId') && !state.hasOwnProperty('trades')) {
    //     let trades = request.get('/api/trade/searchTrades')
    //            .query({
    //              trader : "hbhatnagar@sapient.com"
    //            })
    //            .then(
    //              res => {
    //                console.log("my default trades on first rendering :",res);
    //
    //                const trades = res.body.trades ;
    //                const mappedTrades = trades.map(trade => {
    //                  return {
    //                          tradeDate: new Date(trade.tradeDate).toLocaleDateString("en-US") ,
    //                          commodity: trade.commodity,
    //                          side: trade.side,
    //                          quantity: trade.quantity,
    //                          price: trade.price,
    //                          location: trade.location,
    //                          counterparty: trade.counterparty,
    //                          tradeId: trade.tradeId
    //                        }
    //                });
    //
    //                return {selectedTradeId : 0, trades : mappedTrades}
    //              }
    //            ).catch(err => {console.log(1,err)})
      //  return {selectedTradeId : 0, trades : []}
    //
    // }
    console.log("reducer_tradeslist.js : Is th the below state returned :",state);
    return state ; //return state as it is if action dosent impact it
}

function createSomeDummyTrades() {
    const metal = ['Iron','Gold','Silver','Platinum','Alu','Uranium'];
    const cp = ['ABC','XYZ','WRU','PS' ,'Corp'];
    const side = ['buy','sell'];
    const location = ['China','Japan','Singapore','Malaysia'];
    let trade = {
        tradeDate : (new Date((new Date()).getTime() + 10000000000*Math.random())).toLocaleDateString("en-US"),
        commodity : metal[Math.floor(Math.random() * metal.length)],
        side :side[Math.floor(Math.random() * side.length)],
        quantity : Math.floor(10 + 50*Math.random()),
        price : Math.floor(134 - 20*Math.random()),
        location : location[Math.floor(Math.random() * location.length)],
        counterparty : cp[Math.floor(Math.random() * cp.length)],
        tradeId : Math.floor(Math.random()*10000)
    } ;
    return trade ;
}
