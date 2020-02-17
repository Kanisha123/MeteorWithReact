import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
// import { BrowserDetect } from 'meteor/awatson1978:browser-detection';
class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      // Set initial state
      email: '',
      password: '',
      loginSuccess: false,
    };
  }
  // -------------------------------------------------------------------------
  handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        // Bert.alert('Welcome!', 'success');
        Bert.alert({
          type: 'success',
          style: 'growl-bottom-left',
          title: 'Welcome!',
          message: 'Successfully Logged in.',
        });
        // browserHistory.push('/projects');
        this.setState({ loginSuccess: true });
      }
    });
  }
  // -------------------------------------------------------------------------
  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }
 // --------------------------------------------------------------------------
  logoutUser() {
    Meteor.logout((err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert('Logged out!', 'success');
        // browserHistory.push('/login-form');
        this.setState({ userLoggedOut: true });
      }
    });
  }
  // --------------------------------------------------------------------------
  render() {
    /* if (BrowserDetect.browser == 'Firefox' || BrowserDetect.browser == 'Explorer') return ( // eslint-disable-line
     <h1>Ace Project Space - Please use Chrome Browser</h1>
   ); */
    if (this.state.loginSuccess) {
      return <Redirect to='/authors' />;
    }

    return (
      <div className="container">
        <div className="row main">
          <div className="panel-heading">
               <div className="panel-title text-center">
                  <h1 className="title">Login</h1>
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

              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Login</button>
              </div>
              <div className="login-register">
              <Link to='/register'>Register</Link> • <Link to='/forgot-password'>Forgot Password?</Link> • <a href="#/" onClick={this.logoutUser.bind(this)}> logout</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
