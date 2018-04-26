import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Landing from './Landing.jsx';
import Workspacehub from './Workspacehub.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      isLoggedIn: false,
    } 
  }

  //before app mounts, send a reqest to confirm logged in state

  renderSignup() {
    this.setState({
      signup: true
    })
  }

  renderLogin() {
    this.setState({
      signup: false
    })
  }

  render() {
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <div>
            <Workspacehub/>
          </div>
          : 
          <div>
            {
              this.state.signup ?
              <div>
                <Signup renderLogin={this.renderLogin.bind(this)}/>
              </div>
              :
              <div>
                <Login renderSignup={this.renderSignup.bind(this)}/>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default App;