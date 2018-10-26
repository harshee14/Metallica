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
            hideSelectColumn: false,
            style: { backgroundColor: '#c8e6c9' },
            selected : [this.props.selectedTradeId],
          };

          this.rowEvents = {
          onClick: (e, row, rowIndex) => {
            this.props.viewTrade('VIEW_TRADE',row);
          }

          // onMouseEnter: (e, row, rowIndex) => {
          //   console.log('enter on row with index:',row);
          //}
        };

        this.columns = [{
          dataField: 'tradeId',
          text: 'Trade Id',
          sort : true
        },{
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

        this.defaultSorted = [{
            dataField: 'tradeId',
            order: 'asc'
          }];

      	this.handleOnSelect = this.handleOnSelect.bind(this);
    }

    handleOnSelect(row,isSelect)
    {
      console.log('what is my row on handleOnSelect',row);
      this.props.viewTrade('VIEW_TRADE',row);
    }

    render()
    {
      if(!this.props.tradeslist)
      {
        return <div>No trades searched</div> ;
      }
      this.selectRow.selected = [this.props.selectedTradeId];
      this.selectRow.onSelect = this.handleOnSelect ;
      return <div>
        <BootstrapTable keyField='tradeId' data={this.props.tradeslist} selectRow={ this.selectRow } defaultSorted = {this.defaultSorted} columns={ this.columns } rowEvents={this.rowEvents } />
		        </div>;
      }
}

function mapStateToProps(state)
{

  var tradeslist = state.tradeslist.trades ;
  var selectedTradeId = state.tradeslist.selectedTradeId
  return {
    tradeslist ,
    selectedTradeId
  };
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({viewTrade : viewTrade} , dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TradesTable);
