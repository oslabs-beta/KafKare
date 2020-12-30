const path = require('path');
const express = require('express');
const { Kafka } = require('kafkajs');
const ip = require('ip');
const host = process.env.HOST_IP || ip.address();
const socketio = require('socket.io');
const app = express();
const { runTopic } = require('../src/topic');
const { runProducer } = require('../src/producer');
const { runConsumer } = require('../src/consumer');
const PORT = 8181;

app.post('/topic', (req, res) => {
  const data = req.body;
  console.log(data);
  res.send;
});
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});
app.get('/main.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, './main.js'));
});
const server = app.listen(PORT);
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('socket connected');

  socket.on('sendTopic', (data, n) => {
    console.log('Im listening for topic sending in');
    console.log(data);
    runTopic(data.topic, 2);

    //runTopic(data.topic, 2);
  });
  socket.on('produceMsg', (data) => {
    console.log('Im listening for producingMsg');
    console.log(data);
    for (let i = 0; i <= data.n; i++) {
      runProducer(data.topic, data.msg);
    }
  });
  socket.on('consumeMsg', (data) => {
    console.log('Im listening for consomeMsg');
    console.log(data);
    runConsumer(data.topic);
  });
});
