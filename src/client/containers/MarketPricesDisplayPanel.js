import {Row,Col,Panel} from 'react-bootstrap';
import React, { Component } from 'react';
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3002");

function subscribeToPrices(callback) {
  socket.on('Prices', notifiedPrices => callback(notifiedPrices));
}


class MarketPricesDisplayPanel extends Component {
   _isMounted = false;

    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            metalAndPrices : [{key:'Iron',price:23},{key:'Gold',price:100},{key:'Silver',price:80},{key:'Alu',price:5},{key:'Platinum',price:150},{key:'Uranium',price:500}]
        };

    }

          componentDidMount() {
               this._isMounted = true;
               subscribeToPrices(metalAndPrices => {
                 if(this._isMounted)
                    this.setState({ metalAndPrices });
               });

        }

       componentWillUnmount() {
         this._isMounted = false;
       }


    render() {
       console.log("what is my state",this.state);
        return (
        <div>
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Live Market Prices</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                    {
                        this.state.metalAndPrices.map((metalAndPrice, index) => {
                            return (
                                <Col md={2}>
                                    <Panel>
                                        <Panel.Heading>{metalAndPrice.key}</Panel.Heading>
                                        <Panel.Body>{Math.abs(Math.ceil(metalAndPrice.price,1))}</Panel.Body>
                                    </Panel>
                                </Col>
                            );
                        })
                    }
                    </Row>
                </Panel.Body>
            </Panel>
        </div>)
        ;
    }
}

export default MarketPricesDisplayPanel;
