import {Row,Col,Panel} from 'react-bootstrap';
import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class TradesTable extends Component
{
    constructor(props)
    {
        super(props);
        let trades = [];
        for (var i = 10; i >= 0; i--) {
            trades.push(this.createDummyTrades());
        }
        this.state = {
           trades : trades 
        } ;

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

    createDummyTrades()
    {
        const metal = ['Iron','Gold','Silver','Platinum','Alu','Uranium'];
        const cp = ['ABC','XYZ','WRU','PS' ,'Corp'];
        const side = ['buy','sell'];
        const location = ['China','Japan','Singapore','Malaysia'];

        return {
            tradeDate : (new Date((new Date()).getTime() + 10000000000*Math.random())).toLocaleDateString("en-US"),
            commodity : metal[Math.floor(Math.random() * metal.length)],
            side :side[Math.floor(Math.random() * side.length)],
            quantity : Math.floor(10 + 50*Math.random()),
            price : Math.floor(134 - 20*Math.random()),
            location : location[Math.floor(Math.random() * location.length)],
            counterparty : cp[Math.floor(Math.random() * cp.length)],
            tradeId : Math.floor(Math.random()*10000)
        }
    }
	
    render()
    {

    return <div>
          <BootstrapTable keyField='tradeId' data={this.state.trades} selectRow={ this.selectRow } columns={ this.columns } />
		</div>;
       } 
}

export default TradesTable ;



