import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';

import { Knight } from '../collections/knight';

class KnightContainer extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        knight_info: Meteor.subscribe('knightpub') // get all the mystery writers
      },
    };
  }
  //----------------------------------------------------------------
  componentWillUnmount() {
    this.state.subscription.knight_info.stop();
  }
  //----------------------------------------------------------------
  knightInfo() {
    return Knight.find({}).fetch();
  }
  //----------------------------------------------------------------
  render() {
    if (!this.knightInfo()) return (
         <div>Loading...</div>
      );
    // get all authors
    const vKnight = this.knightInfo();
    console.log(vKnight);

    return (
        <div>
          <section className="main">
            <div className="container">Hello</div>
          </section>
        </div>
    );
  }
}

export default KnightContainer;
