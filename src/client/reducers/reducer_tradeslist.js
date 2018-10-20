export default function(state = null, action)
{
  //let metalAndPrices = [{key:'Iron',price:23},{key:'Gold',price:100},{key:'Silver',price:80},{key:'Alu',price:5},{key:'Platinum',price:150},{key:'Uranium',price:500}];
  // switch(action.type)
  //   {
  //     case 'SEARCH_TRADES':
  //     return action.payload;
  //   }

  //  return state;


  let trades = [];
  for (var i = 10; i >= 0; i--) {
           trades.push(createSomeDummyTrades());
       }

  return trades ;
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
      tradeId : Math.floor(Math.random()*10000)
  } ;

  return trade ;
}
