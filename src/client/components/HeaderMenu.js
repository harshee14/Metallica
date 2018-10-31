import { Tab, Row, Col, Nav, NavItem, Image } from 'react-bootstrap';
import React from 'react';

import TradeInfoTab from '../containers/TradeInfoTab';

const HeaderMenu = () =>
{
	return (
        <div>
            <Tab.Container id="random" defaultActiveKey="first">
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={9}>
                            <Nav bsStyle="tabs">
                                <NavItem eventKey="first">Trades</NavItem>
                                <NavItem eventKey="second" disabled>Transfer</NavItem>
                                <NavItem eventKey="third" disabled>Transports</NavItem>
                            </Nav>
                        </Col>
                        <Col md={3} className="pull-right">
                            Harshita <Image src="./src/client/react.png" responsive thumbnail circle/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="first"><TradeInfoTab /></Tab.Pane>
                                <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Tab.Container>
        </div>
    );
}

export default HeaderMenu;