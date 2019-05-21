

let tf = require('@tensorflow/tfjs');
let ppmPredictor = require('./ppmPredictor').PPMPredictor;
let data = require('./lib/data_generator');
let colors = require("colors");

async function testPredictPPM() {
  let ppm = new ppmPredictor();

  /// Test Train
  let trainingSet = data.generatePPM(1000, [.2, .3, .25, .4]);
  ppm.loadTrainingSet(trainingSet);

  /// Test Predict
  let first = ppm.predict(trainingSet.xs);
  // let first = ppm.predict(tf.tensor2d([30, 26.5, 50, 1200], [1, 4]));
  console.log(ppm.getMSEloss(first, trainingSet.ys).dataSync());

  await ppm.train(trainingSet.xs, trainingSet.ys, 100, 0.5);

  console.log("Training complete!");

  let coeff = ppm.coefficient.dataSync();
  console.log("Coefficient: ", coeff);

  console.log("\r\n------------------------------------------------------------------------------------");
  console.log(colors.yellow(`ppm = ${coeff[0].toFixed(2)}*day + ${coeff[1].toFixed(2)}*temperature + ${coeff[2].toFixed(2)}*humidity + ${coeff[3].toFixed(2)}*light`));
  console.log("------------------------------------------------------------------------------------\r\n");

  let saveResult = ppm.save("file://./assets/ppm-model")
}
testPredictPPM();
