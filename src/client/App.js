import { Grid, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';

import HeaderMenu from './components/HeaderMenu';
import MarketPricesDisplayPanel from './containers/MarketPricesDisplayPanel';

import './app.css';

export default class App extends Component {
    state = { username: null };

    componentDidMount() {
        // fetch('/api/getUsername')
        //     .then(res => res.json())
        //     .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { username } = this.state;
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                           <MarketPricesDisplayPanel />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                           < HeaderMenu />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
