export function saveEditedTrade(mode,trade)
{
  let packet = {mode : mode , trade : trade} ;
  console.log('how does my save editedTrade packet look like ?',packet);
  return {
    type : 'SAVE_EDITED_TRADE',
    payload : packet
  };
}

export function viewTrade(mode,trade)
{
  let packet = {mode : mode , trade : trade} ;
  return {
    type : 'VIEW_TRADE',
    payload : packet
  };
}

export function editTrade(mode,trade)
{
  let packet = {mode : mode , trade : trade} ;
  return {
    type : 'EDIT_TRADE',
    payload : packet
  };
}

export function searchTrades(searchQuery)
{
  let trades = [];
  let selectedTradeId = 0 ;
  for (var i = 10; i >= 0; i--) {
      trades.push(createDummyTrades());
  }
  return {
    type : 'SEARCH_TRADES', //always instantiated
    payload: {selectedTradeId,trades}  //not necessary
  };
}

function createDummyTrades()
{
    const metal = ['Iron','Gold','Silver','Platinum','Alu','Uranium'];
    const cp = ['ABC','XYZ','WRU','PS' ,'Corp'];
    const side = ['Buy','Sell'];
    const location = ['China','Japan','Singapore','Malaysia'];

    return {
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
    };
}
