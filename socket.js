const io = require('socket.io')();
const INTERVAL_SECONDS = 60;
const UPDATE_INTERVAL = INTERVAL_SECONDS * 1000;

let readings = [];
takeReading();

io.on('connection', function(socket) {
  console.log('connected');

  if (readings.length > 0) {
    console.log('sending previously recorded readings');
    socket.emit('bulk-load', { readings: readings });
  } else {
    console.log('no old readings to send');
  }
  // Send a new reading every n seconds
  setInterval(() => {
    socket.emit('event', takeReading());
  }, UPDATE_INTERVAL);
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
