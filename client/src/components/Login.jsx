import React from 'react';

class Login extends React.Component {
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

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <h2>Username</h2>
        <label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameInputValueChange}/>
        </label>
        <h2>Password</h2>
        <label>
          <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordInputValueChange}/>
        </label>
        <div>
          <button type="button">Login</button>
        </div>
        <div>
          <button type="button" onClick={() => {this.props.renderSignup()}} >Sign Up</button>
        </div>
      </div>
    );
  }
}

export default Login;