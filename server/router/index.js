const express = require('express');
const router = express.Router();
const Controller = require('../Controller');

/*-----------Team Routes------------------------*/

router.get('/userteamlist', Controller.team.usersTeams);
router.get('/allteams', Controller.team.allTeams);
router.get('/usersonteam', Controller.team.usersOnTeam);
router.post('/addteam', Controller.team.addTeam);
router.post('/adduserteam', Controller.team.addUser);

/*-----------Channel Routes------------------------*/

router.get('/channellist', Controller.channel.teamChannelList);
router.get('/userchannellist', Controller.channel.usersInChannel);
router.post('/addchannel', Controller.channel.addChannel);
router.post('/adduserchannel', Controller.channel.addUser);

/*-----------User Routes------------------------*/

router.get('/checkloginstatus', Controller.user.checkLoginStatus);
router.post('/usersignup', Controller.user.signup);
router.post('/userlogin', Controller.user.login);
router.post('/userlogout', Controller.user.logout);
router.post('/starchannel', Controller.user.starChannel);
router.post('/starmessage', Controller.user.starMessage);

/*-----------Message Routes------------------------*/
router.post('/addmessage', Controller.message.addMessage);
router.get('/channelmessages', Controller.message.messages);




// router.get('/messages', Controller.message.messages);
// router.post('/addreaction', Controller.message.addReaction);
// router.get('/stars', Controller.user.stars);

module.exports = router;




