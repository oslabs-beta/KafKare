//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs');
const ip = require('ip');
//const { module } = require('../../webpack.config');
// const dns = require('dns');
// const w3 = dns.lookupService('localhost', 9092, (err, value) => { if (err){console.log(err); return;}console.log(value)});
const host = process.env.HOST_IP || ip.address();

const runTopic = async (topic, n) => {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      // ssl: true,
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
          topic: topic,
          numPartitions: n,
        },
      ],
    });
    console.log(
      `Created Successfully! The topic name is ${topic}, number of partitions is ${n}`
    );
    const allTopics = await admin.listTopics();
    console.log(allTopics);
    //await admin.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  }
  // finally {
  //   process.exit(0);
  // }
};
//runTopic('happpy', 2);
module.exports = { runTopic };
