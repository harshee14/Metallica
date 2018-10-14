export function getUpdatedPrice()
{
  // after integration prices will come from backend
    let metalAndPrices = [
                {key:'Iron',price:23 * (Math.random()-0.5)},
                {key:'Gold',price:100 * (Math.random()-0.5)},
                {key:'Silver',price:80 * (Math.random()-0.5)},
                {key:'Alu',price:5 * (Math.random()-0.5)},
                {key:'Platinum',price:150 * (Math.random()-0.5)},
                {key:'Uranium',price:500 * (Math.random()-0.5)}
                ];
  return {
    type : 'PRICES_NOTIFICATION', //always instantiated
    payload: metalAndPrices  //not necessary
  };
}

export function searchTrades(searchQuery)
{
  //after integration , trades will come from backend
  createDummyTrades()
  {
      const metal = ['Iron','Gold','Silver','Platinum','Alu','Uranium'];
      const cp = ['ABC','XYZ','WRU','PS' ,'Corp'];
      const side = ['buy','sell'];
      const location = ['China','Japan','Singapore','Malaysia'];

      return {
          tradeDate : (new Date((new Date()).getTime() + 10000000000*Math.random())).toLocaleDateString("en-US"),
          commodity : metal[Math.floor(Math.random() * metal.length)],
          side :side[Math.floor(Math.random() * side.length)],
          quantity : Math.floor(10 + 50*Math.random()),
          price : Math.floor(134 - 20*Math.random()),
          location : location[Math.floor(Math.random() * location.length)],
          counterparty : cp[Math.floor(Math.random() * cp.length)],
          tradeId : Math.floor(Math.random()*10000)
      }
  }

  let trades = [];
  for (var i = 10; i >= 0; i--) {
      trades.push(this.createDummyTrades());
  }
  return {
    type : 'SEARCH_TRADES', //always instantiated
    payload: trades  //not necessary
  };
}
