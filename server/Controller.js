const Models = require('./models');

const Controller = {
  team: {
    usersTeams: (req, res) => {
      Models.team.usersTeams('Patrick', (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
    allTeams: (req, res) => {
      Models.team.allTeams((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
    usersOnTeam: (req, res) => {
      var teamName = req.headers.teamname;
      Models.team.usersOnTeam('Micro Center', (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
    addTeam: (req, res) => {
      var newTeam = req.body.item;
      Models.team.addTeam(newTeam, (err, results) => {
        if (err) {
          console.log('anything!');
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      });
    },
    addUser: (req, res) => {
      var newUser = req.body.user;
      var team = req.body.team;
      Models.team.addUser(newUser, team, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      });
    },
  },
  channel: {
    teamChannelList: (req, res) => {
      var teamName = req.headers.teamname;
      Models.channel.teamChannelList(teamName, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.set('name', req.session.passport.user).status(200).send(results);
        }
        //first I should just write this to get
        //channels of some specific team
      })
    }, 
    addChannel: (req, res) => {
      var newChannel = req.body.channel;
      var team = req.body.team;
      Models.channel.addChannel(newChannel, team, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      });
    },
    addUser: (req, res) => {
      var newUser = req.body.user;
      var channel = req.body.channel;
      Models.channel.addUser(newUser, channel, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      });
    },
    usersInChannel: (req, res) => {
      var channel = 'Factorio';
      Models.channel.usersInChannel(channel, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
  }, 
  message: {
    addMessage: (req, res) => {
      var message = req.body.message;
      var user = req.session.passport.user;
      var channel = req.body.channel;
      console.log(channel);
      Models.message.addMessage(message, user, channel, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      });
    },
    messages: (req, res) => {
      var channelName = req.headers.channelname;
      Models.message.messages(channelName, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      })
    }
  },
  user: {
    signup: (req, res) => {
      Models.user.signup(req, res, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      })
    },
    login: (req, res, next) => {
      Models.user.login(req, res, next, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      })
    },
    logout: (req, res) => {
      Models.user.logout(req, res, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      })
    },
    checkLoginStatus: (req, res) => {
      Models.user.checkLoginStatus(req, res, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      })
    },
    starChannel: (req, res) => {
      var user = req.body.user;
      var channel = req.body.channel;
      Models.user.starChannel(user, channel, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      });
    },
    starMessage: (req, res) => {
      var user = req.body.user;
      var message = req.body.message;
      Models.user.starMessage(user, message, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(202).send(results);
        }
      });
    },
  },
}

module.exports = Controller;

//if you get invited to a slack team it will show up in your team feed

// INSERT INTO teams(teamname)
// Values ('Brethren Studios');

// INSERT INTO teams(teamname)
// Values ('Hack Reactor');

// INSERT INTO teams(teamname)
// Values ('Micro Center');

// INSERT INTO channels(channelname, teamsid)
// Values ('General', (select id from teams where teamname = 'Brethren Studios'));

// INSERT INTO channels(channelname, teamsid)
// Values ('HRLA21', (select id from teams where teamname = 'Hack Reactor'));

// INSERT INTO channels(channelname, teamsid)
// Values ('PUBG', (select id from teams where teamname = 'Micro Center'));

// INSERT INTO channels(channelname, teamsid)
// Values ('Factorio', (select id from teams where teamname = 'Micro Center'));

// INSERT INTO users(username)
// Values ("Gus");

// INSERT INTO users(username)
// Values ("Jake");

// INSERT INTO users(username)
// Values ("David");

// INSERT INTO users(username)
// Values ("Evan");

// INSERT INTO users(username)
// Values ("Ben");

// INSERT INTO users(username)
// Values ("Robert");

// INSERT INTO users(username)
// Values ("Tanner");

// INSERT INTO users(username)
// Values ("Patrick");

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Brethren Studios'), (SELECT id from users where username = 'Jake'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Brethren Studios'), (SELECT id from users where username = 'David'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Brethren Studios'), (SELECT id from users where username = 'Evan'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Hack Reactor'), (SELECT id from users where username = 'Jake'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Hack Reactor'), (SELECT id from users where username = 'Patrick'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Hack Reactor'), (SELECT id from users where username = 'Gus'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Micro Center'), (SELECT id from users where username = 'Jake'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Micro Center'), (SELECT id from users where username = 'Evan'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Micro Center'), (SELECT id from users where username = 'David'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Micro Center'), (SELECT id from users where username = 'Ben'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Micro Center'), (SELECT id from users where username = 'Tanner'));

// INSERT INTO teamusers(teamid, userid)
// VALUES ((SELECT id from teams where teamname = 'Micro Center'), (SELECT id from users where username = 'Robert'));