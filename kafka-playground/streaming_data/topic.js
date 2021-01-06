const { Kafka } = require('kafkajs');
const ip = require('ip');
const host = process.env.HOST_IP || ip.address();
run('jobs', 3);

async function run(topic, n) {
  try {
    const kafka = new Kafka({
      clientId: 'myapp2',
      brokers: [`${host}:9092`],
    });

    const admin = kafka.admin();
    console.log('Connecting.....');
    await admin.connect();
    console.log('Connected!');

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
    await admin.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  }
}
// async function run() {
//   try {
//     const kafka = new Kafka({
//       clientId: 'myapp',
//       brokers: [`${host}:9092`],
//     });

//     const admin = kafka.admin();
//     console.log('Connecting.....');
//     await admin.connect();
//     console.log('Connected!');
//     await admin.createTopics({
//       topics: [
//         {
//           topic: 'salary_range',
//         },
//       ],
//     });
//     await admin.createTopics({
//       topics: [
//         {
//           topic: 'job_description',
//         },
//       ],
//     });
//     await admin.createTopics({
//       topics: [
//         {
//           topic: 'skills',
//         },
//       ],
//     });
//     console.log('Created Successfully!');
//     await admin.disconnect();
//   } catch (ex) {
//     console.error(`Something bad happened ${ex}`);
//   } finally {
//     process.exit(0);
//   }
// }
