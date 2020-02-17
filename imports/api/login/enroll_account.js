import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

class EnrollAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPassword: true,
    };
  }
  // ------------------------------------------------------------------
  componentDidMount() {
    this.setState({ resetPassword: true });
    // browserHistory.push(`/reset-password/${this.props.match.params.token}`);
  }
  // ------------------------------------------------
  render() {
    const url = `/reset-password/${this.props.match.params.token}`;
    if (this.resetPassword) {
      return <Redirect to={url} />;
    }

    return (
      <div className="login-card">
      <h1>Enroll Account</h1><br/>
        <div className="login-help">
          <Link to='/'>Login</Link> • <a href="#">Forgot Password</a>
        </div>
      </div>
    );
  }
}

export default EnrollAccount;
