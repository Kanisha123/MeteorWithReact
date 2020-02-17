import React from 'react';
import { Redirect } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import AuthorList from './author_list';
import { Author } from '../collections/author';

class AuthorContainer extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        author_info: Meteor.subscribe('authorpub') // get all the mystery writers
      },
      credentialsComplete: false,
      emailVerified: true,
    };
  }
  //----------------------------------------------------------------
  // async componentDidMount() {
  //   const credentials = await Meteor.callPromise('checkCredentials');
  //   await this.setCredentials(credentials);
  // }
  //----------------------------------------------------------------
  componentWillUnmount() {
    this.state.subscription.author_info.stop();
  }
  //----------------------------------------------------------------
  setCredentials(credentials) {
    this.setState({
      emailVerified: credentials.emailVerified,
      credentialsComplete: true,
    });
  }
  //----------------------------------------------------------------
  authorInfo() {
    return Author.find({}).fetch();
  }
  //----------------------------------------------------------------
  render() {
    // redirect if can't find user id
    if (!Meteor.userId()) {
      Bert.alert('Please Log In', 'info');
      return <Redirect to="/login-form" />;
    }
    // show loading animation if the data has not been retrieved yet 
    // - or - if the credentials check is not complete
    if (!this.authorInfo() /*|| !this.state.credentialsComplete*/) return (
         <div>Loading...</div>
      );

    // redirect if any issues
    // if (!this.state.emailVerified) {
    //   Bert.alert('Email not verified!', 'danger');
    //   return <Redirect to="/email-not-verified" />;
    // }
    // get all authors
    const vAuthors = this.authorInfo();

    return (
        <div>
          <section className="main">
            <AuthorList authors={vAuthors} />
          </section>
        </div>
    );
  }
}

export default AuthorContainer;
