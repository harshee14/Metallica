import {Row, Col} from 'react-bootstrap';
import React from 'react';

import SearchBar from './SearchBar';
import TradesTable from './TradesTable';
import SingleTradeCard from './SingleTradeCard';

const TradeInfoTab = () =>  {
	return <div>
            <Row>
                <Col md={12}>
                    <SearchBar />
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                <TradesTable />
                </Col>
                <Col md={4}>
                <SingleTradeCard />               
                </Col>
            </Row>
		</div>;
}

export default TradeInfoTab ;

