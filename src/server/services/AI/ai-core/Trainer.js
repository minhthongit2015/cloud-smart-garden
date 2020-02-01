const tf = require('@tensorflow/tfjs-node');
const { dispatchEvent } = require('../../../utils');
const {
  ListenersInterface,
  TrainingSetInterface, TrainOptionsInterfaces
} = require('../utils/AITypes');
const { TrainEvents } = require('../utils/AIEvents');
const random = require('../../../utils/random');


module.exports = class {
  static get Events() {
    return TrainEvents;
  }

  static async train(
    model,
    trainingSet = { ...TrainingSetInterface },
    trainOptions = { ...TrainOptionsInterfaces },
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
    const dataset = tf.data.zip({ xs, ys })
      .shuffle(+trainOptions.batchSize, random.int(1, 999999), true)
      .batch(+trainOptions.batchSize || 36);

    // Train
    function handleBatchEnd(batch, logs) {
      console.log(`Batch: ${batch}, accuracy: ${logs.acc}`);
      dispatchEvent(TrainEvents.batchEnd, { listeners }, { batch, accuracy: logs.acc });
    }
    function handleEpochEnd(epoch, logs) {
      console.log(`Epoch: ${epoch}, accuracy: ${logs.acc}`);
      dispatchEvent(TrainEvents.epochEnd, { listeners }, { epoch, accuracy: logs.acc });
    }

    if (global.model) {
      global.model.stopTraining = true;
      await new Promise((resolve) => {
        global.onTrainEnd = resolve;
      });
    }
    global.model = model;
    global.onTrainEnd = () => {};

    dispatchEvent(TrainEvents.start, { listeners });
    let info;
    try {
      info = await model.fitDataset(dataset, {
        epochs: +trainOptions.epochs || 15,
        callbacks: {
          onBatchEnd: handleBatchEnd,
          onEpochEnd: handleEpochEnd
        }
      });
    } catch (error) {
      throw error;
    } finally {
      global.onTrainEnd();
      delete global.model;
    }
    console.log('Final accuracy', info.history.acc);
    dispatchEvent(TrainEvents.end, { listeners }, info.history.acc);

    return info;
  }
};
