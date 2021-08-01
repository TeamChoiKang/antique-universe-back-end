//setting
require('./package/pathAlias');
require('@/package/env');

const webServer = require('@/package/webServer');
const app = webServer();

//middleware
require('@/middleware/json')(app);
require('@/middleware/cors')(app);
require('@/routes')(app);

const server = require('http').createServer(app);

const startSocket = require('./socket');
startSocket(server);

server.listen(3001, () => {
  console.log('Socket IO server listening on port 3001');
});
