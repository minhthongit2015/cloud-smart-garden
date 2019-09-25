// const { Environment } = require('../../models/mongo');
const tf = require('@tensorflow/tfjs-node');
const EnvironmentService = require('../../Environment');
const ApiHelper = require('../../../utils/ApiHelper');
const ConverterFactory = require('../../../models/converters/converter-factory');
const NeralNetwork = require('./NeuralNetwork');
// const Trainer = require('./Trainer');
const SyncService = require('../../../services/sync');

module.exports = class {
  static async build(opts = ApiHelper.listParams) {
    // Prepare dataset
    const rawData = await EnvironmentService.list(opts);
    const features = {
      // 'state.temperature': 'temperature',
      // 'state.humidity': 'humidity',
      createdAt: 'time'
    };
    const labels = {
      'state.led': 'led'
    };
    const dataset = ConverterFactory.get('env-dataset').convert(rawData, { features, labels });
    const timeColumnIndex = dataset.inputColumns.indexOf('time');
    dataset.xs.forEach((row) => {
      if (row[timeColumnIndex] && row[timeColumnIndex].getTime) {
        row[timeColumnIndex] = row[timeColumnIndex].getHours() * 60
          + row[timeColumnIndex].getMinutes();
      }
    });

    // Create model
    const numFeatures = dataset.inputColumns.length;
    const numOutput = dataset.outputColumns.length;
    const model = NeralNetwork.getModel({
      numFeatures,
      numOutput,
      layers: [
        2
      ]
    });
    model.compile({
      optimizer: 'sgd',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    // Setup training set
    // const xs = tf.data.array(dataset.xs.map(row => [row[2]])).batch(24);
    // const ys = tf.data.array(dataset.ys).batch(24);
    // const trainingSet = tf.data.zip({ xs, ys });

    tf.tidy(async () => {
      function* dataz() {
        for (let i = 0; i < dataset.xs.length; i++) {
          yield tf.tensor(dataset.xs[i], [1, numFeatures]);
        }
      }
      function* labelsz() {
        for (let i = 0; i < dataset.ys.length; i++) {
          yield tf.tensor(dataset.ys[i], [numOutput]);
        }
      }
      const xs = tf.data.generator(dataz);
      const ys = tf.data.generator(labelsz);
      const trainingSet = tf.data.zip({ xs, ys }).shuffle(100).batch(30);

      // Train
      const info = await model.fitDataset(trainingSet, {
        epochs: 10,
        callbacks: {
          onBatchEnd: this.onBatchEnd
        }
      });
      // Trainer.train(model);
      console.log('Final accuracy', info.history.acc);
    });

    return model;
  }

  static onBatchEnd(batch, logs) {
    console.log('Accuracy', batch, logs.acc);
    SyncService.emit('training', {
      batch,
      accuracy: logs.acc
    });
  }

  static async create(object) {
    return EnvironmentService.create(object);
  }

  static update() {

  }

  static delete() {

  }

  static async save() {
    // const saveResult = await model.save('localstorage://my-model-1');
    // const model = await tf.loadLayersModel('localstorage://my-model-1');
  }

  static getConfig() {
    const optimizers = Object.keys(tf.train);
    const losses = Object.keys(tf.losses).slice(1);
    const metrics = Object.keys(tf.metrics);
    return {
      optimizers,
      losses,
      metrics
    };
  }
};
