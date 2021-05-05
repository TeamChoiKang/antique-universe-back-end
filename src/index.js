const app = require('express')();
const cors = require('cors');

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

let characters = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  characters[socket.id] = {
    xCoordinate: 450,
    yCoordinate: 350,
    animation: 'turn',
    socketId: socket.id,
  };

  socket.emit('currentCharacter', characters);

  socket.broadcast.emit('newCharacter', characters[socket.id]);

  socket.on('characterMovement', (movementData) => {
    characters[socket.id].xCoordinate = movementData.xCoordinate;
    characters[socket.id].yCoordinate = movementData.yCoordinate;
    characters[socket.id].animation = movementData.animation;

    socket.broadcast.emit('characterMoved', characters[socket.id]);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    console.log(characters);

    delete characters[socket.id];

    io.emit('characterDisconnect', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Socket IO server listening on port 3001');
});
