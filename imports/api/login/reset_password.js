import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import SimpleReactValidator from 'simple-react-validator';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      // Set initial state
      password: '',
      passwordRepeat: '',
      error: '',
      passwordReset: false,
    };
    this.validator = new SimpleReactValidator();
  }
  // ---------------------------------------------------------
  componentWillUnmount() {
    // this.validator.hideMessages();
  }
  // ---------------------------------------------------------
  validateBeforeSaving(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.saveChanges();
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }
  // ---------------------------------------------------------
  saveChanges() {
    const password = this.state.password;
    Accounts.resetPassword(this.props.match.params.token, password, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert('Password Changed!', 'success');
        // browserHistory.push('/login-form');
        this.setState({ passwordReset: true });
      }
    });
  }
  // ---------------------------------------------------------
  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }
  // ---------------------------------------------------------
  render() {
    if (this.state.passwordReset) {
      return <Redirect to='/login-form' />;
    }

    return (
      <div className="container">
        <div className="row main">
          <div className="panel-heading">
               <div className="panel-title text-center">
                  <h1 className="title">Reset Password</h1>
                  <hr />
               </div>
          </div>

          <div className="main-login main-center">
            <form className="form-horizontal" onSubmit={this.validateBeforeSaving.bind(this)}>

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
                {this.validator.message('Password', this.state.password, 'required|min:7')}
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
                {/* 
                {this.validator.message('Confirm Password', this.state.passwordRepeat,
                  `required|min:7|in:${this.state.password}`, false, {in:'Must match password.'})}
                */}
              </div>

              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Change Password</button>
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

export default ResetPassword;
