export default function(state = null, action) {

  switch(action.type) {

      case 'LOGOUT':
        return null ;
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
