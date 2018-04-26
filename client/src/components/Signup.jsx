import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleUsernameInputValueChange = this.handleUsernameInputValueChange.bind(this);
    this.handlePasswordInputValueChange = this.handlePasswordInputValueChange.bind(this);
  }

  handleUsernameInputValueChange(e) {
    this.setState({username: e.target.value});
    console.log(this.state.username);
  }

  handlePasswordInputValueChange(e) {
    this.setState({password: e.target.value});
    console.log(this.state.password);
  }

  handleSignupButtonClick() {
    var payload = {username: this.state.username, password: this.state.password};
    axios.post('http://localhost:3000/api/usersignup/', payload)
    .then((response) => {
      if (response.data === 'taken') {
        this.setState({toggleUsernameTakenMessage: true});
        this.setState({toggleAccountSuccessfullyCreatedMessage: false});
        console.log('username already taken');
      } else {
        this.setState({toggleUsernameTakenMessage: false});
        this.setState({toggleAccountSuccessfullyCreatedMessage: true});
        console.log('Account successfully created');
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Signup Page</h1>
        <h2>Username</h2>
        <label>
          <input type="text" name="username" maxLength="25" value={this.state.username} onChange={this.handleUsernameInputValueChange}/>
        </label>
        <h2>Password</h2>
        <label>
          <input type="text" name="password" maxLength="25" value={this.state.password} onChange={this.handlePasswordInputValueChange}/>
        </label>
        <div>
          <div>
            <button type="button" onClick={() => {this.handleSignupButtonClick()}} >Create Account</button>
          </div>
          <div>
            <button type="button" onClick={() => {this.props.renderLogin()}}>Back to Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;