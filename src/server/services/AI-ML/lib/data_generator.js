


let tf = require("@tensorflow/tfjs");

exports.generatePPM = function(numPoints, coeff, sigma = 0.04) {
  return tf.tidy(() => {
    const xs = tf.randomUniform([numPoints, 4], -1, 1); // Random Data Point
    const coefficient = tf.tensor2d(coeff, [4, 1]);     // Hệ số

    // Generate polynomial data
    const ys = xs.matMul(coefficient)
      // Add random noise to the generated data
      // to make the problem a bit more interesting
      .add(tf.randomNormal([numPoints, 4], 0, sigma));

    // Normalize the y values to the range 0 to 1.
    const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    const ysNormalized = ys.sub(ymin).div(yrange);

    return {
      xs, 
      ys: ysNormalized
    };
  })
}