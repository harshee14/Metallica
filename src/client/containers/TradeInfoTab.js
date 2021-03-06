import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Row, Col , Glyphicon , Button} from 'react-bootstrap';
import React , {Component} from 'react';

import { createTrade} from '../actions/index';
import SearchBar from './SearchBar';
import SingleTradeCard from './SingleTradeCard';
import TradesTable from './TradesTable';

class TradeInfoTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	return (
            <div>
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
                <Row>
                    <Col md={12}>
                        <Button className = "pull-right" bsSize="lg" onClick = {() => this.props.createTrade('CREATE_TRADE')}><Glyphicon glyph="plus" /> </Button>
                    </Col>
                </Row>
            </div>
        );
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createTrade : createTrade} , dispatch);
}

export default connect(null,mapDispatchToProps)(TradeInfoTab);