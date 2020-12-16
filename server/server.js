const express = require('express');
const path = require('path');
const socketio = require('socket.io')
const app = express();
const server = http.createServer(app);
const PORT = 3000;
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

server.listen(PORT, function () {
  console.log(`server listening on ${PORT}`);
});
