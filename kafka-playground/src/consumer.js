//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs');
const ip = require('ip');
const host = process.env.HOST_IP || ip.address();

const runConsumer = async (topic) => {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: [`${host}:9092`],
    });

    const consumer = kafka.consumer({ groupId: 'test' });
    console.log('Connecting.....');
    await consumer.connect();
    console.log('Connected!');

    await consumer.subscribe({
      topic: topic,
      fromBeginning: true,
    });

    console.log(`Subscribed to topic ${topic}`);
    await consumer.run({
      eachMessage: async (result) => {
        console.log('The result is actually ', result);
        console.log(
          `RVD Msg ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  }
};

module.exports = { runConsumer };
