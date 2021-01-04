const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3002;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});
app.use('/user', userRouter);
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
