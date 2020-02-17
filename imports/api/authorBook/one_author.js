import React, { Component } from 'react';
// use link to go to another route
import { Link } from 'react-router-dom';

class OneAuthor extends Component {
  // ---------------------------------------------------------------------------
  constructor(props) {
    super(props);
  }
  // ---------------------------------------------------------------------------
  render() {
    //get the image url
    const imageUrl = this.props.author.avatar;
    const routeUrl = `/auth-book/${this.props.author._id}`;

    return (
        <li className="list-group-item">
          <Link to={routeUrl}>
            <div className="video-list media">
              <div className="media-left">
                <img className="media-object" src={imageUrl} />
              </div>
              <div className="media-body">
                <div className="media-heading">{this.props.author.name}</div>
              </div>
            </div>
          </Link>
        </li>
    );
  }
}

export default OneAuthor;
