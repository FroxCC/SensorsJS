const express = require('express');
const res = require('express/lib/response');
const expressLayouts = require('express-ejs-layouts');
const engine = require('ejs-mate');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io')

//init
const app = express();
const server = http.createServer(app);
const io = socketIO(server)

//settings

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(expressLayouts);


//routes
app.use(require('./routes/'))



//sockets
require('./sockets')(io);


//static files
app.use(express.static(path.join(__dirname, 'public')))

//start server
server.listen(3000, ()=> {
    console.log('Server on port 3000')
})

//serialport

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
  autoOpen: true,
})

port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }

  //Because there's no callback to write, write errors will be emitted on the port:
  port.write('main screen turn on')
})

// The open event is always emitted
port.on('open', function() {
})

// Open errors will be emitted as an error event
// port.on('error', function(err) {
//   console.log('Error: ', err.message)
// })

  
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', function(data){
  let temp = data;
  console.log(temp)
  io.emit('temp', data)
})