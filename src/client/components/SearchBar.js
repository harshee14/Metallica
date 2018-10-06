import { FormGroup, Checkbox } from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import React, { Component } from 'react';

import css from 'react-day-picker/lib/style.css';

class SearchBar extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			startDate : '' ,
			endDate : '' ,
			commodity : '',
			buySide : false,
			sellSide : false,
			counterparty : '',
			location : ''
		};
		this.handleBuySideChange = this.handleBuySideChange.bind(this);
		this.handleSellSideChange = this.handleSellSideChange.bind(this);

	}

	handleBuySideChange(e)
	{
		this.setState({buySide : e.target.checked});
	}

	handleSellSideChange(e)
	{
		this.setState({sellSide : e.target.checked});
	}

	render()
	{
		return <div>
				<FormGroup>
					<DayPicker/>
				</FormGroup>
			 	<FormGroup>
			      <Checkbox inline onChange={this.handleBuySideChange}>Buy</Checkbox> 
			      <Checkbox inline onChange={this.handleSellSideChange}>Sell</Checkbox> 
    			</FormGroup>
			</div>;
	}


}

export default SearchBar ;