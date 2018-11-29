import { Grid, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderMenu from './containers/HeaderMenu';
import LoginPanel from './containers/LoginPage';
import MarketPricesDisplayPanel from './containers/MarketPricesDisplayPanel';
import './app.css';

class App extends Component {

    render() {

        const Tag = this.props.isAuthenticated ? <HeaderMenu /> : <LoginPanel />
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
                             {Tag}
                          </Col>
                      </Row>

                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {

    isAuthenticated : state.userInfo.isAuthenticated
  };
}

export default connect(mapStateToProps)(App);
