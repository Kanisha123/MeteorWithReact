import React, { Component } from 'react';

import ReviewsList from './reviews_list';

class OneAuthorBook extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
    // filter the book reviews to the relevant ones
    this.state = {
      icon: 'glyphicon glyphicon-menu-down',
      showReviews: false,
    }
  }
  //----------------------------------------------------------------------------
  toggleMenu() {
      this.setState({
        icon: this.state.showReviews ? 'glyphicon glyphicon-menu-down': 'glyphicon glyphicon-menu-up',
        showReviews: !this.state.showReviews,
    });
  }
  // ---------------------------------------------------------------------------
  removeBookAndReviews() {
    // remove the current book and all related reviews
    Meteor.call('review.removechildren', this.props.book, (err) => {
      if (err) {
        // error
      } else {
        // make sure children are removed before removing parent
        Meteor.call('book.remove', this.props.book);
      }
    });
  }
  // ---------------------------------------------------------------------------
  render() {
    // get the reviews for this book
    const bookId = this.props.book._id;
    const filteredReviews = this.props.reviews.filter(rev => rev.bookId === bookId);

    return (
      <div>
        <li className="list-group-item">
          <h3>
            <a href="#/" onClick={this.toggleMenu.bind(this)} className={this.state.icon}></a>
            {this.props.book.title}
            <a href="#/" onClick={this.removeBookAndReviews.bind(this)} className="glyphicon glyphicon-remove pull-right"></a>
          </h3>
        </li>
        {/* conditionally show reviews */}
        { this.state.showReviews ?
        <ul>
          <ReviewsList reviews={filteredReviews}
                       bookId={bookId}
                       setReview={this.props.setReview}
                       />
        </ul> : null }
      </div>
    );
  }
}

export default OneAuthorBook;
