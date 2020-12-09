const { Kafka } = require('kafkajs');
const msg = process.argv[2];
const ip = require('ip');
const host = process.env.HOST_IP || ip.address();
run();
async function run() {
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
      topic: 'Users',
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });
    console.log('This is the result: ', result);

    console.log(`Send Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    process.exit(0);
  }
}
