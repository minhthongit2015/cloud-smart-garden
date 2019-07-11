
// const tf = require('@tensorflow/tfjs-node');
const colors = require('colors');
const NutriPredictor = require('./ppmPredictor').PPMPredictor;
const DataGenerator = require('./lib/data_generator');
const Neural = require('./lib/neural');

module.exports = class {
  // eslint-disable-next-line no-unused-vars
  static async test(listeners = { onBatchEnd: (log) => { }, onEpochEnd: (log) => {}}) {
    // 1.Temperature, 2.Humidity, 3.Light, 4.Days, 5.Time
    const numRecords = 30;
    const numberOfParameters = 5;
    const numberOfPosibility = 2; // "1.Yes" or "0.No"
    const numTestPoints = 10;
    const trainingSet = DataGenerator.generatePPM(numRecords, numberOfParameters, numberOfPosibility, numTestPoints);
    const model = Neural.generateModel([numberOfParameters, 50, 25, 2]);
    const firstPredict = model.predict(trainingSet.xtest);
    model.compile({
      optimizer: 'sgd',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
    const trainHistory = await model.fit(trainingSet.xs, trainingSet.ys, {
      epochs: 5,
      batchSize: 5,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log('epoch-end', epoch, logs);
          if (listeners.onEpochEnd) {
            listeners.onEpochEnd(epoch, logs);
          }
        },
        onBatchEnd: (batch, logs) => {
          console.log('Accuracy', logs.acc);
          if (listeners.onBatchEnd) {
            listeners.onBatchEnd(batch, logs);
          }
        }
      }
    });
    const afterTrainPredict = model.predict(trainingSet.xtest);
    return {trainingSet, model, trainHistory, firstPredict, afterTrainPredict};
  }

  static async testPredictPPM() {
    const ppm = new NutriPredictor();

    // / Test Train
    const trainingSet = DataGenerator.generatePPM(1000, [.2, .3, .25, .4]);
    ppm.loadTrainingSet(trainingSet);

    // / Test Predict
    const first = ppm.predict(trainingSet.xs);
    // let first = ppm.predict(tf.tensor2d([30, 26.5, 50, 1200], [1, 4]));
    console.log(ppm.getMSEloss(first, trainingSet.ys).dataSync());

    await ppm.train(trainingSet.xs, trainingSet.ys, 100, 0.5);

    console.log('Training complete!');

    const coeff = ppm.coefficient.dataSync();
    console.log('Coefficient: ', coeff);

    console.log('\r\n------------------------------------------------------------------------------------');
    console.log(colors.yellow(`ppm = ${coeff[0].toFixed(2)}*day + ${coeff[1].toFixed(2)}*temperature + ${coeff[2].toFixed(2)}*humidity + ${coeff[3].toFixed(2)}*light`));
    console.log('------------------------------------------------------------------------------------\r\n');

    const saveResult = ppm.save('file://./exported_models/ppm-model');
    return saveResult;
  }
};
