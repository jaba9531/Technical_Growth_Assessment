const Models = require('./models');

const Controller = {
  team: {
    teams: (req, res) => {
      Models.team.teams((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
    usersOnTeam: (req, res) => {
      Models.team.usersOnTeam((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    }
  },
}

//if you get invited to a slack team it will show up in your team feed