const io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('connected');

  socket.on('message', msg => {
    console.log('message', msg);
  });

  setInterval(() => {
    socket.emit('event', getRandomInt(90));
  }, 3000);
});

const port = 3001;
io.listen(port);
console.log('Listening on port ' + port + '...');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
