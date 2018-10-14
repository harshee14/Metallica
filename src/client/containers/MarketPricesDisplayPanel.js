import {Row,Col,Panel} from 'react-bootstrap';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getUpdatedPrice } from '../actions/index';
import { bindActionCreators } from 'redux';

class MarketPricesDisplayPanel extends Component
{
  componentDidMount() {
           this.interval = setInterval(() => this.props.getUpdatedPrice(), 10000);
         }

  componentWillUnmount() {
      clearInterval(this.interval);
         }

  render()
    {
      if(!this.props.metalAndPrices)
      {
        return <div>Loading Metal Prices...</div> ;
      }

      return <div>
          <Panel bsStyle="primary">
             <Panel.Heading>
                 <Panel.Title componentClass="h3">Live Market Prices</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
             <Row>
                {
                    this.props.metalAndPrices.map((metalAndPrice, index) => {
                    return <Col md={2}>
                    <Panel>
                        <Panel.Heading>{metalAndPrice.key}</Panel.Heading>
                        <Panel.Body>{Math.abs(Math.ceil(metalAndPrice.price,1))}</Panel.Body>
                    </Panel>
                    </Col>;
                  })
                }
            </Row>
            </Panel.Body>

          </Panel>
		</div>;
       }
}

function mapStateToProps(state)
{
  return {
    metalAndPrices:state.metalAndPrices
  };
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({getUpdatedPrice : getUpdatedPrice} , dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MarketPricesDisplayPanel);
