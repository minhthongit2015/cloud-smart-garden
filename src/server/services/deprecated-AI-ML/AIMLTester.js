

const tf = require('@tensorflow/tfjs');
const ppmPredictor = require('./ppmPredictor').PPMPredictor;
const data = require('./lib/data_generator');
const colors = require('colors');

async function testPredictPPM() {
  const ppm = new ppmPredictor();

  // / Test Train
  const trainingSet = data.generatePPM(1000, [.2, .3, .25, .4]);
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

  const saveResult = ppm.save('file://./assets/ppm-model');
}
testPredictPPM();
