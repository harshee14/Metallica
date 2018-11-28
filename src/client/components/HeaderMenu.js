import { Tab, Row, Col, Nav, NavItem, Image, Button,Glyphicon } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/index';

import TradeInfoTab from '../containers/TradeInfoTab';

class HeaderMenu extends Component
{
	constructor(props) {
		super(props);

	}

	render()
	{
		console.log('is it reaching here', this.props);
		let user = this.props.userName ? this.props.userName : '' ;

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
                         <Col md={2}>
                             Welcome {user}
                         </Col>
												 <Col md={1} className="pull-right">
														 <Button bsSize="xsmall" onClick = {this.props.logout} > <Glyphicon glyph="log-out"/> </Button>
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

}


function mapStateToProps(state) {
  return {
    userName : state.userInfo.user.fullName.replace(/ .*/,'')
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout : logout} , dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderMenu);
