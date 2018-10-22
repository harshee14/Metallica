import {Form,Alert,Glyphicon ,FormControl,ControlLabel,Label,ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import React, { Component } from 'react';

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editTrade } from '../actions/index';

class SingleTradeCardViewMode extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		if(!this.props.tradeview)
		{
			return <div>
			<Panel bsStyle="info">
							<Panel.Heading>
									<Panel.Title componentClass="h4">
									<Row>
										<Col md = {12} id = "singletradecardheading">Trade Information</Col>
									</Row>
									</Panel.Title>
						 </Panel.Heading>
						 <Panel.Body>
								 <Row>
							 			<Col md={12}>
							 				<Alert bsStyle="info"><h3> <strong>Select Trade to view</strong></h3> </Alert>
							 			</Col>
					 			</Row>
						 </Panel.Body>
					 </Panel>
			</div> ;
		}
		//console.log('do I have trade to view ? ', this.prop)
		return <div>

		 <Panel bsStyle="info">
             <Panel.Heading>
                 <Panel.Title componentClass="h4">
                 <Row>
                 <Col md = {9} id = "singletradecardheading">Trade Id : {this.props.tradeview.tradeId}</Col>
                 <Col md = {3} id = "singletradecardicons">
                 <Button bsSize="xsmall" onClick = {() => this.props.editTrade('EDIT_TRADE',this.props.tradeview)} > <Glyphicon glyph="pencil"/> </Button>
                 <Button bsSize="xsmall" > <Glyphicon glyph="trash" /> </Button>
                 </Col>
                 </Row>
                 </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
									<Form horizontal>
										<FormGroup controlId="formHorizontalTradeDate">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												TradeDate
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.tradeDate} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalCP">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Counter Party
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.counterparty} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalCommodity">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Commodity
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.commodity} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalSide">
											<Col componentClass={ControlLabel} sm={3} md={3}>
											 Side
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.side} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalTradeDate">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												TradeDate
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.tradeDate} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalLocation">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Location
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="select" disabled value = {this.props.tradeview.location} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalQuanity">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Quantity
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.quantity} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalPrice">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Price
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.price} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalStartDate">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												StartDate
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.startDate} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalEndDate">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												EndDate
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.endDate} />
											</Col>
										</FormGroup>

										</Form>;
            </Panel.Body>
          </Panel>
		</div>;
	}

}

function mapStateToProps(state)
{
  console.log(state);
  return {
    tradeview : state.tradeview
  };
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({editTrade : editTrade} , dispatch);
}

//export default SingleTradeCardViewMode ;
export default connect(mapStateToProps,mapDispatchToProps)(SingleTradeCardViewMode);
