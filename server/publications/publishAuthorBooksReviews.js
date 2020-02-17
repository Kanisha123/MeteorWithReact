import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Author } from '../../imports/api/collections/author';
import { Book } from '../../imports/api/collections/book';
import { Review } from '../../imports/api/collections/review';

Meteor.publishComposite('author_books_reviews', function(authorId) { // eslint-disable-line
  check(authorId, String);
  //------------------------------------------------------------
  return {
    find: function() {
      //get one author
      return Author.find({ _id: authorId });
    },
    //------------------------------------------------------------------
    children: [
      {
        find: function (author) {
          // get the books based on the retrieved author
          return Book.find({ authorId: author._id });
        },
        //------------------------------------------------------------------
        children: [
          {
            find: function (book) {
              // get the book reviews based on the retrieved books
              return Review.find({ bookId: book._id });
            },
          },
        ], // child 3
      },
    ], // child 1
  }; // master
});
