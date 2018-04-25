CREATE DATABASE IF NOT EXISTS slacker;
USE slacker;
CREATE TABLE IF NOT EXISTS teams (
  id int not null AUTO_INCREMENT,
  teamname varchar(25),
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS users (
  id int not null AUTO_INCREMENT,
  username varchar(25),
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS teamusers (
  id int not null AUTO_INCREMENT,
  teamid int,
  userid int,
  PRIMARY KEY (id),
  FOREIGN KEY (teamid) references teams(id),
  FOREIGN KEY (userid) references users(id)
);
CREATE TABLE IF NOT EXISTS comments (
  id int not null AUTO_INCREMENT,
  textfield varchar(25),
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS attachments (
  id int not null AUTO_INCREMENT,
  attachment varchar(10),
  commentsid int,
  PRIMARY KEY (id),
  FOREIGN KEY (commentsid) references comments(id)
);
CREATE TABLE IF NOT EXISTS messages (
  id int not null AUTO_INCREMENT,
  textfield varchar(100),
  reactions varchar(25),
  attachmentsid int,
  userid int,
  PRIMARY KEY (id),
  FOREIGN KEY (attachmentsid) REFERENCES attachments(id),
  FOREIGN KEY (userid) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS channels (
  id int not null AUTO_INCREMENT,
  channelname varchar(25),
  teamsid int,
  usersid int,
  messageid int,
  PRIMARY KEY (id),
  FOREIGN KEY (messageid) REFERENCES messages(id),
  FOREIGN KEY (teamsid) REFERENCES teams(id),
  FOREIGN KEY (usersid) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS stars (
  id int not null AUTO_INCREMENT,
  channelid int,
  userid int,
  messageid int,
  PRIMARY KEY (id),
  FOREIGN KEY (channelid) references channels(id),
  FOREIGN KEY (userid) references users(id),
  FOREIGN KEY (messageid) references messages(id)
);
CREATE TABLE IF NOT EXISTS reactions (
  id int not null AUTO_INCREMENT,
  emoji varchar(25),
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS messagesreactions (
  id int not null AUTO_INCREMENT,
  messageid int,
  reactionid int,
  PRIMARY KEY (id),
  FOREIGN KEY (messageid) references messages(id),
  FOREIGN KEY (reactionid) references reactions(id)
);

INSERT INTO teams(teamname)
Values ('Brethren Studios');

INSERT INTO channels(channelname, teamsid)
Values ('General', (select id from teams where teamname = 'Brethren Studios'));

INSERT INTO users(username)
Values ("Gus");

INSERT INTO users(username)
Values ("Jake");

INSERT INTO users(username)
Values ("Nyancat");

INSERT INTO teamusers(teamid, userid)
VALUES ((SELECT id from teams where teamname = 'Brethren Studios'), (SELECT id from users where username = 'Jake'));

--create an account (username and password)
--on login, you are brought to a page where you can join a team or make a team
--if you join a team, you will become a member of the team
--you have to join a team before you can access it
--there should be a list of existing teams to join


