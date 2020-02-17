import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

import { Author } from '../collections/author';
import { Book } from '../collections/book';
import { Review } from '../collections/review';
import AuthorBookList from './author_booklist';

class AuthorBookContainer extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    const authorId = props.match.params.authorId;
    this.state = {
      subscription: {
        auth_book_review: Meteor.subscribe('author_books_reviews', authorId) // get all the mystery writers
      },
      authorId,
      emailVerified: false,
      credentialsComplete: false,
    };
  }
  //----------------------------------------------------------------
  // async componentDidMount() {
  //   const credentials = await Meteor.callPromise('checkCredentials');

  //   this.setState({
  //     emailVerified: credentials.emailVerified,
  //     credentialsComplete: true,
  //   });
  // }
  //----------------------------------------------------------------
  componentWillUnmount() {
    this.state.subscription.auth_book_review.stop();
  }
  //----------------------------------------------------------------
  authorInfo() {
    return Author.findOne({});
  }
  //----------------------------------------------------------------
  bookInfo() {
    return Book.find({}).fetch();
  }
  //----------------------------------------------------------------
  reviewInfo() {
    return Review.find({}).fetch();
  }
  //----------------------------------------------------------------
  render() {
    // redirect if can't find user id
    if (!Meteor.userId()) {
      Bert.alert('Please Log In', 'info');
      return <Redirect to="/login-form" />;
    }
    
    if (!this.authorInfo() /*|| !this.state.credentialsComplete*/) return (
         <div>Loading...</div>
      );

    // // redirect if any issues
    // if (!this.state.emailVerified) {
    //   Bert.alert('Email not verified!', 'danger');
    //   return <Redirect to="/email-not-verified" />;
    // }

    const vAuthor = this.authorInfo(); // will only be one
    const vBooks = this.bookInfo(); // all books related to author
    const vReviews = this.reviewInfo(); // all reviews related to the fetched books

    return (
        <div>
          <section className="main">
            <AuthorBookList author={vAuthor}
                            books={vBooks}
                            reviews={vReviews} />
          </section>
        </div>
    );
  }
}

export default AuthorBookContainer;
