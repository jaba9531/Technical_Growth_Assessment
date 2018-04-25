const express = require('express');
const parser = require('body-parser');
const router = require('./router');
const path = require('path');
const axios = require('axios');
const db = require('./DB');
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use('/api', router);

app.listen(3000, function() {
  console.log('Listening on port 3000');
})