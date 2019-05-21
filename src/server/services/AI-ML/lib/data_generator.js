


const tf = require('@tensorflow/tfjs-node');

exports.generatePPM = function generatePPM(numPoints, coeff, sigma = 0.04) {
  return tf.tidy(() => {
    const xs = tf.randomUniform([numPoints, coeff.length], -1, 1); // Random Data Point
    const coefficient = tf.tensor2d(coeff, [coeff.length, 1]);     // Hệ số
    const ys = xs.matMul(coefficient)
      .add(tf.randomNormal([numPoints, coeff.length], 0, sigma));

    const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    const ysNormalized = ys.sub(ymin).div(yrange);

    return {
      xs, 
      ys: ysNormalized
    };
  });
};