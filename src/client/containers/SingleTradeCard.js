import { connect } from 'react-redux';
import React, { Component } from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import SingleTradeCardCreateMode from './SingleTradeCardCreateMode';
import SingleTradeCardEditMode from './SingleTradeCardEditMode';
import SingleTradeCardViewMode from './SingleTradeCardViewMode';

class SingleTradeCard extends Component
{
	constructor(props) {
		super(props);
	}

	render() {
		console.log('which mode am I in ?',this.props.tradeCardMode);
		if(this.props.tradeCardMode === 'VIEW_TRADE') {
            return <div>
			    <SingleTradeCardViewMode />
		    </div>;
        }

		if(this.props.tradeCardMode === 'EDIT_TRADE') {
            return <div>
                <SingleTradeCardEditMode />
            </div>;
        }

		if(this.props.tradeCardMode === 'CREATE_TRADE') {
            return <div>
                <SingleTradeCardCreateMode />
            </div>;
        }
	}

}

function mapStateToProps(state) {
  return {
    tradeCardMode : state.tradeCardMode
  };
}

export default connect(mapStateToProps)(SingleTradeCard);
