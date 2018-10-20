import {ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import ReactDatePicker from 'react-datepicker'

import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Select from 'react-select'
import { bindActionCreators } from 'redux';
import { searchTrades } from '../actions/index';

import 'react-datepicker/dist/react-datepicker.css';

class SearchBar extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			startDate : '',
			endDate : '' ,
			commodity : [],
			buySide : false,
			sellSide : false,
			counterparty : [],
			location : []
		};
		this.handleBuySideChange = this.handleBuySideChange.bind(this);
		this.handleSellSideChange = this.handleSellSideChange.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleCounterPartyChange = this.handleCounterPartyChange.bind(this);
		this.handleTradeLocationChange = this.handleTradeLocationChange.bind(this);
		this.handleCommodityChange = this.handleCommodityChange.bind(this);
		this.clearSearchParameters = this.clearSearchParameters.bind(this);

	}

	handleBuySideChange = e => this.setState({buySide : e.target.checked});
  handleSellSideChange = e => this.setState({sellSide : e.target.checked});
	handleStartDateChange = startDate => this.setState({ startDate });
	handleEndDateChange = endDate => this.setState({ endDate });
	handleCounterPartyChange(selected)
	{
		 console.log('selected : ', selected);
		 this.setState( {counterparty : selected.map((item)=>{return {name:item.value};})},()=>{console.log('but my state : ',this.state.counterparty);}) ;
 	}

	handleTradeLocationChange(selected)
	{
		 console.log('selected : ', selected);
		 this.setState( {location : selected.map((item)=>{return {name:item.value};})},()=>{console.log('but my state : ',this.state.location);}) ;
	}
	handleCommodityChange(selected)
	{
		 console.log('selected : ', selected);
		 this.setState( {commodity : selected.map((item)=>{return {name:item.value};})},()=>{console.log('but my state : ',this.state.commodity);}) ;
	}

	provideList(list)
	{
		//console.log(list.map((listItem) => { return {value:listItem.name , label : listItem.name};}));
		return list.map((listItem) => { return {value:listItem.name , label : listItem.name} ;}) ;
	}

	clearSearchParameters()
	{
 	console.log("before clearing",this.state);
		this.setState({
			startDate : '',
			endDate : '' ,
			commodity : [],
			buySide : false,
			sellSide : false,
			counterparty : [],
			location : []
		},()=>{	console.log("after clearing",this.state);});

	}


	render()
	{
		return <div>
			<Row>
    			<Col md={12}>
    				<Panel>
 						<Row>
 							<Col xs={2} md={2}>
				   			<div className = 'margins'>
									<Select value = {this.state.counterparty} placeholder = {'Counterparty'} onChange={this.handleCounterPartyChange} options={this.provideList(this.props.counterparties)} isMulti = {true} />
								</div>
							</Col>
							<Col xs={2} md={2}>
							<div className = 'margins'>
							<Select value = {this.state.commodity} placeholder = {'Commodity'} onChange={this.handleCommodityChange} options={this.provideList(this.props.commodities)} isMulti = {true} />
							</div>
						    </Col>
						    <Col xs={2} md={2}>
				    		<div className = 'margins'>
								<Select value = {this.state.location} placeholder = {'Trade Locations'} onChange={this.handleTradeLocationChange} options={this.provideList(this.props.tradeLocations)} isMulti = {true} />
				    		</div>
				    		</Col>
 							<Col xs={2}md={2}>
 							<div className = 'margins'>
	    						<ReactDatePicker value = {this.state.startDate} className = 'margins' placeholderText = 'Trade Start Date' selectsStart onChange={this.handleStartDateChange} selected={this.state.startDate} startDate={this.state.startDate} endDate={this.state.endDate}/>
	    					</div>
	    					</Col>
	    					<Col xs={2} md={2}>
	    					<div className = 'margins'>
	    						<ReactDatePicker value = {this.state.endDate} className = 'margins' placeholderText = 'Trade End Date'selectsEnd onChange={this.handleEndDateChange} selected={this.state.endDate} startDate={this.state.startDate} endDate={this.state.endDate}/>
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
						<Button bsStyle="primary">Search</Button>
	    			</ButtonToolbar>
    			</Col>
    		</Row>
    	</div>;
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
  return bindActionCreators({searchTrades : searchTrades} , dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);