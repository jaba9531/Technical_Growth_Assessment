import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: '',
      channels: [],
      channel: '',
      messageinput: '',
      messages: [],
      usernames: [],
      loggedInUser: '',
      friendinput: '',
      teammembers: [],
    }
    this.socket = io('http://localhost:5000');
    this.handleMessageInputValueChange = this.handleMessageInputValueChange.bind(this);
    this.handleChannelNameDivClick = this.handleChannelNameDivClick.bind(this);
    this.handleFriendInputValueChange = this.handleFriendInputValueChange.bind(this);
  }

  componentWillMount() {
    var team = this.props.team;
    var channels = [];
    var loggedInUser;
    var usersonteam = [];
    axios.get('http://localhost:3000/api/channellist', {headers : { 'teamname' : team }})
    .then((response) => {
      loggedInUser = response.headers.name;
      for (var i = 0; i < response.data.length; i++) {
        channels.push(response.data[i].channelname);
      }
      axios.get('http://localhost:3000/api/usersonteam', {headers : { 'teamname' : team }})
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          usersonteam.push(response.data[i].username);
        }
        console.log(usersonteam);
        this.setState({team: team, channels: channels, loggedInUser: loggedInUser, teammembers: usersonteam});
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch (err => {
      console.log(err);
    }) 
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      console.log('connect$$$$$$ componentdidmount');
    });
    this.socket.on('servermessage', (msg) => {
      console.log('inside componentdidmount');
      if (msg.channel === this.state.channel) {
        var messages = this.state.messages;
        var usernames = this.state.usernames;
        console.log(msg, 'msg in didmount ');
        messages.unshift(msg.message);
        usernames.unshift(msg.user);
        this.setState({messages: messages, usernames: usernames, messageinput: ''});
      }
    })
  }

  handleNewChannelButtonClick() {
    console.log('click!');
    var channelInput = window.prompt('Enter a new channel name: '); 
    console.log(channelInput);
    if (channelInput !== null) {
      if (channelInput.length > 0 && channelInput.length < 26) {
        var payload = {team: this.state.team, channel: channelInput};
        axios.post('http://localhost:3000/api/addchannel', payload)
        .then((response) => {
          var channels = this.state.channels;
          channels.push(channelInput);
          this.setState({channels: channels});
        })
        .catch (err => {
          console.log(err);
        })
      } else if (channelInput.length === 0) {
        alert("Too short! Please enter some characters.");
      } else if (channelInput.length > 25) {
        alert("Too long! Please choose a shorter channel name.");
      }
    }
  }

  handleSubmitFriendButtonClick() {
    var payload = {user: this.state.friendinput, team: this.state.team};
    axios.post('http://localhost:3000/api/adduserteam', payload)
    .then((response) => {
      var arr = this.state.teammembers;
      arr.unshift(this.state.friendinput);
      this.setState({friendinput: '', teammembers: arr});
    })
  }

  handleMessageInputValueChange(e) {
    this.setState({messageinput: e.target.value});
    console.log(this.state.messageinput);
  }

  handleFriendInputValueChange(e) {
    this.setState({friendinput: e.target.value});
    console.log(this.state.friendinput);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmitMessageButtonClick();
    }
  }

  handleFriendKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmitFriendButtonClick();
    }
  }

  handleSubmitMessageButtonClick() {
    console.log('click!');
    //emit 'send-message', (msg)
    this.socket.emit('message', {message: this.state.messageinput, channel: this.state.channel, user: this.state.loggedInUser});
    var payload = {message: this.state.messageinput, channel: this.state.channel};
    axios.post('http://localhost:3000/api/addmessage', payload)
    .then((response) => {
      console.log('response');
    })
    .catch (err => {
      console.log(err);
    })
  }

  handleChannelNameDivClick(e) {
    console.log(e);
    console.log('click!');
    var messages = [];
    var usernames = [];
    axios.get('http://localhost:3000/api/channelmessages', {headers : { 'channelname' : e }})
    .then((response) => {
      for (var i = response.data.length - 1; i >= 0; i--) {
        console.log(response, 'messages response here!');
        messages.push(response.data[i].textfield);
        usernames.push(response.data[i].username);
        console.log(this.state.messages, 'state of messages');
      }
      console.log(response.data);
      this.setState({channel: e, messages: messages, usernames: usernames});
    })
    .catch (err => {
      console.log(err);
    })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div id="left">
          <div className="teamNameBox">
            {this.state.team}
          </div>
          <div className="channelBox">
          <span>
            Channels
          </span>
          <span className="addChannelIcon" onClick={() => {this.handleNewChannelButtonClick()}}><a href="#"><i className="fa fa-plus fa-lg"></i></a></span>
          </div>
          <div>
            {
              this.state.channels.map(value => 
                <div value={value} key={Math.floor((Math.random() * 1000000) + 1)} onClick={() => {this.handleChannelNameDivClick.call(null, value)}}>
                <div className="channelTitle">
                <div className="overlay"></div>
                  {value}
                </div>
                </div>
              )
            }
          </div>
        </div>
        <div id="right">
        <div className="channelname">
          {
            this.state.channel.length > 0 ?
            <span className="channelname">  
              {this.state.channel}
              <span className="teammemberlistbox">
                Team Members
                <div className="membername">
                {
                  this.state.teammembers.map(value => 
                    <div key={Math.floor((Math.random() * 1000000) + 1)}>
                      {value}
                    </div>
                  )
                }
              </div>
              </span>
            </span>
            :
            <span className="channelname">
              Select or make a channel to get started!
            <span className="teammemberlistbox">
              Team Members
              <div className="membername">
                {
                  this.state.teammembers.map(value => 
                    <div key={Math.floor((Math.random() * 1000000) + 1)}>
                      {value}
                    </div>
                  )
                }
              </div>
            </span>
          </span> 
          }
        </div>
        </div>
        <div id="rightmiddle">
          {
            this.state.messages.map((value, i) => 
              <div className="messagebox" value={value} key={Math.floor((Math.random() * 1000000) + 1)}>
                <div className="messageUsername">{this.state.usernames[i]}</div>
                <div className="message">
                  {value}
                </div>
              </div>
            )
          }
        </div>
        <div id="rightbottom">
        {
          this.state.channel.length > 0 ?
          <div>
          <label>
            <input id="messageInput" type="text" value={this.state.messageinput} onKeyPress={(e) => this.handleKeyPress(e)} onChange={this.handleMessageInputValueChange}/>
            <button onClick={() => {this.handleSubmitMessageButtonClick()}}>Submit</button>
          </label>
          <label id="inviteFriendInput">
            <input type="text" value={this.state.friendinput} onKeyPress={(e) => this.handleFriendKeyPress(e)} onChange={this.handleFriendInputValueChange}/>
            <button onClick={() => {this.handleSubmitFriendButtonClick()}}>Invite Friend</button>
          </label>   
          </div>
          :
          <div>
            <label id="inviteFriendInput">
              <input type="text" value={this.state.friendinput} onKeyPress={(e) => this.handleFriendKeyPress(e)} onChange={this.handleFriendInputValueChange}/>
              <button onClick={() => {this.handleSubmitFriendButtonClick()}}>Invite Friend</button>
            </label>
          </div>
        }
          <div>
            <button onClick={() => {this.props.hubViewRender()}} id="backhubbutton">Back to Hub</button>
          </div>
        </div>
      </div>
    );
  }
}
  
export default MainWindow;
