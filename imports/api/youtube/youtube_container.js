// npm packages
import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
// atmosphere package
import { Meteor } from 'meteor/meteor';

import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';

class YouTubeContainer extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
    // get the api key from meteor setting file
    this.state = { youTubeKey: "AIzaSyAzTrfvYy3a8PNkqoUmtWO5u_lnMO835j8",
                  videos: [],
                  selectedVideo: null,
                 };
  }
  // ---------------------------------------------------------------------------
  componentDidMount() {
    // after component has finished mounting - call doSearch
    this.doSearch('hockey');
  }
  // ---------------------------------------------------------------------------
  doSearch(term) {
    // use imported YTSearch object to search youtube based on developer key and search term (initially hockey)
    // sets the state of selectedVideo to the first item in the json array
    YTSearch({ key: this.state.youTubeKey, term }, (data) => {
      this.setState({
         videos: data,
         selectedVideo: data[0] });
    });
  }
  // ---------------------------------------------------------------------------
  onVideoSelect(selectedVideo) {
    this.setState({ selectedVideo });
  }
  // ---------------------------------------------------------------------------
  onSearchTermChange(term) {
    this.doSearch(term);
  }
  // ---------------------------------------------------------------------------
  render() {
    return (
        <div>
          {/* PASS PROPS TO CHILD COMPONENTS */}
          {/* pass callback function to SearchBar */}
          <SearchBar onSearchTermChange={this.onSearchTermChange.bind(this)} />
          {/* pass object returned form youtube (video) to the child component */}
          <VideoDetail video={this.state.selectedVideo} />
          {/* callback function onVideoSelect passed to child component */}
          <VideoList videos={this.state.videos}
                     onVideoSelect={this.onVideoSelect.bind(this)} />
        </div>
    );
  }
}

export default YouTubeContainer;
