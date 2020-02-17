import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Author } from '../../imports/api/collections/author';

// always limit publications by arguments
Meteor.publish('authorpub', function () { // have to use es5 syntax here
  // this is bad practice - should always limit record amounts by retrival arg
  return Author.find({}); // object shorthand
});
