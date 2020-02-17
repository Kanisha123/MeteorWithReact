import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import OneAuthorBook from './one_author_book';

class AuthorBookList extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      reviewer: '',
      review: '',
      _id: '',
    };
  }
  // ---------------------------------------------------------------------------
  setReview(review) {
    // set the state in preparation for editing
    this.setState({
      reviewer: review.reviewer,
      review: review.review,
      _id: review._id,
    });
   }
  // ---------------------------------------------------------------------------
  resetState() {
    // use to reset state after saving
    this.setState({
      reviewer: '',
      review: '',
      _id: '',
    });
   }
  // ---------------------------------------------------------------------------
  handleChange(field, evt) {
    // set state according to the field that was passed
    this.setState({ [field]: evt.target.value });
  }
  // ---------------------------------------------------------------------------
  saveChanges() {
    // call meteor method using magic string
    Meteor.call('review.update', this.state);
    this.resetState();
  }
  // ---------------------------------------------------------------------------
  async roleStuff() {
    await Meteor.call('userRoleStuff');
  }
  // ---------------------------------------------------------------------------
  renderAuthorBooks() {
    // return the whole thing
    return this.props.books.map((book) => {
      // return one of the things
      return (
          <OneAuthorBook key={book._id}
                         book={book}
                         reviews={this.props.reviews}
                         setReview={this.setReview.bind(this)}/>
      );
    });
  }
  // ---------------------------------------------------------------------------
  render() {
    return (
        <div className="container">
          <h1>{this.props.author.name}
            <button className='btn btn-primary' onClick={this.roleStuff.bind(this)}>
              User Role
            </button>
          </h1> 
          <ul  className='col-md-12 list-group'>{this.renderAuthorBooks()}</ul>
          {/* ---------------------------------------- */}
          {Roles.userIsInRole(Meteor.userId(), ['admin'], 'myWonderfulTenant') ? 
          <div>
            <label htmlFor="reviewer">Reviewer</label>
            <input type='text'
            id="reviewer"
            value={this.state.reviewer}
            onChange={this.handleChange.bind(this, 'reviewer')}
            placeholder="Reviewer"
            />
            {/* ---------------------------------------- */}
            <label htmlFor="review">Review</label>
            <input type='text'
            id="review"
            value={this.state.review}
            onChange={this.handleChange.bind(this, 'review')}
            placeholder="Review"
            />
            {/* ---------------------------------------- */}
            <button className='btn btn-primary' onClick={this.saveChanges.bind(this)}>
              Save changes
            </button>
          </div>
          : null}
          {/* ---------------------------------------- */}
        </div>
    );
  }
}

export default AuthorBookList;
