import {Label,ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import ReactDatePicker from 'react-datepicker'

import React, { Component } from 'react';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';



//import css from 'react-day-picker/lib/style.css';
//var ReactDatePicker = require('react-date-picker-cs');
class SearchBar extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			startDate : '',
			endDate : '' ,
			commodity : '',
			buySide : false,
			sellSide : false,
			counterparty : '',
			location : ''
		};
		this.handleBuySideChange = this.handleBuySideChange.bind(this);
		this.handleSellSideChange = this.handleSellSideChange.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);


	}

	handleBuySideChange(e)
	{
		this.setState({buySide : e.target.checked});
	}

	handleSellSideChange(e)
	{
		this.setState({sellSide : e.target.checked});
	}

	handleStartDateChange = startDate => this.setState({ startDate });
	handleEndDateChange = endDate => this.setState({ endDate });



	render()
	{
		
		return <div>
			<Row>
    			<Col md={12}>
    				<Panel> 
 						<Row>
 							<Col xs={2} md={2}>
				   			<div className = 'margins'>
				    			<DropdownButton className = 'margins' title="Counter Party" id="dropdown-size-medium">
							      <MenuItem eventKey="1">ABC</MenuItem>
							      <MenuItem eventKey="2">XYZ</MenuItem>
							      <MenuItem eventKey="3">WRU</MenuItem>
							      <MenuItem eventKey="4">PS</MenuItem>		          
				    			</DropdownButton>
				    		</div>
							</Col>
							<Col xs={2} md={2}>
							<div className = 'margins'>
							    <DropdownButton className = 'margins' title="Trade Location" id="dropdown-size-medium">
							      <MenuItem eventKey="1">China</MenuItem>
							      <MenuItem eventKey="2">Japan</MenuItem>
							      <MenuItem eventKey="3">Singapore</MenuItem>
							      <MenuItem eventKey="4">Malaysia</MenuItem>
							    </DropdownButton>
							</div>
						    </Col>
						    <Col xs={2} md={2}>
				    		<div className = 'margins'>
				    			<DropdownButton className = 'margins' title="Commodity" id="dropdown-size-medium">
				      				<MenuItem eventKey="1">Iron</MenuItem>
				      				<MenuItem eventKey="2">Aluminium</MenuItem>
				      				<MenuItem eventKey="3">Zinc</MenuItem>
				      				<MenuItem eventKey="4">Gold</MenuItem>
				    			</DropdownButton>
				    		</div>
				    		</Col>
 							<Col xs={2}md={2}>
 							<div className = 'margins'>
	    						<ReactDatePicker className = 'margins' placeholderText = 'Trade Start Date' selectsStart onChange={this.handleStartDateChange} selected={this.state.startDate} startDate={this.state.startDate} endDate={this.state.endDate}/>	
	    					</div>
	    					</Col>
	    					<Col xs={2} md={2}>
	    					<div className = 'margins'>
	    						<ReactDatePicker className = 'margins' placeholderText = 'Trade End Date'selectsEnd onChange={this.handleEndDateChange} selected={this.state.endDate} startDate={this.state.startDate} endDate={this.state.endDate}/>
				    		</div>
				    		</Col>				    		
				   			<Col xs={2} md={2}> 
				 		    <div className = 'margins'>
			      				<Checkbox inline onChange={this.handleBuySideChange}>Buy</Checkbox> 
			      				<Checkbox inline onChange={this.handleSellSideChange}>Sell</Checkbox> 
				  			</div>
				  			</Col> 
						</Row> 
			 		</Panel>
    			</Col>    			
    		</Row>
    		<Row className = 'bottom-margins'>
    			<Col md={12}>
	    			<ButtonToolbar className = "pull-right">
	    			  	<Button >Clear</Button>
						<Button bsStyle="primary">Search</Button>
	    			</ButtonToolbar>
    			</Col>
    		</Row>
    	</div>;
	}


}

export default SearchBar ;