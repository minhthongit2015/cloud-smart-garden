const tf = require('@tensorflow/tfjs-node');
const { dispatchEvent } = require('../../../utils');
const { ListenersInterface, TrainingSetInterface } = require('../AIInterfaces');
const { TrainEvents } = require('../AIEvents');


module.exports = class {
  static get Events() {
    return TrainEvents;
  }

  static async train(
    model,
    trainingSet = { ...TrainingSetInterface },
    listeners = { ...ListenersInterface }
  ) {
    const numRecords = trainingSet.xs.length;
    function* featuresGenerator() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.tensor(trainingSet.xs[i], [1, trainingSet.features.length]);
      }
    }
    function* labelsGenerator() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.tensor(trainingSet.ys[i], [1, trainingSet.labels.length]);
      }
    }

    const xs = tf.data.generator(featuresGenerator);
    const ys = tf.data.generator(labelsGenerator);
    const dataset = tf.data.zip({ xs, ys }).shuffle(100).batch(36);

    // Train
    dispatchEvent(TrainEvents.start, { listeners });
    const info = await model.fitDataset(dataset, {
      epochs: 10,
      callbacks: {
        onBatchEnd: (batch, logs) => {
          console.log(`Batch: ${batch}, accuracy: ${logs.acc}`);
          dispatchEvent(TrainEvents.batchEnd, { listeners }, { batch, accuracy: logs.acc });
        }
      }
    });
    console.log('Final accuracy', info.history.acc);
    dispatchEvent(TrainEvents.end, { listeners }, info.history.acc);
    return info;
  }
};
