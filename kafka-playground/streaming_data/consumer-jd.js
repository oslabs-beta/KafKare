const { Kafka } = require('kafkajs');
const ip = require('ip');
const host = process.env.HOST_IP || ip.address();

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp2',
      brokers: [`${host}:9092`],
    });

    const consumer = kafka.consumer({ groupId: 'tech-jobs' });
    console.log('Connecting.....');
    await consumer.connect();
    console.log('Connected!');

    await consumer.subscribe({
      // topic: 'job_description',
      topic: 'jobs',
      fromBeginning: true,
    });

    console.log('Subscribed!');
    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          'The result is actually ',
          JSON.parse(result.message.value.toString())
        );
      },
    });
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
  }
}
