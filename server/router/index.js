const router = express.Router();
const Controller = require('../Controller');

router.post('/signup', (req, res) => {
    Controller.signup(req, res);
})

router.get('/teamlist', Controller.team.teams);
router.get('/usersonteam', Controller.team.usersOnTeam);
router.post('/addteam', Controller.team.addTeam);

router.get('/channellist', Controller.channel.teamChannelList);
router.post('/addchannel', Controller.channel.addChannel);
router.post('/starchannel', Controller.channel.star);

router.get('/messages', Controller.message.messages);
router.post('/addreaction', Controller.message.addReaction);
router.post('/starmessage', Controller.message.star);

router.get('/stars', Controller.user.stars);




