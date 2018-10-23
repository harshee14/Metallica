export default function(state = {}, action)
{

  switch(action.type)
    {
      case 'SEARCH_TRADES':
      return action.payload;

      case 'SAVE_EDITED_TRADE':
      {
        state.selectedTradeId = action.payload.trade.tradeId;
        var editedTrade = action.payload.trade ;
        var index = state.trades.findIndex(x => x.tradeId===state.selectedTradeId);
        state.trades[index].quantity = action.payload.trade.quantity ;
        state.trades[index].price = action.payload.trade.price ;
        state.trades[index].startDate = action.payload.trade.startDate ;
        state.trades[index].endDate = action.payload.trade.endDate ;
                console.log("my state in save edited trade",state);
        return state ;

      }

    }

// get the default trades for first rendering
 if(!state.hasOwnProperty('selectedTradeId') && !state.hasOwnProperty('trades'))
 {
  let trades = [];
  let selectedTradeId = 0 ;

  for (var i = 10; i >= 0; i--) {
           trades.push(createSomeDummyTrades());
       }
       return {selectedTradeId,trades};
  }

  return state ; //return state as it is if action dosent impact it and it is not initializtion
}

function createSomeDummyTrades()
{
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
      tradeId : Math.floor(Math.random()*10000),
      startDate : (new Date((new Date()).getTime() + 30000000000*Math.random())).toLocaleDateString("en-US"),
      endDate : (new Date((new Date()).getTime() + 60000000000*Math.random())).toLocaleDateString("en-US")
  } ;

  return trade ;
}
