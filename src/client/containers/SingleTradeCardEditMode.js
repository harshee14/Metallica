import {Form,Alert,Glyphicon ,FormControl,ControlLabel,Label,ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import React, { Component } from 'react';

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { editTrade } from '../actions/index';
import Select from 'react-select'

class SingleTradeCardEditMode extends Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
					fields : {
						tradeId : this.props.tradeview.tradeId,
						tradeDate : this.props.tradeview.TradeDate,
						startDate : '',
						endDate : '' ,
						commodity : this.props.tradeview.commodity,
						side : this.props.tradeview.side,
						counterparty : this.props.tradeview.counterparty,
						location : this.props.tradeview.location,
						quantity : '',
						price : ''
					},

					errors : {}
			};

		this.handleChange = this.handleChange.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
		this.doSubmit = this.doSubmit.bind(this);
		}

		handleChange(field, e){
			let fields = this.state.fields;
			fields[field] = e.target.value;
			this.setState({fields});
		}

		handleValidation()
		{
				 let fields = this.state.fields;
				 let errors = {};
				 let formIsValid = true;

				 if(!fields["price"]){
					 formIsValid = false;
					 errors["price"] = "Cannot be empty";
				 }

				 if(!fields["quantity"]){
					 formIsValid = false;
					 errors["quantity"] = "Cannot be empty";
				 }

				 if(typeof fields["name"] !== "undefined"){
					 if(!fields["name"].match(/^[a-zA-Z]+$/)){
						 formIsValid = false;
						 errors["name"] = "Only letters";
					 }
				 }

				 //Email
				 if(!fields["email"]){
					 formIsValid = false;
					 errors["email"] = "Cannot be empty";
				 }

				 if(typeof fields["email"] !== "undefined"){
					 let lastAtPos = fields["email"].lastIndexOf('@');
					 let lastDotPos = fields["email"].lastIndexOf('.');

					 if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
						 formIsValid = false;
						 errors["email"] = "Email is not valid";
					 }
				 }



				 this.setState({errors: errors});
				 return formIsValid;
		}

	  doSubmit(e)
		{
			e.preventDefault();
	    if(this.handleValidation()){
	      alert("Form submitted");
	    }else{
	      alert("Form has errors.")
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
												<FormControl type="number" value = {this.state.fields.quantity} onChange = {this.handleChange('quantity')} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalPrice">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												Price
											</Col>
											<Col sm={9} md={9}>
												<FormControl type="text" value = {this.state.fields.price} onChange = {this.handleChange('price')} />
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalStartDate">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												StartDate
											</Col>
											<Col sm={9} md={9}>
											<div className = 'alignDate'>
											<ReactDatePicker onChange = {this.handleChange('startDate')} value = {this.state.fields.startDate} className = 'margins' placeholderText = 'Trade Start Date' selectsStart selected={this.state.fields.startDate} startDate={this.state.fields.startDate} endDate={this.state.fields.endDate}/>
											</div>
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalEndDate">
											<Col componentClass={ControlLabel} sm={3} md={3}>
												EndDate
											</Col>
											<Col sm={9} md={9}>
											<div className = 'alignDate' >
											<ReactDatePicker onChange = {(e) => this.handleChange('startDate')} value = {this.state.fields.endDate} className = 'margins' placeholderText = 'Trade End Date'selectsEnd selected={this.state.fields.endDate} startDate={this.state.fields.startDate} endDate={this.state.fields.endDate}/>
											</div>
											</Col>
										</FormGroup>

										<FormGroup>
											<Col sm={12} md={12}>
											<ButtonToolbar className = "pull-right">
													<Button type="submit" bsStyle="primary" >Save</Button>
													<Button>Clear</Button>
											</ButtonToolbar>
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
  return {
    tradeview : state.tradeview,
		counterparties : state.counterparties ,
		commodities : state.commodities ,
		tradeLocations : state.tradeLocations
  };
}

export default connect(mapStateToProps)(SingleTradeCardEditMode);
