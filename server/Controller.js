const Models = require('./models');

const Controller = {
  team: {
    usersTeams: (req, res) => {
      Models.team.usersTeams(req.session.passport.user, (err, results) => {
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
      Models.team.usersOnTeam(teamName, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
    addTeam: (req, res) => {
      var newTeam = req.body.item;
      var user = req.session.passport.user;
      Models.team.addTeam(newTeam, user, (err, results) => {
        if (err) {
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