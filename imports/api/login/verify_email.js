import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

class VerifyEmail extends Component {
  constructor() {
    super();
    this.state = {
      emailVerified: false,
    };
  }
  // ----------------------------------------------------------------
  componentDidMount() {
    Accounts.verifyEmail(this.props.match.params.token, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Email verified! Thanks!', 'success');
        // browserHistory.push('/projects');
        this.setState({ emailVerified: true });
      }
    });
  }
  // -----------------------------------------------------
  render() {
    if (this.state.emailVerified) {
      return <Redirect to='/authors' />;
    }
    return (
      <div className="login-card">
      <h1>Verify Email</h1><br/>
        <div className="login-help">
          <Link to='/'>Login</Link> • <a href="#">Forgot Password</a>
        </div>
      </div>
    );
  }
}

export default VerifyEmail;
