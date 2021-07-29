require('module-alias/register');

const app = require('express')();
const cors = require('cors');

app.use(cors());

const server = require('http').createServer(app);

const startSocket = require('./socket');

startSocket(server);

server.listen(3001, () => {
  console.log('Socket IO server listening on port 3001');
});
