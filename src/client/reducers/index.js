import { combineReducers } from 'redux';
import PricesReducer from './reducer_marketprices';
import CounterPartiesReducer from './reducer_counterparties';
import CommoditiesReducer from './reducer_commodities';
import TradeLocationsReducer from './reducer_tradelocations';
import TradesListReducer from './reducer_tradeslist';
import TradeViewReducer from './reducer_tradeview';

const rootReducer = combineReducers({
  metalAndPrices: PricesReducer,
  counterparties : CounterPartiesReducer,
  commodities : CommoditiesReducer,
  tradeLocations : TradeLocationsReducer,
  tradeslist : TradesListReducer,
  tradeview : TradeViewReducer
});

export default rootReducer;
