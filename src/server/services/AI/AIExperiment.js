const tf = require('@tensorflow/tfjs-node');
const ModelService = require('./Model');
const ModelBuilder = require('./ai-core/ModelBuilder');
const DatasetService = require('./management/Dataset');
const Trainer = require('./ai-core/Trainer');
const TrainingSet = require('./ai-core/TrainingSet');
const DataUtils = require('./ai-core/DataUtils');
const SyncService = require('../../services/sync');
const { BuildOptionsInterface } = require('./AIInterfaces');
const NeralNetwork = require('./ai-core/NeuralNetwork');


module.exports = class {
  static async buildAndTrain(experimentId, opts = { ...BuildOptionsInterface }) {
    const dataset = await DatasetService.getWithRecords(opts.dataset);
    return this.buildAndTrainNutrient(opts, dataset);
  }

  static async buildAndTrainNutrient(opts = { ...BuildOptionsInterface }, dataset) {
    const trainingSet = TrainingSet.fromDataset(dataset, {
      features: [
        ['state.light', DataUtils.toNumber.id]
        // ['createdAt', DataUtils.fromStart.id]
      ],
      // labels: ['state.nutri']
      labels: [
        ['state.led', DataUtils.toNumber.id],
        ['state.led', DataUtils.toInverse.id, DataUtils.toNumber.id]
      ]
    });
    opts.layers = [10, 5];
    opts.metrics = ['accuracy'];
    const model = ModelBuilder.buildForTrainingSet('neural', trainingSet, opts);
    const trainResult = await Trainer.train(model, trainingSet, {
      onBatchEnd: (event, { batch, accuracy }) => {
        SyncService.emit('training', {
          batch,
          accuracy
        });
      }
    });
    return model;
  }

  static async save(experimentId, model) {
    return ModelService.save(model, `file://./assets/${experimentId}/models`);
  }

  static async load(experimentId) {
    return ModelService.load(`file://./assets/${experimentId}/models`);
  }

  static async test() {
    const numRecords = 432;
    const numFeatures = 1;
    const numOutputs = 2;
    const model = NeralNetwork.createModel({
      numFeatures,
      numOutputs,
      layers: [2]
    });
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    // Train
    function* dataGen() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.randomNormal([1, numFeatures]);
      }
    }
    function* labelsGen() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.randomUniform([1, numOutputs]);
      }
    }

    const xs = tf.data.generator(dataGen);
    const ys = tf.data.generator(labelsGen);
    const dataset = tf.data.zip({ xs, ys }).shuffle(100).batch(numRecords / 4);

    function onBatchEnd(batch, logs) {
      console.log('Accuracy', logs.acc);
    }

    const info = await model.fitDataset(dataset, {
      epochs: 5,
      callbacks: { onBatchEnd }
    });
    console.log('Final accuracy', info.history.acc);

    return model;
  }
};
