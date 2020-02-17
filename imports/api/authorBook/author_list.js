import React, { Component } from 'react';

import OneAuthor from './one_author';

class AuthorList extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
  }
  // ---------------------------------------------------------------------------
  renderAuthorItems() {
    // use the map function to output list
    // return the whole thing
    return this.props.authors.map((author) => {
      // return one of the things
      return (
         // pass props to child
        <OneAuthor key={author._id} author={author}/>
      );
    });
  }
  // ---------------------------------------------------------------------------
  render() {
    return (
      <div className="container">
        <h1>Authors</h1>
        <ul className='col-md-3 list-group'>
          {this.renderAuthorItems()}
        </ul>
      </div>
    );
  }
}

export default AuthorList;
