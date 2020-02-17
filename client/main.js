// imports from NPM packages
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
// atmosphere packages
import { Meteor } from 'meteor/meteor';
// imports from files we created
// import App from '../imports/api/app';
import YouTubeContainer from '../imports/api/youtube/youtube_container';
import AuthorContainer from '../imports/api/authorBook/author_container';
import AuthorBookContainer from '../imports/api/authorBook/author_book_container';
import KnightContainer from '../imports/api/knight/knight_container';
// login related forms
import LoginForm from '../imports/api/login/login_form';
import ResetPassword from '../imports/api/login/reset_password';
import EmailNotVerified from '../imports/api/login/email_not_verified';
import EnrollAccount from '../imports/api/login/enroll_account';
import VerifyEmail from '../imports/api/login/verify_email';
import ForgotPassword from '../imports/api/login/forgot_password';
import RegisterForm from '../imports/api/login/register_form';

const routes = (
  <BrowserRouter>
      <Switch>
        {/* Routes for Login */}
        <Route path="/" exact component={LoginForm} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="/enroll-account/:token" component={EnrollAccount} />
        <Route path="/verify-email/:token" component={VerifyEmail} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login-form" component={LoginForm} />
        <Route path="/email-not-verified" render={() => {
         if (Meteor.userId()) {
            return (<EmailNotVerified />);
         } else {
           Bert.alert('Please Log In', 'info');
           return (<LoginForm />);
         }
        }} />
        {/* application specific routes */}
        <Route path="/knight" render={() => {
         if (Meteor.userId()) {
            return (<KnightContainer />);
         } else {
           Bert.alert('Please Log In', 'info');
           return (<LoginForm />);
         }
        }} />
        <Route path="/youtube" render={() => {
          if (Meteor.userId()) {
            return (<YouTubeContainer />);
         } else {
           Bert.alert('Please Log In', 'info');
           return (<LoginForm />);
         }
        }} />
        <Route path="/authors" render={() => {
          if (Meteor.userId()) {
            return (<AuthorContainer />);
          } else {
           Bert.alert('Please Log In', 'info');
           return (<LoginForm />);
          }
        }} />
        <Route path="/auth-book/:authorId" component={ AuthorBookContainer } />
      </Switch>
  </BrowserRouter>
);

// after meteor loads in browser render app
Meteor.startup(() => {
  // react render call
  ReactDOM.render(routes, document.querySelector('.AppContainer'));
});
