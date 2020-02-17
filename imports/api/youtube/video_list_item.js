import React, { Component } from 'react';

class VideoListItem extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
  }
  // ---------------------------------------------------------------------------
  onVideoSelect() {
    // calls up the chain from here --> video_list --> youtube_container.onVideoSelect function
    this.props.onVideoSelect(this.props.video);
  }
  // ---------------------------------------------------------------------------
  render() {
    //get the image url - from props video
    const imageUrl = this.props.video.snippet.thumbnails.default.url;
    // when li is clicked call onVideoSelect
    return (
        <li onClick={this.onVideoSelect.bind(this)} className="list-group-item">
          <div className="video-list media">
            <div className="media-left">
              <img className="media-object" src={imageUrl} />
            </div>
            <div className="media-body">
              <div className="media-heading">{this.props.video.snippet.title}</div>
            </div>
          </div>
        </li>
    );
  }
}

export default VideoListItem;
