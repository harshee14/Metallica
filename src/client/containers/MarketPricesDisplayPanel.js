import {Row,Col,Panel} from 'react-bootstrap';
import React, { Component } from 'react';

class MarketPricesDisplayPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            metalAndPrices : [{key:'Iron',price:23},{key:'Gold',price:100},{key:'Silver',price:80},{key:'Alu',price:5},{key:'Platinum',price:150},{key:'Uranium',price:500}]
        };
        this.getUpdatedPrice = this.getUpdatedPrice.bind(this);
    }

    componentDidMount() {
        this.timerID =  setInterval(() => {
            this.setState({
                metalAndPrices : this.getUpdatedPrice()
            });
        },100);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getUpdatedPrice() {
        // after integration prices will come from backend
        var metalAndPrices =  [
            {key:'Iron',price:23 * (Math.random()-0.5)},
            {key:'Gold',price:100 * (Math.random()-0.5)},
            {key:'Silver',price:80 * (Math.random()-0.5)},
            {key:'Alu',price:5 * (Math.random()-0.5)},
            {key:'Platinum',price:150 * (Math.random()-0.5)},
            {key:'Uranium',price:500 * (Math.random()-0.5)}
        ];
        return metalAndPrices ;
    }

    render() {
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
