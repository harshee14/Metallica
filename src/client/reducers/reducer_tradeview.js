export default function(state = null, action)
{

  switch(action.type)
    {
      case 'VIEW_TRADE':
      console.log('Is view trade action reaching here?',action.payload);
      return action.payload.trade;

      case 'EDIT_TRADE':
      console.log('Is view trade action reaching here?',action.payload);
      return action.payload.trade;


    }

    // if(state!=null)
    //   return {tradeDate : "" , commodity : "" , price : "" , quantity:"", location : "" , counterparty : "", side : "" };

    return null ;
}
