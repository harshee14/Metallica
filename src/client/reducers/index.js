import { combineReducers } from 'redux';

import CommoditiesReducer from './reducer_commodities';
import CounterPartiesReducer from './reducer_counterparties';
import PricesReducer from './reducer_marketprices';
import TradeCardModeReducer from './reducer_tradecardmodes';
import TradeLocationsReducer from './reducer_tradelocations';
import TradesListReducer from './reducer_tradeslist';
import TradeViewReducer from './reducer_tradeview';

const rootReducer = combineReducers({
    metalAndPrices: PricesReducer,
    counterparties : CounterPartiesReducer,
    commodities : CommoditiesReducer,
    tradeLocations : TradeLocationsReducer,
    tradeslist : TradesListReducer,
    tradeview : TradeViewReducer,
    tradeCardMode : TradeCardModeReducer
});

export default rootReducer;
