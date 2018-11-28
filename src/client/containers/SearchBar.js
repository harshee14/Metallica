import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Form,Panel, Button, Checkbox, Row, Col,ButtonToolbar} from 'react-bootstrap';
import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker'
import Select from 'react-select/lib/Async'
import request from 'superagent' ;

import 'react-datepicker/dist/react-datepicker.css';

import { searchTrades } from '../actions/index';

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



class SearchBar extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			commodity : [],
			buySide : true,
			sellSide : true,
			counterparty : [],
			location : [],
      trader : this.props.trader
		};
		this.handleBuySideChange = this.handleBuySideChange.bind(this);
		this.handleSellSideChange = this.handleSellSideChange.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleCounterPartyChange = this.handleCounterPartyChange.bind(this);
		this.handleTradeLocationChange = this.handleTradeLocationChange.bind(this);
		this.handleCommodityChange = this.handleCommodityChange.bind(this);
		this.clearSearchParameters = this.clearSearchParameters.bind(this);
		this.provideList = this.provideList.bind(this);
		this.doSubmit = this.doSubmit.bind(this);

	}

	handleBuySideChange = e => this.setState({buySide : e.target.checked});

    handleSellSideChange = e => this.setState({sellSide : e.target.checked});

    handleStartDateChange = startDate => {this.setState({ startDate })};

    handleEndDateChange = endDate => this.setState({ endDate });

  handleCounterPartyChange(counterparty) { this.setState({counterparty}) ; }
  handleTradeLocationChange(location) { this.setState({location}) ; }
  handleCommodityChange(commodity) { this.setState({commodity}) ; }


	provideList(list) {
		return list.map((listItem) => { return {value:listItem.name , label : listItem.name} ;}) ;
	}

	clearSearchParameters() {
	    let tempStartDate, tempEndDate ;
		this.setState(
            {
                startDate : tempStartDate ,
                endDate : tempEndDate ,
                commodity : [],
                buySide : true,
                sellSide : true,
                counterparty : [],
                location : []
            }, () => {
                console.log("Search bar after clearing", this.state);
            }
        );

    }

	doSubmit(e) {
		e.preventDefault();
		let tempState = {
			...this.state,
      commodity : this.state.commodity.map((item)=>{return item.value}),
      counterparty : this.state.counterparty.map((item)=>{return item.value}),
      location : this.state.location.map((item)=>{return item.value}),
			startDate :  (typeof this.state.startDate === "undefined") ? 0 : this.state.startDate.format("MM/DD/YYYY"),
			endDate :  (typeof this.state.endDate === "undefined") ? 0 : this.state.endDate.format("MM/DD/YYYY")
		};
		console.log("SearchBar: my request state is :" ,tempState);
		this.props.searchTrades(tempState);
		alert("Form submitted");
	}


	render()
	{
		return (
            <div>
                <Form onSubmit={this.doSubmit}>
                    <Row>
                        <Col md={12}>
                            <Panel>
                                <Row>
                                    <Col xs={2} md={2}>
                                    <div className = 'margins'>
                                            <Select value = {this.state.counterparty} placeholder = {'Counterparty'} onChange={this.handleCounterPartyChange} cacheOptions defaultOptions loadOptions={counterpartyOptions} isMulti = {true} />
                                        </div>
                                    </Col>
                                    <Col xs={2} md={2}>
                                    <div className = 'margins'>
                                    <Select value = {this.state.commodity} placeholder = {'Commodity'} onChange={this.handleCommodityChange} cacheOptions defaultOptions loadOptions={commodityOptions} isMulti = {true} />
                                    </div>
                                    </Col>
                                    <Col xs={2} md={2}>
                                    <div className = 'margins'>
                                        <Select value = {this.state.location} placeholder = {'Trade Locations'} onChange={this.handleTradeLocationChange} cacheOptions defaultOptions loadOptions={tradelocationOptions} isMulti = {true} />
                                    </div>
                                    </Col>
                                    <Col xs={2}md={2}>
                                    <div className = 'margins'>
                                        <ReactDatePicker className = 'margins' placeholderText = {'Trade Start Date'} selectsStart onChange={this.handleStartDateChange} selected={this.state.startDate} startDate={this.state.startDate} endDate={this.state.endDate}/>
                                    </div>
                                    </Col>
                                    <Col xs={2} md={2}>
                                    <div className = 'margins'>
                                        <ReactDatePicker className = 'margins' placeholderText = {'Trade End Date'} selectsEnd onChange={this.handleEndDateChange} selected={this.state.endDate} startDate={this.state.startDate} endDate={this.state.endDate}/>
                                    </div>
                                    </Col>
                                    <Col xs={2} md={2}>
                                    <div className = 'margins'>
                                        <Checkbox checked = {this.state.buySide} inline onChange={this.handleBuySideChange}>Buy</Checkbox>
                                        <Checkbox checked = {this.state.sellSide} inline onChange={this.handleSellSideChange}>Sell</Checkbox>
                                    </div>
                                    </Col>
                                </Row>
                            </Panel>
                        </Col>
                    </Row>
                    <Row className = 'bottom-margins'>
                        <Col md={12}>
                            <ButtonToolbar className = "pull-right">
                                <Button onClick = {this.clearSearchParameters}>Clear</Button>
                                <Button type="submit" bsStyle="primary">Search</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
	}
}

function mapStateToProps(state) {
  return {
    trader : state.userInfo.user.email
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({searchTrades : searchTrades} , dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);
