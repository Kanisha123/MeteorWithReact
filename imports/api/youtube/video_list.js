import React, { Component } from 'react';

import VideoListItem from './video_list_item';

class VideoList extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
  }
  // ---------------------------------------------------------------------------
  renderVideoItems() {
    // use the map function to output list
    // return the whole thing
    return this.props.videos.map((video) => {
      // return one of the things
      return (
         // callback function onVideoSelect passed to child component
        <VideoListItem key={video.etag}
                       video={video}
                       onVideoSelect={this.props.onVideoSelect} />
      );
    });
  }
  // ---------------------------------------------------------------------------
  render() {
    return (
        <ul className='col-md-4 list-group'>
          {this.renderVideoItems()}
        </ul>
    );
  }
}

export default VideoList;
