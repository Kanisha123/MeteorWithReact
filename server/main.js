import { Meteor } from 'meteor/meteor';
import { name, image, date, lorem, company} from 'faker';
import { Roles } from 'meteor/alanning:roles';

import { Author } from '../imports/api/collections/author';
import { Book } from '../imports/api/collections/book';
import { Review } from '../imports/api/collections/review';
import { Knight } from '../imports/api/collections/knight';

Meteor.startup(() => {
  // set email
  process.env.MAIL_URL = Meteor.settings.smtp;
  currentRoles = Roles.getAllRoles().fetch();
  if( currentRoles.length === 0 ) {
    Roles.createRole('noob');
    Roles.createRole('admin');
  }

  // code to run on server at startup
//knight data
 const numKnights = Knight.find({}).count();
 if(!numKnights) {
   for(let i = 0; i < 3; i++){
     const knightId =  Knight.insert({
       name: name.findName(),
       quest: company.catchPhrase(),
       color: lorem.word(),
     });
   }
 }

  //generate fake data
  const numAuthors = Author.find({}).count();
  if (!numAuthors) {
    // insert authors
    for(let i = 0; i < 10; i++) {
    const authorId = Author.insert({
      name: name.findName(),
      avatar: image.avatar(),
    });
    // insert books for author
    for(let j = 0; j < 3; j++) {
      const bookId = Book.insert({
        title: lorem.word(),
        genre: 'Mystery',
        authorId: authorId,
      });
     // insert reviews for books
     for(let k = 0; k < 3; k++) {
       const reviewId =  Review.insert({
         reviewer: name.findName(),
         date: date.past(),
         review: lorem.sentence(),
         bookId: bookId,
         authorId: authorId,
       });
     }
    }
   }
  }
});
