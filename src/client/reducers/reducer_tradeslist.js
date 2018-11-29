import request from 'superagent' ;

export default function(state = {}, action) {

    switch(action.type) {

        case 'LOGOUT':
        {
          let nullState = {};
          return nullState
        }

        case 'SEARCH_TRADES_FULFILLED':
        {
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

          let tradesCopy = [];
        if(state.hasOwnProperty('trades'))
        {
           tradesCopy = state.trades.slice();
        }
            tradesCopy.push(action.payload.trade) ;
            return {
                ...state,
                selectedTradeId: action.payload.trade.tradeId,
                trades: tradesCopy
            }

        }

        case 'DELETE_TRADE_FULFILLED': {
            return {
                ...state,
                selectedTradeId:0,
                trades: state.trades.slice().filter(value => value.tradeId != action.payload.trade.tradeId)
            }
        }

    }

    return state ; //return state as it is if action dosent impact it
}
