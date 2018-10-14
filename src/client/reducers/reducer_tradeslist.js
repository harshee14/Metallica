export default function(state = null, action)
{
  //let metalAndPrices = [{key:'Iron',price:23},{key:'Gold',price:100},{key:'Silver',price:80},{key:'Alu',price:5},{key:'Platinum',price:150},{key:'Uranium',price:500}];
  switch(action.type)
    {
      case 'SEARCH_TRADES':
      return action.payload;
    }

    return state;
}
