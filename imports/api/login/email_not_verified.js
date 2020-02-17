import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

class EmailNotVerified extends Component {
  constructor() {
    super();
    this.state = {
      // Set initial state
      email: '',
      error: '',
    };
  }
  // ----------------------------------------------
  handleSubmit(e) {
    e.preventDefault();
    Meteor.call('sendVerificationLink', (error, response) => {// eslint-disable-line
      if (error) {
        Bert.alert('Failure on sending email...', 'danger');
      } else {
        Bert.alert('Verification Email Sent!', 'success');
      }
    });
  }
  // ----------------------------------------------
  render() {
    return (
      <div className="container">
        <div className="row main">
          <div className="panel-heading">
               <div className="panel-title text-center">
                  <h1 className="title">Email Not Verified</h1>
                  <hr />
               </div>
          </div>

          <div className="main-login main-center">
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>

              <div className="form-group">
                <div className="cols-sm-10">
                </div>
              </div>

              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Resend Verification Email</button>
              </div>
              <div className="login-register">
                <Link to='/login-form'>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailNotVerified;
