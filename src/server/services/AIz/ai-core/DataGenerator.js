
const tf = require('@tensorflow/tfjs-node');

function generatePPM(
  numPoints, numberOfParameters, numberOfPosibility, numTestPoints, sigma = 0.4
) {
  return tf.tidy(() => {
    const xs = tf.randomUniform([numPoints, numberOfParameters], -1, 1); // Random Data Point
    const coefficient = tf.randomUniform([numberOfParameters, numberOfPosibility], 0, 1); // Hệ số
    const ys = xs.matMul(coefficient)
      .add(tf.randomNormal([numPoints, numberOfPosibility], 0, sigma));

    const xtest = tf.randomUniform([numTestPoints, numberOfParameters], -1, 1);

    const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    const ysNormalized = ys.sub(ymin).div(yrange);

    return {
      xs,
      ys: ysNormalized,
      xtest
    };
  });
}

module.exports = {
  generatePPM
};
