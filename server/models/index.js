const db = require('../DB');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');

const Models = {
  team: {
    usersTeams: (currentUser, cb) => {
      var query = `select teamname from teams where id in (select teamid from teamusers where userid in (select id from users where username=${JSON.stringify(currentUser)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    allTeams: (cb) => {
      var query = 'select * from teams';
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    usersOnTeam: (teamname, cb) => {
      var query = `select username from users where id in (select userid from teamusers where teamid in (select id from teams where teamname=${JSON.stringify(teamname)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    addTeam: (teamName, cb) => {
      var query = `INSERT IGNORE INTO teams(teamname) Values (${JSON.stringify(teamName)})`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    addUser: (newUser, team, cb) => {
      var query = `INSERT INTO teamusers(teamid, userid) Values ((select id from teams where teamname=${JSON.stringify(team)}), (select id from users where username=${JSON.stringify(newUser)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
  },
  channel: {
    teamChannelList: (teamName, cb) => {
      var query = `select channelname from channels where teamsid in (select id from teams where teamname=${JSON.stringify(teamName)})`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    addChannel: (channelName, teamName, cb) => {
      var query = `INSERT INTO channels(channelname, teamsid) Values (${JSON.stringify(channelName)}, (select id from teams where teamname=${JSON.stringify(teamName)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    addUser: (newUser, channel, cb) => {
      var query = `INSERT INTO channelusers(userid, channelid) Values ((select id from users where username=${JSON.stringify(newUser)}), (select id from channels where channelname=${JSON.stringify(channel)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    usersInChannel: (channel, cb) => {
      var query = `select username from users where id in (select userid from channelusers where channelid in (select id from channels where channelname=${JSON.stringify(channel)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    }
  },
  message: {
    addMessage: (message, user, channel, cb) => {
      var query = `insert into messages (textfield, channelid, userid) values (${JSON.stringify(message)}, (select id from channels where channelname = ${JSON.stringify(channel)}), (select id from users where username = ${JSON.stringify(user)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    messages: (channel, cb) => {
      var query = `select * from messages as m inner join users as u on m.userid = u.id inner join channels as c where m.channelid = c.id and c.channelname = ${JSON.stringify(channel)} order by m.id`;
      // ${JSON.stringify(channel)}
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    }
  },
  user: {
    signup: (req, res, cb) => {
      var username = req.body.username;
      var password = req.body.password;
      bcrypt.hash(password, saltRounds, function(err, hash) {
        var uniqueUserQuery = `select username from users where username = ${JSON.stringify(username)}`;
        db.query(uniqueUserQuery, (err, results) => {
          if (results.length < 1) {
            var query = `INSERT INTO users (username, password) VALUES (${JSON.stringify(username)}, ${JSON.stringify(hash)})`;
            db.query(query, (err, results) => {
              if (err) {
                throw err;
              }
              cb (null, 'success');
            })
          } else {
            cb(err, 'taken');
          }
        })
      })
    },
    login: (req, res, next, cb) => {
      passport.authenticate('local', (err, user, info) => {
        console.log(err, 'err', user, 'user', info, 'info');
        if (err) {
          cb(err, 'error');
        } else if (info) {
          cb(null, 'unauthorized');
        } else {
          req.login(user, (err) => {
            if (err) {
              res.status(200).send('failed');
            } else {
              cb(null, user);
            }
          })
        }
      })(req, res, next);
      passport.serializeUser(function(id, done) {
        done(null, id);
      });
      
      passport.deserializeUser(function(id, done) {
        done(null, id);
      });
    },
    logout: (req, res, cb) => {
      req.logout(); 
      req.session.destroy();
      res.status(202).send('destroyed');
      passport.serializeUser(function(id, done) {
        done(null, id);
      });
      
      passport.deserializeUser(function(id, done) {
        done(null, id);
      });
    },
    checkLoginStatus: (req, res, cb) => {
      console.log(req.session, '$$$$$$$$$$$$$');
      if (req.session.hasOwnProperty('passport')) {
        cb(null, 'confirmed');
      } else {
        cb(null, 'denied');
      }
    },
    starChannel: (user, channel, cb) => {
      var query = `insert into stars (channelid, userid) values ((select id from channels where channelname = ${JSON.stringify(channel)}), (select id from users where username = ${JSON.stringify(user)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, results);
      })
    },
    starMessage: (user, message, cb) => {
      var query = `insert into stars (messageid, userid) values ((select id from messages where textfield = ${JSON.stringify(message)}), (select id from users where username = ${JSON.stringify(user)}))`;
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        cb(null, message);
      })
    },
  }
}

module.exports = Models;

// create an account (username and password)
// on login, you are brought to a page where you can join a team or make a team
// if you join a team, you will become a member of the team
// you have to join a team before you can access it
// there should be a list of existing teams to join