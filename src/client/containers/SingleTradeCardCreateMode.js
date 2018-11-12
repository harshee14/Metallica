import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {HelpBlock, Form, FormControl, ControlLabel, Panel, Button, FormGroup, Row, Col, ButtonToolbar} from 'react-bootstrap';
import React, { Component } from 'react';

import Select from 'react-select/lib/Async'
import SyncSelect from 'react-select'
import request from 'superagent' ;

import { saveCreatedTrade} from '../actions/index';

const counterpartyOptions = (inputValue) =>
request.get('/api/refdata?entity=counterparty&operation=getAllCounterparties')
          .query({})
          .then(
            res => {
              console.log("my mapped counterparties :" ,res.body.counterparties);
              const counterparties =  res.body.counterparties ;
              const mappedCounterparties = counterparties.map(counterparty => {
                return {
                  value: counterparty.name ,
                  label : counterparty.name
                }
              });

             return mappedCounterparties;
            }
          ).catch(err => {console.log(1,err)}) ;

const commodityOptions = inputValue =>
          request.get('/api/refdata?entity=commodity&operation=getAllCommodities')
                    .query({})
                    .then(
                      res => {
                        const commodities = res.body.commodities ;
                        const mappedCommodities = commodities.map(commodity => {
                          return {
                                  value: commodity.name ,
                                  label : commodity.name
                                }
                        });
                        return mappedCommodities;
                      }
                    ).catch(err => {console.log(1,err)});

const tradelocationOptions = inputValue =>
                              request.get('/api/refdata?entity=tradelocation&operation=getAllTradeLocations')
                                        .query({})
                                        .then(
                                          res => {
                                            const tradeLocations = res.body.tradelocations ;
                                            const mappedTradeLocations = tradeLocations.map(location => {
                                              return {
                                                      value: location.name ,
                                                      label : location.name
                                                    }
                                            });

                                            return mappedTradeLocations;
                                          }
                                        ).catch(err => {console.log(1,err)}) ;

class SingleTradeCardCreateMode extends Component
{
	constructor(props)
	{
		super(props);
        this.state = {
            tradeDate : (new Date()).toLocaleDateString("en-US"),
            commodity : '',
            side : '',
            counterparty : '',
            location : '',
            quantity : '',
            price : '',
						trader : "hbhatnagar@sapient.com"
        };

        this.errors = {

        };

        this.handleCounterPartyChange = this.handleCounterPartyChange.bind(this);
        this.handleTradeLocationChange = this.handleTradeLocationChange.bind(this);
        this.handleCommodityChange = this.handleCommodityChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSideChange = this.handleSideChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
	}

    handleQuantityChange = e =>{this.setState({quantity : parseFloat(e.target.value)}); }
    handlePriceChange = e => this.setState({price : parseFloat(e.target.value)});

    handleCounterPartyChange(selected) {
        this.setState( {counterparty : selected.value}) ;
    }

    handleTradeLocationChange(selected) {
        this.setState( {location : selected.value}) ;
    }
    handleCommodityChange(selected) {
        this.setState( {commodity : selected.value}) ;
    }

    handleSideChange(selected) {
        this.setState({side : selected.value}) ;
    }

    provideList(list) {
    return list.map((listItem) => { return {value:listItem.name , label : listItem.name} ;}) ;
    }

    handleValidation() {
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
				console.log("how does my commodity look like?",this.state);
        if(this.handleValidation()){
						let tempState = {
							...this.state,
						};
						console.log("CreateTrade: my request state is :" ,tempState);
	            this.props.saveCreatedTrade('VIEW_TRADE',tempState);
	            alert("Form submitted");
        }else{
            alert(`Errors. Check your inputs`);
        }
    }

	render() {
        const sides = [{name:'Buy'},{name : 'Sell'}];
        return <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h4">
                        <Row>
                            <Col md = {12} id = "singletradecardheading">Trade Id : 0</Col>
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
                                <Select value = {[{name:this.state.counterparty,label:this.state.counterparty}]} placeholder = {'Counterparty'} onChange={this.handleCounterPartyChange} cacheOptions defaultOptions loadOptions={counterpartyOptions} isMulti = {false} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalCommodity">
                            <Col componentClass={ControlLabel} sm={3} md={3}>
                                Commodity
                            </Col>
                            <Col sm={9} md={9}>
                                <Select value = {[{name:this.state.commodity,label:this.state.commodity}]} placeholder = {'Commodity'} onChange={this.handleCommodityChange} cacheOptions defaultOptions loadOptions={commodityOptions} isMulti = {false} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalSide">
                            <Col componentClass={ControlLabel} sm={3} md={3}>
                                Side
                            </Col>
                            <Col sm={9} md={9}>
                                <SyncSelect value = {[{name:this.state.side,label:this.state.side}]} placeholder = {'Side'} onChange={this.handleSideChange} options={this.provideList(sides)} isMulti = {false} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalLocation">
                            <Col componentClass={ControlLabel} sm={3} md={3}>
                                Locations
                            </Col>
                            <Col sm={9} md={9}>
                                <Select value = {[{name:this.state.location,label:this.state.location}]} placeholder = {'Trade Locations'} onChange={this.handleTradeLocationChange}  cacheOptions defaultOptions loadOptions={tradelocationOptions} isMulti = {false} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({saveCreatedTrade : saveCreatedTrade} , dispatch);
}


export default connect(null,mapDispatchToProps)(SingleTradeCardCreateMode);
