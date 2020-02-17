import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
{/*
Meteor.methods({
  // ------------------------------------------------------------------------
  'knight.remove': function (knight) {
    check(knight._id, String);
    // check roles and login credentials here
    return Book.remove(knight._id);
  },
  // ------------------------------------------------------------------------
  'knight.update': function (knight) {
    check(knight._id, String);
    check(knight.title, String);
    check(knight.genre, Match.Maybe(String)); // genre not required can be null
    check(knight.authorId, String);
    // check roles and login credentials here
    return Book.update(knight._id, {
      $set: {
        title: knight.title,
        genre: knight.genre,
        authorId: knight.authorId,
      },
    });
  },
  // ------------------------------------------------------------------------
  'knight.insert': function (knight) {
    check(knight.title, String);
    check(knight.genre, Match.Maybe(String)); // genre not required can be null
    check(knight.authorId, String);
    // check for roles and credentials here
    return Knight.insert({
      name: knight.name,
      genre: knight.quest,
      authorId: knight.color,
    });
  },
});

*/}

export const Knight = new Mongo.Collection('knight'); // eslint-disable-line import/prefer-default-export
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
