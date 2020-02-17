import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Knight } from '../../imports/api/collections/knight';

// always limit publications by arguments
Meteor.publish('knightpub', function () { // have to use es5 syntax here
  // this is bad practice - should always limit record amounts by retrival arg
  return Knight.find({});
});
