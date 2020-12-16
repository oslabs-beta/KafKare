import * as io from 'socket.io-client';
const sayHi = document.getElementById('sayHi');
const socket = io();
socket.on('connect', () => {
  console.log('socket connected');
});
sayHi.addEventListener('click', () => {
  console.log('hifdsaf');
});
// create topic and define the parition number
const sendTopic = (socket: any, topic: string) => {
  topic = topic === '' ? 'default-topic' : topic;
  const sendTopic: any = {
    topic,
  };
  socket.emit('sendTopic', sendTopic);
};
// add click functionlity to create topic
const btn_topic = document.getElementById('btn-topic');
btn_topic.addEventListener('click', () => {
  const topic = document.getElementById('topic') as HTMLInputElement;
  const topicVal = topic.value;
  console.log(topicVal);
  topic.value = '';
  sendTopic(socket, topicVal);
});

// subscribe to produceMsg and emit data
const produceMsg = (socket: any, topic: string, msg: string, n: number) => {
  const produceTopic: any = {
    topic,
    msg,
    n,
  };
  socket.emit('produceMsg', produceTopic);
};

const btn_produce_msg = document.getElementById('btn-msg');
btn_produce_msg.addEventListener('click', () => {
  const topicElement = document.getElementById(
    'producer-topic'
  ) as HTMLInputElement;
  const msgElement = document.getElementById(
    'producer-msg'
  ) as HTMLInputElement;
  const nElement = document.getElementById(
    'producer-number'
  ) as HTMLInputElement;
  const topic = topicElement.value;
  const msg = msgElement.value;
  const n = Number(nElement.value);
  produceMsg(socket, topic, msg, n);
});

// subscribe to consumer msg and send data
const consumeMsg = (socket: any, topic: string) => {
  const msg: any = {
    topic,
  };
  socket.emit('consumeMsg', msg);
};
const btn_consume_msg = document.getElementById('btn-comsumer');
btn_consume_msg.addEventListener('click', () => {
  const topicElement = document.getElementById(
    'consume-topic'
  ) as HTMLInputElement;
  const topic = topicElement.value;
  consumeMsg(socket, topic);
});
