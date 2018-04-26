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
          console.log(err);
        } else {
          res.status(200).send(results);
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
          res.status(200).send(results);
        }
      });
    },
  },
  channel: {
    teamChannelList: (req, res) => {
      Models.channel.teamChannelList('Micro Center', (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
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
          res.status(200).send(results);
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
          res.status(200).send(results);
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
      var user = req.body.user;
      var channel = req.body.channel;
      Models.message.addMessage(message, user, channel, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
  },
  user: {
    starChannel: (req, res) => {
      var user = req.body.user;
      var channel = req.body.channel;
      Models.user.starChannel(user, channel, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
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
          res.status(200).send(results);
        }
      });
    },
  },
}

module.exports = Controller;

//if you get invited to a slack team it will show up in your team feed