const mysql = require('mysql');
const mocha = require('mocha');
const request = require('request');
const expect = require('chai').expect;
const axios = require('axios');
const assert = require('assert');

/*Please drop database before running tests!
  to run tests, run the following command in the terminal: 
    mocha server/spec/serverspec.js
*/

describe ('Slacker Server', function() {
  var connection;

  beforeEach(function(done) {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'slacker'
    });
    connection.connect((err) => {
      if (err) {
        throw err;
      }
    });
    done();
  });

  afterEach(function() {
    connection.end();
  })

  it('Should add a team to the DB', function(done) {
    var team = {item: 'Hack Reactor'};
    axios.post('http://localhost:3000/api/addteam', team)
    .then( response => {
      var query = 'SELECT * FROM teams';
      connection.query(query, function(err, results) {
        assert.equal(results.length, 1);
        assert.equal(results[0].teamname, 'Hack Reactor');
        done();
      });
    })
    .catch( err => {
      console.log(err);
      done();
    })
  });

  it('Should add a user to a team', function(done) {
    var queryuser = `insert into users(username) values (${JSON.stringify('Jake')})`;
    connection.query(queryuser, function(results) {
      var user = {team: 'Hack Reactor', user: 'Jake'};
      var team = 'Hack Reactor';
      axios.post('http://localhost:3000/api/adduserteam', user)
      .then( response => {
        var query = `select username from users where id = (select userid from teamusers where teamid = (select id from teams where teamname=${JSON.stringify('Hack Reactor')}))`;
        connection.query(query, function(err, results) {
          assert.equal(results[0].username, 'Jake');
          done();
        })
      })
      .catch( err => {
        console.log(err);
        done();
      })
    })
  });

  it('Should get all teams from the DB', function(done) {
    var team = {item: 'Micro Center'};
    axios.post('http://localhost:3000/api/addteam', team)
    .then( response => {
      var query = 'SELECT * FROM teams';
      connection.query(query, function(err, results) {
        assert.equal(results[results.length - 1].teamname, 'Micro Center');
        assert.equal(results.length, 2);
        done();
      });
    })
    .catch( err => {
      console.log(err);
      done();
    })
  });

  it('Should add a channel to a team', function(done) {
    var channel = {channel: 'Factorio', team: 'Micro Center'};
    axios.post('http://localhost:3000/api/addchannel', channel)
    .then( response => {
      var query = 'select channelname from channels where teamsid = 2';
      connection.query(query, function(err, results) {
        assert.equal(results[0].channelname, 'Factorio');
        done();
      })
    })
    .catch( err => {
      console.log(err);
      done();
    })
  });

  it ('Should add a user to a channel', function(done) {
    var channel = {channel: 'Factorio', user: 'Jake'};
    axios.post('http://localhost:3000/api/adduserchannel', channel)
    .then( response => {
      var query = `select username from users where id = (select userid from channelusers where channelid = (select id from channels where channelname=${JSON.stringify('Factorio')}))`;
      connection.query(query, function(err, results) {
        assert.equal(results[0].username, 'Jake');
        done();
      });
    })
    .catch( err => {
      console.log(err);
      done();
    })
  })

  it ('Should get all channels from the DB', function(done) {
    var channel = {channel: 'Minecraft', team: 'Micro Center'};
    axios.post('http://localhost:3000/api/addchannel', channel)
    .then(response => {
      var query = 'select channelname from channels where teamsid = 2';
      connection.query(query, function(err, results) {
        assert.equal(results.length, 2);
        assert.equal(results[results.length - 1].channelname, 'Minecraft');
        done();
      })
    })
    .catch(err => {
      console.log(err);
      done();
    })
  })

  it ('Should get all users in a channel', function(done) {
    var queryuser = `insert into users(username) values (${JSON.stringify('Evan')})`;
    connection.query(queryuser, function(err, results) {
      var channel = {channel: 'Factorio', user: 'Evan'};
      axios.post('http://localhost:3000/api/adduserchannel', channel)
      .then( response => {
        var query = 'select * from channelusers';
        connection.query(query, function(err, results) {
          assert.equal(results.length, 2);
          assert.equal(results[results.length - 1].userid, 2);
          done();
        });
      })
      .catch( err => {
        console.log(err);
        done();
      })
    })  
  })

  it ('Should add a message to a channel', function(done) {
    var message = {user: 'Jake', message: 'I love this game!', channel: 'Factorio'};
    axios.post('http://localhost:3000/api/addmessage', message)
    .then (response => {
      var query = 'select * from messages';
      connection.query(query, function(err, results) {
        assert.equal(results.length, 1);
        assert.equal(results[0].textfield, 'I love this game!');
        assert.equal(results[0].userid, 1);
        assert.equal(results[0].channelid, 1);
        done();
      })
    })
    .catch( err => {
      console.log(err);
      done();
    })
  })

  it ('Should star a message for a user', function(done) {
    var message = {user: 'Jake', message: 'I love this game!'};
    axios.post('http://localhost:3000/api/starmessage', message)
    .then (response => {
      var query = 'select * from stars';
      connection.query(query, function(err, results) {
        assert.equal(results.length, 1);
        assert.equal(results[0].userid, 1);
        assert.equal(results[0].messageid, 1);
        done();
      })
    })
    .catch (err => {
      console.log(err);
      done();
    })
  })

  it ('Should star a channel for a user', function(done) {
    var channel = {user: 'Jake', channel: 'Factorio'};
    axios.post('http://localhost:3000/api/starchannel', channel)
    .then (response => {
      var query = 'select * from stars';
      connection.query(query, function(err, results) {
        assert.equal(results.length, 2);
        assert.equal(results[1].userid, 1);
        assert.equal(results[1].channelid, 1);
        done();
      })
    })
    .catch (err => {
      console.log(err);
      done();
    })
  })
});