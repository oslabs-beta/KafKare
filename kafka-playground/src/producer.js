const { Kafka } = require('kafkajs');

const ip = require('ip');
//const { module } = require('../../webpack.config');
const host = process.env.HOST_IP || ip.address();

const runProducer = async (topic, msg) => {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: [`${host}:9092`],
    });

    const producer = kafka.producer();
    console.log('Connecting.....');
    await producer.connect();
    console.log('Connected!');
    //A-M 0 , N-Z 1
    const partition = msg[0] < 'N' ? 0 : 1;
    const result = await producer.send({
      topic: topic,
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });

    console.log(`Send Successfully! ${JSON.stringify(result)}`);

    //await producer.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  }
};
module.exports = { runProducer };
