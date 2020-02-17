import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

Meteor.methods({
  // ------------------------------------------------------------------------
  'book.remove': function (book) {
    check(book._id, String);
    // don't allow delete if not admin
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'myWonderfulTenant')) {
      throw new Meteor.Error('Not Authorized', 'Not Authorized.');
    }
    // check roles and login credentials here
    return Book.remove(book._id);
  },
  // ------------------------------------------------------------------------
  'book.update': function (book) {
    check(book._id, String);
    check(book.title, String);
    check(book.genre, Match.Maybe(String)); // genre not required can be null
    check(book.authorId, String);
    // check roles and login credentials here
    return Book.update(book._id, {
      $set: {
        title: book.title,
        genre: book.genre,
        authorId: book.authorId,
      },
    });
  },
  // ------------------------------------------------------------------------
  'book.insert': function (book) {
    check(book.title, String);
    check(book.genre, Match.Maybe(String)); // genre not required can be null
    check(book.authorId, String);
    // check for roles and credentials here
    return Book.insert({
      name: book.title,
      genre: book.genre,
      authorId: book.authorId,
    });
  },
});

export const Book = new Mongo.Collection('book'); // eslint-disable-line import/prefer-default-export
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// lIMIT AMOUNT METHODS CAN BE CALLED

// Get list of all method names
const BOOK_METHODS = ['book.remove', 'book.update', 'book.insert'];

if (Meteor.isServer) {
  // Only allow 5 operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(BOOK_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
