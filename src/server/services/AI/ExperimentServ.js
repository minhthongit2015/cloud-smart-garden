const tf = require('@tensorflow/tfjs-node');
const PostService = require('../blog/Post');
const { Experiment } = require('../../models/mongo');
const ModelService = require('./ModelServ');
const {
  ModelBuilder, TrainingSet, Trainer, NeuralNetwork
} = require('./ai-core');
const DatasetService = require('./DatasetServ');
const SyncService = require('../sync');
const { BuildExperimentRequest, ExperimentTarget } = require('./utils/AITypes');
const BuiltInExperimentTargets = require('./BuiltInExperimentTargets');


module.exports = class extends PostService {
  static getModel() {
    return Experiment;
  }

  static async buildAndTrain(experimentId, opts = new BuildExperimentRequest()) {
    const dataset = await DatasetService.getWithRecords(opts.datasetId);
    const trainedModels = await Promise.all(
      opts.targets.map(async (target) => {
        let savedModel = null;
        if (opts.saveModel) {
          savedModel = await this.load(experimentId, target);
        }
        return this.buildAndTrainForTarget(target, dataset, savedModel, opts);
      })
    );
    if (trainedModels && opts.saveModel) {
      await Promise.all(
        trainedModels.map(
          (trainedModel, index) => this.save(trainedModel, experimentId, opts.targets[index])
        )
      );
    }
    return trainedModels;
  }

  static findExperimentTarget(target) {
    return BuiltInExperimentTargets.find(targetI => targetI.key === target.key);
  }

  static async buildAndTrainForTarget(
    target, dataset, savedModel, opts = new BuildExperimentRequest()
  ) {
    const experimentTarget = this.findExperimentTarget(target);
    if (!experimentTarget) return null;

    const trainingSet = this.buildTrainingSetForTarget(dataset, experimentTarget);

    opts.metrics = ['accuracy']; // Force to use accuracy for now
    let model = (savedModel && ModelBuilder.compileModel(savedModel, opts))
      || ModelBuilder.buildForTrainingSet('neural', trainingSet, opts);

    try {
      await this.trainModel(model, trainingSet, opts);
    } catch {
      model = ModelBuilder.buildForTrainingSet('neural', trainingSet, opts);
      await this.trainModel(model, trainingSet, opts);
    }

    return model;
  }

  static buildTrainingSetForTarget(dataset, experimentTarget = new ExperimentTarget()) {
    return TrainingSet.fromDataset(dataset, {
      features: experimentTarget.features,
      labels: experimentTarget.labels
    });
  }

  static async trainModel(model, trainingSet, opts = new BuildExperimentRequest()) {
    return Trainer.train(model, trainingSet, opts, {
      onBatchEnd: (event, { batch, accuracy }) => {
        if (!opts.highResolution) return;
        SyncService.emit('training', { batch, accuracy });
      },
      onEpochEnd: (event, { batch, accuracy }) => {
        if (opts.highResolution) return;
        SyncService.emit('training', { batch, accuracy });
      },
      onStart: () => {
        SyncService.emit('startTraining');
      }
    });
  }

  static async stopTraining() {
    if (!global.model) return;
    global.model.stopTraining = true;
    await new Promise((resolve) => {
      global.onTrainEnd = resolve;
    });
    delete global.model;
  }

  static async save(model, experimentId, target) {
    return ModelService.save(model, this._getModelPath(experimentId, target));
  }

  static async load(experimentId, target) {
    return ModelService.load(this._getModelPath(experimentId, target));
  }

  static _getModelPath(experimentId, target) {
    const targetKey = target && target.key ? `${target.key}` : (target || '');
    return `${experimentId}-${targetKey}`;
  }

  static async test(opts = {}) {
    const trainingSet = [
      { x: [0.1], y: [0.1] },
      { x: [0.9], y: [0.9] },
      { x: [0.5], y: [0.5] }
    ];
    trainingSet.forEach((row) => {
      row.x = row.x.map(v => v * 1);
      row.y = row.y.map(v => v * 1);
    });

    const numRecords = trainingSet.length;
    const numFeatures = trainingSet[0].x.length;
    const numOutputs = trainingSet[0].y.length;
    let model = await this.getTestModel(numFeatures, numOutputs, false, opts);

    if (opts.x) {
      const x = opts.x.split(',').map(v => +v);
      const prediction = model.predict(tf.tensor1d(x));
      console.log(`prediction: ${prediction.dataSync()}`);
      const loss = model.lossFunctions[0](+opts.x.split(',')[0], prediction);
      console.log(`loss: ${loss.dataSync()}`);
      return prediction;
    }

    // Train
    function* dataGen() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.tensor2d(trainingSet[i].x, [1, numFeatures]);
        // yield tf.randomNormal([1, numFeatures]);
      }
    }
    function* labelsGen() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.tensor2d(trainingSet[i].y, [1, numOutputs]);
        // yield tf.randomUniform([1, numOutputs]);
      }
    }

    const xs = tf.data.generator(dataGen);
    const ys = tf.data.generator(labelsGen);
    const dataset = tf.data.zip({ xs, ys }).shuffle(100).batch(numRecords / 4);

    function onBatchEnd(batch, logs) {
      console.log('Accuracy', logs.acc);
    }

    const weightBefore = model.layers[1].getWeights()[0].dataSync();
    const biasBefore = model.layers[1].getWeights()[1].dataSync();
    const epochs = +opts.epochs || 100;
    let info;
    try {
      info = await model.fitDataset(dataset, {
        epochs,
        callbacks: { onBatchEnd }
      });
    } catch {
      model = await this.getTestModel(numFeatures, numOutputs, true, opts);
      info = await model.fitDataset(dataset, {
        epochs,
        callbacks: { onBatchEnd }
      });
    }
    console.log('Final accuracy', info.history.acc);
    console.log(weightBefore);
    console.log(biasBefore);
    console.log(model.layers[1].getWeights()[0].dataSync());
    console.log(model.layers[1].getWeights()[1].dataSync());

    await this.save(model, 'test');
    return JSON.parse(JSON.parse(JSON.stringify(model)));
  }

  static async getTestModel(numFeatures, numOutputs, createNew = false, opts) {
    const savedModel = (!opts.new && !createNew) && await this.load('test');
    const model = savedModel || NeuralNetwork.buildModel({
      numFeatures,
      numOutputs,
      activation: 'linear',
      layers: []
    });
    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['accuracy']
    });
    // model.optimizer.setLearningRate(+opts.rate || 0.1);
    return model;
  }
};
