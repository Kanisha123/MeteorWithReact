import React, { Component } from 'react';

class SearchBar extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
    // create initial state
    this.state = { term: '' };
  }
  // ---------------------------------------------------------------------------
  onInputChange(evt) {
    // callback function to get change of input in render method
    this.setState({ term: evt.target.value });
    // use callback function to call function in parent component
    this.props.onSearchTermChange(evt.target.value);
  }
  // ---------------------------------------------------------------------------
  render() {
    return (
        <div className="search-bar">
           <input
            onChange={this.onInputChange.bind(this)}
            value={this.state.term} />
        </div>
    );
  }
}

export default SearchBar;
