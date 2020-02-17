import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';


class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      // Set initial state
      email: '',
      password: '',
      passwordRepeat: '',
      error: '',
    };
  }

  handleSubmit(e) {
    // prevent form from submitting
    e.preventDefault();
    const user = this.state.email;
    const pass = this.state.password;
    const confirm = this.state.passwordRepeat;

    if (pass === confirm) {
      Accounts.createUser({ email: user, password: pass }, (err) => {
        if (err) {
          this.setState({
            error: err.reason,
          });
          Bert.alert(err.reason, 'danger');
        } else {
          // Meteor.call('sendVerificationLink', (error, response) => {// eslint-disable-line
          //   if (error) {
          //     Bert.alert('Failure on sending email...', 'danger');
          //   } else {
          //     Bert.alert('Verification Email Sent!', 'success');
          //   }
          // });
        }
      });
    } else {
      Bert.alert('Passwords do not match!', 'danger');
    }
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  validatePassword() {
  }

  render() {
    return (
    <div className="container">
      <div className="row main">
        <div className="panel-heading">
             <div className="panel-title text-center">
                <h1 className="title">Register</h1>
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

            <div className="form-group">
              <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
              <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" className="form-control" name="password"
                           id="password" placeholder="Enter your Password"
                           value={this.state.password}
                           onChange={this.handleChange.bind(this, 'password')}
                    />
                  </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                  <input type="password" className="form-control" name="confirm"
                         id="confirm" placeholder="Confirm your Password"
                         value={this.state.passwordRepeat}
                         onChange={this.handleChange.bind(this, 'passwordRepeat')}
                  />
                </div>
              </div>
            </div>

            <div className="form-group ">
              <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Register</button>
            </div>
            <div className="login-register">
              <Link to='/login-form'>Login</Link> • <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default RegisterForm;
