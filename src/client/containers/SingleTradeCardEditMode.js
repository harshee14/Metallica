import {HelpBlock,Form,Alert,Glyphicon ,FormControl,ControlLabel,Label,ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import React, { Component } from 'react';

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveEditedTrade } from '../actions/index';
import Select from 'react-select';
import moment from 'moment';

class SingleTradeCardEditMode extends Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
						tradeId : this.props.tradeview.tradeId,
						tradeDate : this.props.tradeview.tradeDate,
						startDate : this.props.tradeview.startDate ,
						endDate : this.props.tradeview.endDate ,
						// startDate : moment(this.props.tradeview.startDate,"MM/DD/YYYY") ,
						// endDate : moment(this.props.tradeview.endDate,"MM/DD/YYYY") ,
						commodity : this.props.tradeview.commodity,
						side : this.props.tradeview.side,
						counterparty : this.props.tradeview.counterparty,
						location : this.props.tradeview.location,
						quantity : this.props.tradeview.quantity,
						price : this.props.tradeview.price
			};
			this.errors = {

			};

			this.handleQuantityChange = this.handleQuantityChange.bind(this);
			this.handlePriceChange = this.handlePriceChange.bind(this);
			this.handleStartDateChange = this.handleStartDateChange.bind(this);
			this.handleEndDateChange = this.handleEndDateChange.bind(this);
			this.handleValidation = this.handleValidation.bind(this);
			this.doSubmit = this.doSubmit.bind(this);
		}

		handleQuantityChange = e => this.setState({quantity : parseFloat(e.target.value)});
		handlePriceChange = e => this.setState({price : parseFloat(e.target.value)});
		handleStartDateChange = startDate => this.setState({ startDate : startDate.format("MM/DD/YYYY") });
		handleEndDateChange = endDate => this.setState({ endDate : endDate.format("MM/DD/YYYY")});


		handleValidation()
		{
				 let formIsValid = true;

				 if(!this.state.price){
					 formIsValid = false;
					 this.errors["price"] = "Cannot be empty";
				 }

				 if(!this.state.quantity){
					 formIsValid = false;
					 this.errors["quantity"] = "Cannot be empty";
				 }

				 if(!this.state.startDate){
					 formIsValid = false;
					this.errors["startDate"] = "Cannot be empty";
				 }

				 if(!this.state.endDate){
					 formIsValid = false;
					 this.errors["endDate"] = "Cannot be empty";
				 }

				 //fails if I dont change the value as the number is still a number
				 // if(typeof this.state.price !== "undefined"){
					//  if(!this.state.price.match(/^\d+(\.\d{1,2})?$/)){
					// 	 formIsValid = false;
					// 	 this.errors["price"] = "Only numbers";
					//  }
				 // }
				 //
				 // if(typeof this.state.quantity !== "undefined"){
					//  if(!this.state.quantity.match(/^\d+(\.\d{1,2})?$/)){
					// 	 formIsValid = false;
					// 	 this.errors["quantity"] = "Only numbers";
					//  }
				 // }

				 return formIsValid;
		}

	  doSubmit(e)
		{
			e.preventDefault();
	    if(this.handleValidation()){
				  this.props.saveEditedTrade('VIEW_TRADE',this.state);
	      alert("Form submitted");
	    }else{
	      alert(`Errors. Check your inputs`);
	    }
		}

	render()
	{
		return <div>
		 <Panel bsStyle="info">
             <Panel.Heading>
                 <Panel.Title componentClass="h4">
                 <Row>
                 <Col md = {12} id = "singletradecardheading">Trade Id : {this.props.tradeview.tradeId}</Col>
                 </Row>
                 </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
									<Form horizontal onSubmit={this.doSubmit}>
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

										<FormGroup controlId="formHorizontalLocation">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Locations
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" disabled value = {this.props.tradeview.location} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalQuanity">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Quantity
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" value = {this.state.quantity} onChange = {this.handleQuantityChange} />
												<HelpBlock className = 'helpblock'>Quantity can only be numbers.</HelpBlock>
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalPrice">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Price
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" value = {this.state.price} onChange = {this.handlePriceChange} />
												<HelpBlock className = 'helpblock'>Price can only be numbers</HelpBlock>
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalStartDate">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												StartDate
											</Col>
											<Col sm={9} md={9}>
											<div className = 'alignDate'>
											<ReactDatePicker onChange = {this.handleStartDateChange} className = 'margins' placeholderText = 'Trade Start Date' selectsStart selected={moment(this.state.startDate,"MM/DD/YYYY")} startDate={moment(this.state.startDate,"MM/DD/YYYY")} endDate={moment(this.state.endDate,"MM/DD/YYYY")}/>

											</div>
											<HelpBlock className = 'helpblock'>StartDate cannot be empty</HelpBlock>
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalEndDate">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												EndDate
											</Col>
											<Col sm={9} md={9}>
											<div className = 'alignDate'>
											<ReactDatePicker onChange = {this.handleEndDateChange} className = 'margins' placeholderText = 'Trade End Date'selectsEnd selected={moment(this.state.endDate,"MM/DD/YYYY")} startDate={moment(this.state.startDate,"MM/DD/YYYY")} endDate={moment(this.state.endDate,"MM/DD/YYYY")}/>

											</div>
											<HelpBlock className = 'helpblock'>End Date >=  Start Date</HelpBlock>
											</Col>
										</FormGroup>

										<FormGroup>
											<Col sm={12} md={12}>
											<ButtonToolbar className = "pull-right">
													<Button type="submit" bsStyle="primary" >Save</Button>
											</ButtonToolbar>
											</Col>
										</FormGroup>

										</Form>
            </Panel.Body>
          </Panel>
		</div>;
	}

}

function mapStateToProps(state)
{
  return {
    tradeview : state.tradeview,
		counterparties : state.counterparties ,
		commodities : state.commodities ,
		tradeLocations : state.tradeLocations
  };
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({saveEditedTrade : saveEditedTrade} , dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleTradeCardEditMode);
