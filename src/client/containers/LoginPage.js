import {Row,Col,Panel,Button,Jumbotron} from 'react-bootstrap';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';
import { login } from '../actions/index';

class LoginPage extends Component {

    constructor(props) {
      super(props);

      this.onFailure = this.onFailure.bind(this);
      this.googleResponse = this.googleResponse.bind(this);
    }

    onFailure = (error) => {
        alert("Error login in");
        console.log("Error logging in : ", error);
    };

    googleResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:4000/api/v1/auth/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
              console.log('what did google return',user);
                if (token) {
                    this.props.login({isAuthenticated: true, user, token});
                }
            });
        })
    };

    render() {
        return (
        <div>
        <Jumbotron>
          <h2> Welcome ! You are ready to use Metallica App !</h2>
          <p>
            You can login using your Google credentials. Click on the button below.
          </p>
          <p>
            <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.googleResponse}
                onFailure={this.onFailure}
            />
          </p>
        </Jumbotron>
        </div>)

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login : login} , dispatch);
}

export default connect(null,mapDispatchToProps)(LoginPage);
