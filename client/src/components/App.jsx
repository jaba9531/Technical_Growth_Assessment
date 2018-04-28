import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Workspacehub from './Workspacehub.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      isLoggedIn: false,
      view: '',
      loggedInUser: '',
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

  loginStatusUpdater() {
    this.setState({isLoggedIn: true});
  }

  logoutStatusUpdater() {
    this.setState({isLoggedIn: false});
  }

  componentWillMount() {
    //make request to server to check login state
    axios.get('http://localhost:3000/api/checkloginstatus/')
    .then((response) => {
      if (response.data === 'confirmed') {
        this.setState({isLoggedIn: true});
      }
    })
  }

  render() {
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <div>
            <Workspacehub logoutStatusUpdater={this.logoutStatusUpdater.bind(this)}/>
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
                <Login loginStatusUpdater = {this.loginStatusUpdater.bind(this)} renderSignup={this.renderSignup.bind(this)}/>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default App;