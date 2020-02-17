import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';


class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      // Set initial state
      email: '',
      error: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state.email;
    Accounts.forgotPassword({ email: user }, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert('Email Sent!', 'success');
      }
    },
    );
  }


  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row main">
          <div className="panel-heading">
               <div className="panel-title text-center">
                  <h1 className="title">Forgot Password</h1>
                  <hr />
               </div>
          </div>

          <div className="main-login main-center">
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>

              <div className="form-group">
                <label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                      <input type="text" className="form-control" name="email"
                             id="email" placeholder="Enter your Email"
                             value={this.state.email}
                             onChange={this.handleChange.bind(this, 'email')}
                      />
                  </div>
                </div>
              </div>

              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Send Reset Email</button>
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

export default ForgotPassword;
