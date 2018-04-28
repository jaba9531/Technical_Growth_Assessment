import React from 'react';
import axios from 'axios';
import MainWindow from './MainWindow.jsx';

class Workspacehub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamname: '',
      teams: [1, 2, 3],
      hubview: true,
      currentteam: '',
    }
    this.handleTeamnameInputValueChange = this.handleTeamnameInputValueChange.bind(this);
    this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
    this.handleCreateTeamButtonClick = this.handleCreateTeamButtonClick.bind(this);
  }

  handleLogoutButtonClick() {
    axios.post('http://localhost:3000/api/userlogout/')
    .then((response) => {
      this.props.logoutStatusUpdater();
    })
  }

  handleTeamnameInputValueChange(e) {
    this.setState({teamname: e.target.value});
  }

  handleJoinButtonClick(value) {
    this.setState({currentteam: value, hubview: false});
  }

  hubViewRender() {
    this.setState({hubview: true});
  }

  handleCreateTeamButtonClick() {
    var payload = {item: this.state.teamname}
    axios.post('http://localhost:3000/api/addteam', payload)
    .then((response) => {
      axios.get('http://localhost:3000/api/userteamlist')
      .then((response) => {
        var teamList = [];
        for (var i = 0; i < response.data.length; i++) {
          teamList.push(response.data[i]);
        }
        this.setState({teams: teamList, teamname: ''});
      })
      .catch( err => {
        console.log(err);
        done();
      })
    })
    .catch( err => {
      console.log(err);
      done();
    })
  }

  componentWillMount() {
    axios.get('http://localhost:3000/api/userteamlist')
    .then((response) => {
      var teamList = [];
      for (var i = 0; i < response.data.length; i++) {
        teamList.push(response.data[i]);
      }
      this.setState({teams: teamList});
    })
    .catch( err => {
      console.log(err);
      done();
    })
  }

  handleCreateTeamKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleCreateTeamButtonClick();
    }
  }

  render() {
    return(
      <div>
        {
          this.state.hubview === true ?
          <div>
            <h1>Workspace Hub</h1>
            <h4>Here you can make a team, or join a team that you have been invited to.</h4>
            <h4>Create Team</h4>
            <label>
              <input type="text" name="teamname" value={this.state.teamname} onChange={this.handleTeamnameInputValueChange} onKeyPress={(e) => this.handleCreateTeamKeyPress(e)}/>
            </label>
            <div>
              <button type="button" onClick={this.handleCreateTeamButtonClick}>Create!</button>
            </div>
            <h4>Join Team</h4>
              {
                this.state.teams.map(value =>
                  <div key={Math.floor((Math.random() * 1000000) + 1)}>
                    <span>
                    {value.teamname}
                    </span>
                    <button value={value.teamname} onClick={()=>this.handleJoinButtonClick(value.teamname)}>join</button>
                  </div>
                )
              }
            <div>
              <button type="button" onClick={this.handleLogoutButtonClick}>Logout</button>
            </div>
          </div>
          :
          <div>
            <MainWindow team={this.state.currentteam} hubViewRender = {this.hubViewRender.bind(this)}/>
          </div>
        }
      </div>
    );
  }
}

export default Workspacehub;