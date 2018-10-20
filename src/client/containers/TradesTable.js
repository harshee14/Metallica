import {Row,Col,Panel} from 'react-bootstrap';
import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { connect } from 'react-redux';
//import { searchTrades } from '../actions/index';

class TradesTable extends Component
{
    constructor(props)
    {
        super(props);

        // this.state = {
        //    tradeslist : []
        // } ;

        if(!this.props.tradeslist)
        {
          return <div>Loading list trades</div> ;
        }

        this.selectRow = {
          mode: 'radio',
          clickToSelect: true,
          hideSelectColumn: true,
          style: { backgroundColor: '#c8e6c9' }
        };



        this.columns = [{
          dataField: 'tradeDate',
          text: 'Trade Date'
        }, {
          dataField: 'commodity',
          text: 'Commodity'
        }, {
          dataField: 'price',
          text: 'Price'
        },
         {
          dataField: 'quantity',
          text: 'Quantity'
        },
         {
          dataField: 'location',
          text: 'Location'
        },
         {
          dataField: 'counterparty',
          text: 'Counterparty'
        },
        {
          dataField: 'side',
          text: 'Side'
        }
        ];

    }

    render()
    {

    return <div>
        <BootstrapTable keyField='tradeId' data={this.props.tradeslist} selectRow={ this.selectRow } columns={ this.columns } />
		        </div>;
      }
}

function mapStateToProps(state)
{
  return {
    tradeslist : state.tradeslist
  };
}

export default connect(mapStateToProps)(TradesTable);
