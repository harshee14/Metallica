import {HelpBlock,Form,Alert,Glyphicon ,FormControl,ControlLabel,Label,ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import React, { Component } from 'react';

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select'
import { saveCreatedTrade} from '../actions/index';
import moment from 'moment';

class SingleTradeCardCreateMode extends Component
{
	constructor(props)
	{
		super(props);
    this.state =
    {
            tradeId : 0,
            tradeDate : (new Date()).toLocaleDateString("en-US"),
            commodity : '',
            side : '',
            counterparty : '',
            location : '',
            quantity : '',
            price : ''
      };

      this.errors =
      {

      };

      this.handleCounterPartyChange = this.handleCounterPartyChange.bind(this);
      this.handleTradeLocationChange = this.handleTradeLocationChange.bind(this);
      this.handleCommodityChange = this.handleCommodityChange.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleStartDateChange = this.handleStartDateChange.bind(this);
      this.handleEndDateChange = this.handleEndDateChange.bind(this);
      this.handleSideChange = this.handleSideChange.bind(this);
      this.handleValidation = this.handleValidation.bind(this);
      this.doSubmit = this.doSubmit.bind(this);
	}

  handleQuantityChange = e =>{this.setState({quantity : parseFloat(e.target.value)}); }
  handlePriceChange = e => this.setState({price : parseFloat(e.target.value)});
  handleStartDateChange = startDate => this.setState({startDate : startDate.format("MM/DD/YYYY") });
  handleEndDateChange = endDate => this.setState({endDate : endDate.format("MM/DD/YYYY") });

  handleCounterPartyChange(selected)
  {
     this.setState( {counterparty : selected.value}) ;
  }

  handleTradeLocationChange(selected)
  {
     this.setState( {location : selected.value}) ;
  }
  handleCommodityChange(selected)
  {
     this.setState( {commodity : selected.value}) ;
  }

  handleSideChange(selected)
  {
     this.setState({side : selected.value}) ;
  }

  provideList(list)
  {
    return list.map((listItem) => { return {value:listItem.name , label : listItem.name} ;}) ;
  }

  handleValidation()
  {
       let formIsValid = true;

       if(!this.state.counterparty){
         formIsValid = false;
         this.errors["price"] = "Cannot be empty";
       }

       if(!this.state.location){
         formIsValid = false;
         this.errors["price"] = "Cannot be empty";
       }

       if(!this.state.commodity){
         formIsValid = false;
         this.errors["price"] = "Cannot be empty";
       }

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
       //   if(!this.state.price.match(/^\d+(\.\d{1,2})?$/)){
       //     formIsValid = false;
       //     this.errors["price"] = "Only numbers";
       //   }
       // }
			 //
       // if(typeof this.state.quantity !== "undefined"){
       //   if(!this.state.quantity.match(/^\d+(\.\d{1,2})?$/)){
       //     formIsValid = false;
       //     this.errors["quantity"] = "Only numbers";
       //   }
       // }

       return formIsValid;
  }

  doSubmit(e)
  {
    e.preventDefault();
    if(this.handleValidation()){
        this.props.saveCreatedTrade('VIEW_TRADE',this.state);
      alert("Form submitted");
    }else{
      alert(`Errors. Check your inputs`);
    }
  }

	render()
	{
    const sides = [{name:'Buy'},{name : 'Sell'}];
    return <div>
    <Panel bsStyle="info">
            <Panel.Heading>
                <Panel.Title componentClass="h4">
                <Row>
                <Col md = {12} id = "singletradecardheading">Trade Id : {this.state.tradeId}</Col>
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
                       <FormControl type="text" disabled value = {this.state.tradeDate} />
                     </Col>
                   </FormGroup>

                   <FormGroup controlId="formHorizontalCP">
                     <Col componentClass={ControlLabel} sm={3} md={3}>
                       Counter Party
                     </Col>
                     <Col sm={9} md={9}>
                       <Select value = {[{name:this.state.counterparty,label:this.state.counterparty}]} placeholder = {'Counterparty'} onChange={this.handleCounterPartyChange} options={this.provideList(this.props.counterparties)} isMulti = {false} />
                     </Col>
                   </FormGroup>

                   <FormGroup controlId="formHorizontalCommodity">
                     <Col componentClass={ControlLabel} sm={3} md={3}>
                       Commodity
                     </Col>
                     <Col sm={9} md={9}>
                     <Select value = {[{name:this.state.commodity,label:this.state.commodity}]} placeholder = {'Commodity'} onChange={this.handleCommodityChange} options={this.provideList(this.props.commodities)} isMulti = {false} />
                     </Col>
                   </FormGroup>

                   <FormGroup controlId="formHorizontalSide">
                     <Col componentClass={ControlLabel} sm={3} md={3}>
                      Side
                     </Col>
                     <Col sm={9} md={9}>
                     <Select value = {[{name:this.state.side,label:this.state.side}]} placeholder = {'Side'} onChange={this.handleSideChange} options={this.provideList(sides)} isMulti = {false} />
                     </Col>
                   </FormGroup>

                   <FormGroup controlId="formHorizontalLocation">
                     <Col componentClass={ControlLabel} sm={3} md={3}>
                       Locations
                     </Col>
                     <Col sm={9} md={9}>
                     <Select value = {[{name:this.state.location,label:this.state.location}]} placeholder = {'Trade Locations'} onChange={this.handleTradeLocationChange} options={this.provideList(this.props.tradeLocations)} isMulti = {false} />
                     </Col>
                   </FormGroup>

                   <FormGroup controlId="formHorizontalQuanity">
                     <Col componentClass={ControlLabel} sm={3} md={3}>
                       Quantity
                     </Col>
                     <Col sm={9} md={9}>
                       <FormControl type="number" value = {this.state.quantity} onChange = {this.handleQuantityChange} />
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
                     <ReactDatePicker onChange = {this.handleStartDateChange} className = 'margins' placeholderText = 'Trade Start Date' selectsStart selected={this.state.startDate} startDate={this.state.startDate} endDate={this.state.endDate}/>

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
                     <ReactDatePicker onChange = {this.handleEndDateChange} className = 'margins' placeholderText = 'Trade End Date'selectsEnd selected={this.state.endDate} startDate={this.state.startDate} endDate={this.state.endDate}/>

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
    </div> ;
  }

}

function mapStateToProps(state)
{
  return {
		counterparties : state.counterparties ,
		commodities : state.commodities ,
		tradeLocations : state.tradeLocations
  };
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({saveCreatedTrade : saveCreatedTrade} , dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(SingleTradeCardCreateMode);
