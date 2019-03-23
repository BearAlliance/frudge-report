const io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('connected');

  socket.on('message', msg => {
    console.log('message', msg);
  });

  setInterval(() => {
    socket.emit('event', 'this works');
  }, 3000);
});

const port = 3001;
io.listen(port);
console.log('Listening on port ' + port + '...');
