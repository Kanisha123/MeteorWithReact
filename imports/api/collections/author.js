import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

Meteor.methods({
  // ------------------------------------------------------------------------
  'author.remove': function (author) {
    check(author._id, String);
    // check roles and login credentials here
    return Author.remove(author._id);
  },
  // ------------------------------------------------------------------------
  'author.update': function (author) {
    check(author._id, String);
    check(author.name, String);
    check(author.avatar, String);
    // check roles and login credentials here
    return Author.update(author._id, {
      $set: {
        name: author.name,
        avatar: author.avatar,
      },
    });
  },
  // ------------------------------------------------------------------------
  'author.insert': function (author) {
    check(author.name, String);
    check(author.avatar, String);
    // check for roles and credentials here
    return Author.insert({
      name: author.name,
      avatar: author.avatar,
    });
  },
});

export const Author = new Mongo.Collection('author'); // eslint-disable-line import/prefer-default-export
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// lIMIT AMOUNT METHODS CAN BE CALLED

// Get list of all method names
const AUTHOR_METHODS = ['author.remove', 'author.update', 'author.insert'];

if (Meteor.isServer) {
  // Only allow 5 operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(AUTHOR_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
