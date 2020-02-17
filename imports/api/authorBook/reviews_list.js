import React, { Component } from 'react';

class ReviewsList extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
  }
  // ---------------------------------------------------------------------------
  setReview(review) {
    // calls --> one_author_book --> author_booklist
    this.props.setReview(review);
  }
  // ---------------------------------------------------------------------------
  renderReviews() {
    //return the whole thing
    return this.props.reviews.map((review) => {
      // return one of the things
      return (
        <li key={review._id} className="list-group-item">
          <h5>{review.reviewer} - {review.review}
            <a href="#/" className="glyphicon glyphicon-user"
                         onClick={() => this.setReview(review)}/>
          </h5>
        </li>
      );
    });
  }
  // ---------------------------------------------------------------------------
  render() {
    return (
        <div>
          {this.renderReviews()}
        </div>
    );
  }
}

export default ReviewsList;
