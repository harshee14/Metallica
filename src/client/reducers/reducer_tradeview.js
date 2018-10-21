export default function(state = null, action)
{

  switch(action.type)
    {
      case 'VIEW_TRADE':
      return action.payload;
    }

    // if(state!=null)
    //   return {tradeDate : "" , commodity : "" , price : "" , quantity:"", location : "" , counterparty : "", side : "" };

    return null ;
}
