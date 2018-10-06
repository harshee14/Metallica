import {Row, Col} from 'react-bootstrap';
import React from 'react';

import SearchBar from './SearchBar';

const TradeInfoTab = () =>  {
	return <div>
            <Row>
                <Col md={12}>
                    <SearchBar />
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                //search result table
                </Col>
                <Col md={4}>
                //trade info
                </Col>
            </Row>
		</div>;
}

export default TradeInfoTab ;

