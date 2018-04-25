import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import Landing from './Landing.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      isLoggedIn: localStorage.isLoggedIn,
    }
  }

  //before app mounts, send a reqest to confirm logged in state
  render() {
    console.log(localStorage);
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <div>
            <Landing/>
          </div>
          : 
          <div>
            {
              this.state.signup ?
              <div>
                <Signup/>
              </div>
              :
              <div>
                <Login/>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default App;