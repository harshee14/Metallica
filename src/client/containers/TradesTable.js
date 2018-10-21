import {Row,Col,Panel} from 'react-bootstrap';
import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewTrade } from '../actions/index';

class TradesTable extends Component
{
    constructor(props)
    {
        super(props);

        this.selectRow = {
          mode: 'radio',
          clickToSelect: true,
          hideSelectColumn: true,
          style: { backgroundColor: '#c8e6c9' }
        };

        this.rowEvents = {
        onClick: (e, row, rowIndex) => {
          this.props.viewTrade(row);
        },
        onMouseEnter: (e, row, rowIndex) => {
          console.log('enter on row with index:',row);
        }
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
      if(!this.props.tradeslist)
      {
        return <div>No trades searched</div> ;
      }

    return <div>
        <BootstrapTable keyField='tradeId' data={this.props.tradeslist} selectRow={ this.selectRow } columns={ this.columns } rowEvents={this.rowEvents } />
		        </div>;
      }
}

function mapStateToProps(state)
{
  console.log(state);
  return {
    tradeslist : state.tradeslist
  };
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({viewTrade : viewTrade} , dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TradesTable);
