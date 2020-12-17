const { Kafka } = require('kafkajs');
const ip = require('ip');
const host = process.env.HOST_IP || ip.address();
run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: [`${host}:9092`],
    });

    const admin = kafka.admin();
    console.log('Connecting.....');
    await admin.connect();
    console.log('Connected!');
    //A-M, N-Z
    await admin.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions: 2,
        },
      ],
    });
    console.log('Created Successfully!');
    await admin.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    process.exit(0);
  }
}