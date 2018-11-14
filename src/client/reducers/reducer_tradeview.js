export default function(state = null, action) {
console.log('reducer_tradeview',action)
  switch(action.type) {
      case 'VIEW_TRADE':
        return action.payload.trade;

      case 'EDIT_TRADE':
        return action.payload.trade;

      case 'SAVE_EDITED_TRADE_FULFILLED':
        return action.payload.trade;

      case 'SAVE_CREATED_TRADE_FULFILLED':
        return action.payload.trade;

      case 'SEARCH_TRADES_FULFILLED':
        return null;

      case 'DELETE_TRADE_FULFILLED':
        return null;
    }
    return state ;
}
