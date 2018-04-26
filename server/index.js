const express = require('express');
const parser = require('body-parser');
const router = require('./router');
const path = require('path');
const axios = require('axios');
const db = require('./DB');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const bcrypt = require('bcrypt');
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../client/dist')));

var options = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'slacker'
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'pubg is better than fortnite',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);

passport.use(new LocalStrategy(
  function (username, password, done) {
    db.query('select password from users where username = ?', [username],
    function(err, results) {
      if (err) {done(err)}
        if (results.length  === 0) {
          return done(null, false);
        }
        const hash = results[0].password.toString();
        bcrypt.compare(password, hash, function(err, response) {
        if (response === true) {
          return done(null, username);
        } else {
          return done(null, false);
        }
      });
    }
    )
  }
))

app.listen(3000, function() {
  console.log('Listening on port 3000');
})