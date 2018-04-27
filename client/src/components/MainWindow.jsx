import React from 'react';
import axios from 'axios';

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: '',
      channels: [],
      channel: '',
      messageinput: '',
      messages: []
    }
    this.handleMessageInputValueChange = this.handleMessageInputValueChange.bind(this);
    this.handleChannelNameDivClick = this.handleChannelNameDivClick.bind(this);
  }

  componentWillMount() {
    var team = this.props.team;
    var channels = [];
    console.log(this.props.team, 'teamnameincomponentwillmountinmainwindow');
    axios.get('http://localhost:3000/api/channellist', {headers : { 'teamname' : team }})
    .then((response) => {
      console.log(response.data, 'teamchannelsresponse');
      for (var i = 0; i < response.data.length; i++) {
        channels.push(response.data[i].channelname);
      }
      this.setState({team: team, channels: channels});
      console.log(channels);
    })
    .catch (err => {
      console.log(err);
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

  handleMessageInputValueChange(e) {
    this.setState({messageinput: e.target.value});
    console.log(this.state.messageinput);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmitMessageButtonClick();
    }
  }

  handleSubmitMessageButtonClick() {
    console.log('click!');
    var payload = {message: this.state.messageinput, channel: this.state.channel};
    axios.post('http://localhost:3000/api/addmessage', payload)
    .then((response) => {
      var messages = this.state.messages;
      messages.push(this.state.messageinput);
      this.setState({messages: messages, messageinput: ''});
    })
    .catch (err => {
      console.log(err);
    })
  }

  handleChannelNameDivClick(e) {
    console.log(e);
    console.log('click!');
    var messages = [];
    axios.get('http://localhost:3000/api/channelmessages', {headers : { 'channelname' : e }})
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        messages.push(response.data[i].textfield);
      }
      console.log(response.data);
      this.setState({channel: e, messages: messages});
    })
    .catch (err => {
      console.log(err);
    })
  }

  render() {
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
        {
          this.state.channel.length > 0 ?
          <div>  
            {this.state.channel}
          </div>
          :
          <div>
            No Channel Selected
          </div>
        }
        </div>
        <div id="rightmiddle">
          {
            this.state.messages.map(value => 
              <div value={value} key={Math.floor((Math.random() * 1000000) + 1)}>
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
          </div>
          :
          <div>
          </div>
        }
        </div>
      </div>
    );
  }
}
  
export default MainWindow;
