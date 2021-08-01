require('./package/pathAlias');
require('./package/env');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const server = require('http').createServer(app);

const auth = require('@/routes/auth');
app.use(auth);

const startSocket = require('./socket');
startSocket(server);

server.listen(3001, () => {
  console.log('Socket IO server listening on port 3001');
});
