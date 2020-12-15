const path = require('path');
const express = require('express');
const app = express();

const PORT = 5000;

app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});
app.get('/main.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, './main.js'));
});
const server = app.listen(PORT);
