import React, { Component } from 'react';
import YouTube from 'react-youtube';

class VideoDetail extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
  }
  // ---------------------------------------------------------------------------
  render() {
    // render loading... if null - wait for data to be retrieved
    if (!this.props.video) {
      return (<div>Loading...</div>);
    }

    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    // {/* <iframe className="embed-responsive-item" src={url}> </iframe> */ }
    // this big scary looking thing is just the structure of json from youtube
    const videoId = this.props.video.id.videoId;
    console.log(videoId);
    // use template string to build url for use in iframe
    // const url = `https://www.youtube.com/embed/${videoId}`;
    return (
        <div className="video-detail col-md-8">
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={this._onReady}
            />
          <div className="details">
            {/* data from props - structure of data retrieved from youtube - get title and description */}
            <div>{this.props.video.snippet.title}</div>
            <div>{this.props.video.snippet.description}</div>
          </div>
        </div>
    );
  }
}

export default VideoDetail;
