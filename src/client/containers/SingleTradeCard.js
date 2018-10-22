import {Glyphicon ,FormControl,ControlLabel,Label,ButtonGroup,Panel, Button, FormGroup, Checkbox, Row, Col,ButtonToolbar, DropdownButton , MenuItem} from 'react-bootstrap';

import React, { Component } from 'react';

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import SingleTradeCardViewMode from './SingleTradeCardViewMode';
import SingleTradeCardEditMode from './SingleTradeCardEditMode';
// import SingleTradeCardCreateMode from './SingleTradeCard';
import { connect } from 'react-redux';

class SingleTradeCard extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		console.log('which mode am I in ?',this.props.tradeCardMode);
		if(this.props.tradeCardMode === 'VIEW_TRADE')
		return <div>
			<SingleTradeCardViewMode />
		</div>;

		if(this.props.tradeCardMode === 'EDIT_TRADE')
		return <div>
			<SingleTradeCardEditMode />
		</div>;
	}

}

function mapStateToProps(state)
{
  console.log(state);
  return {
    tradeCardMode : state.tradeCardMode
  };
}


export default connect(mapStateToProps)(SingleTradeCard);
