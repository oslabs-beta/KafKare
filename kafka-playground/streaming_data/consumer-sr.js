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

    const consumer = kafka.consumer({ groupId: 'tech-jobs' });
    console.log('Connecting.....');
    await consumer.connect();
    console.log('Connected!');

    await consumer.subscribe({
      topic: 'salary_range',
      fromBeginning: true,
    });

    console.log('Subscribed!');
    await consumer.run({
      //   eachBatch: async (result) => {
      //     console.log('The result is actually ', result.message.value);
      //   },
      eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat,
        commitOffsetsIfNecessary,
        uncommittedOffsets,
        isRunning,
        isStale,
      }) => {
        for (let message of batch.messages) {
          console.log({
            topic: batch.topic,
            partition: batch.partition,
            highWatermark: batch.highWatermark,
            message: {
              offset: message.offset,
              key: message.key.toString(),
              value: message.value.toString(),
              headers: message.headers,
            },
          });

          resolveOffset(message.offset);
          await heartbeat();
        }
      },
    });
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    console.log('yo');
  }
}
