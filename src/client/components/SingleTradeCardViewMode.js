import {Glyphicon ,FormControl,ControlLabel,Label,ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import React, { Component } from 'react';

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

class SingleTradeCardViewMode extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			
		};
	


	}
	
	render()
	{
		return <div>
		 <Panel bsStyle="info">
             <Panel.Heading>
                 <Panel.Title componentClass="h4">
                 <Row>
                 <Col md = {9} id = "singletradecardheading">Trade Id</Col> 
                 <Col md = {3} id = "singletradecardicons">
                 <Button bsSize="xsmall"> <Glyphicon glyph="pencil" /> </Button>
                 <Button bsSize="xsmall"> <Glyphicon glyph="trash" /> </Button>
                 </Col>
                 </Row>
                 </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            		<Row>
				    	<Col md={12}>
				    	<FormGroup controlId = 'CP'>
					    	<ControlLabel>Counter Party</ControlLabel>
					    	 <FormControl componentClass="select" placeholder="select">
						        <option value="1">ABC</option>
						        <option value="2">XYZ</option>
						        <option value="3">WRU</option>
						        <option value="4">PS</option>
	      					</FormControl>	
				    	</FormGroup>
				    	</Col>
					</Row>
					<Row>		
						<Col md={12}>
				    	<FormGroup controlId = 'Location'>
					    	<ControlLabel>Location</ControlLabel>
					    	 <FormControl componentClass="select" placeholder="select">
						        <option value="1">Japan</option>
						        <option value="2">Singapore</option>
						        <option value="3">Russia</option>
						        <option value="4">India</option>
	      					</FormControl>	
				    	</FormGroup>							    
						</Col>
					</Row>		
					<Row>	  
				    	<Col md={12}>
				    	<FormGroup controlId = 'Commodity'>
					    	<ControlLabel>Commodity</ControlLabel>
					    	 <FormControl componentClass="select" placeholder="select">
						        <option value="1">Zinc</option>
						        <option value="2">Iron</option>
						        <option value="3">Gold</option>
						        <option value="4">Silver</option>
	      					</FormControl>	
				    	</FormGroup>
				    	</Col>
				    </Row>
	    			<Row>	
				 		<Col md={12}>
			      				<Checkbox inline onChange={this.handleBuySideChange}>Buy</Checkbox> 
			      				<Checkbox inline onChange={this.handleSellSideChange}>Sell</Checkbox> 
			      		</Col>
			      	</Row>					    
				    <Row>	
	    				<Col md={12}>
	    						 <ReactDatePicker className = 'margins' placeholderText = 'Trade Date' selectsStart onChange={this.handleStartDateChange} selected={this.state.startDate} startDate={this.state.startDate} endDate={this.state.endDate}/>	
	    				</Col>
	    			</Row>           
            </Panel.Body>
          </Panel>
		</div>;
	}

}

export default SingleTradeCardViewMode ;