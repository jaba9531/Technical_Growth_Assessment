import React from 'react';
import axios from 'axios';

class Workspacehub extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Workspace Hub</h1>
        <h2>Here you can make a team, or join a team that you are a member of</h2>
        <div>
          <button type="button">Logout</button>
        </div>
      </div>
    );
  }
}

export default Workspacehub;