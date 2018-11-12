import { combineReducers } from 'redux';

import TradeCardModeReducer from './reducer_tradecardmodes';
import TradesListReducer from './reducer_tradeslist';
import TradeViewReducer from './reducer_tradeview';

const rootReducer = combineReducers({
    tradeslist : TradesListReducer,
    tradeview : TradeViewReducer,
    tradeCardMode : TradeCardModeReducer
});

export default rootReducer;
