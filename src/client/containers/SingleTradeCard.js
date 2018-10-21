import {Glyphicon ,FormControl,ControlLabel,Label,ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import React, { Component } from 'react';

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import SingleTradeCardViewMode from './SingleTradeCardViewMode';
import SingleTradeCardEditMode from './SingleTradeCardEditMode';
// import SingleTradeCardCreateMode from './SingleTradeCard';

class SingleTradeCard extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			create : false ,
			edit : false ,
			view : true ,
			del : false
		};



	}

	render()
	{
		return <div>

			<SingleTradeCardEditMode />

		</div>;
	}

}

export default SingleTradeCard ;
