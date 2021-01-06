const { Kafka } = require('kafkajs');

const ip = require('ip');

const host = process.env.HOST_IP || ip.address();

const runProducer = async (topic, msg) => {
  try {
    const kafka = new Kafka({
      clientId: 'myapp2',
      brokers: [`${host}:9092`],
    });

    const producer = kafka.producer();
    console.log('Connecting.....');
    await producer.connect();
    console.log('Connected!');

    const partArr = [0, 1, 2];
    const partition = partArr[Math.floor(Math.random() * partArr.length)];

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

    await producer.disconnect();
  } catch (ex) {
    console.error(`There was an error producing messages ${ex}`);
  }
};

module.exports = { runProducer };
