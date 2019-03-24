const io = require('socket.io')();
const INTERVAL_SECONDS = 10;
const UPDATE_INTERVAL = INTERVAL_SECONDS * 1000;

let readings = [];
let sockets = [];
takeReading();

// Send a new reading every n seconds
setInterval(() => {
  const reading = takeReading();
  sockets.forEach(socket => {
    console.log('sending reading', reading);
    socket.emit('event', reading);
  });
}, UPDATE_INTERVAL);

io.on('connection', function(socket) {
  console.log('connected');

  sockets.push(socket);

  if (readings.length > 0) {
    console.log('sending previously recorded readings');
    socket.emit('bulk-load', { readings: readings });
  } else {
    console.log('no old readings to send');
  }
});

const port = 3001;
io.listen(port);
console.log('Listening on port ' + port + '...');

//////////////////////

function takeReading() {
  const reading = {
    reading: getRandomInt(90),
    time: new Date()
  };

  readings.push(reading);
  return reading;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
