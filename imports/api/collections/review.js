import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

Meteor.methods({
  // ------------------------------------------------------------------------
  'review.remove': function (review) {
    check(review._id, String);
    // check roles and login credentials here
    return Review.remove(review._id);
  },
  // ------------------------------------------------------------------------
  // remove all reviews related to a particular book
  'review.removechildren': function (book) {
    check(book._id, String);
    // check roles and login credentials here
    return Review.remove({ bookId: book._id });
  },
  // ------------------------------------------------------------------------
  'review.update': function (review) {
    check(review._id, String);
    check(review.reviewer, String);
    check(review.review, String);

    // user must be logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not Authorized', 'Not Authorized');
    }
    // user must be admin for the tenant - 
    // tenant id will usually be a primary key of a group
    // in this case hard-coded
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'myWonderfulTenant')) {
      throw new Meteor.Error('Not Authorized', 'Not Authorized.');
    }

    // check roles and login credentials here
    return Review.update(review._id, {
      $set: {
        reviewer: review.reviewer,
        review: review.review,
      },
    });
  },
  // ------------------------------------------------------------------------
  'review.insert': function (review) {
    check(review.reviewer, String);
    check(review.date, Date); // genre not required can be null
    check(review.review, String);
    check(review.bookId, String);
    check(review.authorId, String);
    // check for roles and credentials here
    return Review.insert({
      reviewer: review.reviewer,
      date: review.date,
      review: review.review,
      bookId: review.bookId,
      authorId: review.authorId,
    });
  },
});

export const Review = new Mongo.Collection('review'); // eslint-disable-line import/prefer-default-export
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// lIMIT AMOUNT METHODS CAN BE CALLED

// Get list of all method names
const REVIEW_METHODS = ['review.remove', 'review.update', 'review.insert'];

if (Meteor.isServer) {
  // Only allow 5 operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(REVIEW_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
