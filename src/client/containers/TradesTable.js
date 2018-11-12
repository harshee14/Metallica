import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import React, { Component } from 'react';
import {Alert ,Panel, Row, Col} from 'react-bootstrap';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

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
            }, {
                dataField: 'tradeDate',
                text: 'Trade Date',
                headerAlign: 'center'
            }, {
                dataField: 'commodity',
                text: 'Commodity',
                headerAlign: 'center'
            }, {
                dataField: 'price',
                text: 'Price',
                headerAlign: 'center'
            }, {
                dataField: 'quantity',
                text: 'Quantity',
                headerAlign: 'center'
            }, {
                dataField: 'location',
                text: 'Location',
                headerAlign: 'center'
            }, {
                dataField: 'counterparty',
                text: 'Counterparty',
                headerAlign: 'center'
            }, {
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

    handleOnSelect = (row,isSelect) => {
      console.log('what is my row on handleOnSelect',row);
      this.props.viewTrade('VIEW_TRADE',row);
    }


    render() {
        console.log('TradesTable -> my tradeslist on rendering is :',this.props.tradeslist);
        var selectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            style: {
                backgroundColor: '#c8e6c9'
            },
            selected : [ this.props.selectedTradeId ],
            onSelect: this.handleOnSelect
        };

        if(!this.props.tradeslist) {
            return <div>
                    <Panel bsStyle="info">
                        <Panel.Heading>
                            <Panel.Title componentClass="h4">
                                <Row>
                                    <Col md = {12}>Trade Listing</Col>
                                </Row>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Row>
                                <Col md={12}>
                                    <Alert bsStyle="info"><h3> <strong>No Trades Searched ! <br /> Begin with Search Bar above.</strong></h3> </Alert>
                                </Col>
                            </Row>
                        </Panel.Body>
                    </Panel>
                </div> ;
        }
        //selectRow.selected = this.props.selectedTradeId;
        //this.selectRow.onSelect = this.handleOnSelect ;
        return (
            <div>
                <BootstrapTable keyField='tradeId' data={this.props.tradeslist} selectRow={ selectRow } defaultSorted = {this.defaultSorted} columns={ this.columns } rowEvents={this.rowEvents } />
            </div>
        );
    }
}

function mapStateToProps(state)
{
  return {
    tradeslist : state.tradeslist.trades, selectedTradeId : state.tradeslist.selectedTradeId
  };
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({viewTrade : viewTrade} , dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TradesTable);
