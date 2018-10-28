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
        // this.state = {
        //     tradeslist : this.props.tradeslist,
        //     selectedTradeId : this.props.selectedTradeId
        // };

          this.rowEvents = {
          onClick: (e, row, rowIndex) => {
            this.props.viewTrade('VIEW_TRADE',row);
          }

          // onSelect : (row,isSelect) => {
          //   this.props.viewTrade('VIEW_TRADE',row);
          //}

          // onMouseEnter: (e, row, rowIndex) => {
          //   console.log('enter on row with index:',row);
          //}
        };

        this.columns = [
          {
          dataField: 'tradeId',
          text: 'Trade Id',
          sort : true
        },
        {
          dataField: 'tradeDate',
          text: 'Trade Date',
          headerAlign: 'center'
        },
         {
          dataField: 'commodity',
          text: 'Commodity',
          headerAlign: 'center'
        }, {
          dataField: 'price',
          text: 'Price',
          headerAlign: 'center'
        },
         {
          dataField: 'quantity',
          text: 'Quantity',
          headerAlign: 'center'
        },
         {
          dataField: 'location',
          text: 'Location',
          headerAlign: 'center'
        },
         {
          dataField: 'counterparty',
          text: 'Counterparty',
          headerAlign: 'center'
        },
        {
          dataField: 'side',
          text: 'Side',
          headerAlign: 'center'
        }
        ];

        this.defaultSorted = [{
            dataField: 'tradeId',
            order: 'asc'
          }];

      this.handleOnSelect = this.handleOnSelect.bind(this);
    }

    handleOnSelect = (row,isSelect) =>
    {
      console.log('what is my row on handleOnSelect',row);
      this.props.viewTrade('VIEW_TRADE',row);
    }


    render()
    {
        console.log('my tradeslist ?',this.props.tradeslist);
      var selectRow = {
              mode: 'radio',
              clickToSelect: true,
              hideSelectColumn: true,
              style: { backgroundColor: '#c8e6c9' },
              selected : [this.props.selectedTradeId],
              onSelect: this.handleOnSelect
          };
      if(!this.props.tradeslist)
      {
        return <div>No trades searched</div> ;
      }

      selectRow.selected = [this.props.selectedTradeId];

      //this.selectRow.onSelect = this.handleOnSelect ;
      console.log('How does my delctRow object look like ?', selectRow.selected);
      return <div>
        <BootstrapTable keyField='tradeId' data={this.props.tradeslist} selectRow={ selectRow } defaultSorted = {this.defaultSorted} columns={ this.columns } rowEvents={this.rowEvents } />
		        </div>;
      }
}

function mapStateToProps(state)
{

  var tradeslist = state.tradeslist.trades ;
  var selectedTradeId = state.tradeslist.selectedTradeId
  console.log("what ismy tradeslist",tradeslist);
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
