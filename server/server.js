const express = require('express');

const app = express();
const PORT = 8080;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello');
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
