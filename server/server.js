/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require('path');
const http = require('http'); 
const express = require('express'); 
const socketio = require('socket.io'); 

const app = express(); 
const server = http.createServer(app); 
const io = socketio(server); 
io.on('connection', () => {console.log('connection')}); 
server.listen(3000); 




const app = express();
const PORT = 3002;
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});
// global error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, function () {
  console.log(`server listening on ${PORT}`);
});



 //webSockets
   //SQL database