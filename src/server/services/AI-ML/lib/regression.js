/* eslint-disable class-methods-use-this */



const tf = require('@tensorflow/tfjs-node');

exports.LinearRegression = class LinearRegression {
  constructor(numDim) {
    // Khởi tạo hệ số ngẫu nhiên
    const coeffTensor = tf.tensor2d([Math.random(), Math.random(), Math.random(), Math.random()], [4, 1]);
    this.coefficient = tf.variable(coeffTensor);
    // this.coefficient = [];
    // for (let i=0; i<numDim; i++) {
    //   this.coefficient.push(tf.variable(tf.scalar(Math.random())));
    // }
  }

  // Nạp Training Set
  loadTrainingSet(trainingSet) {
    this.trainingSet = trainingSet;
  }

  // Trả về SGD Optimizer
  getSGDOptimizer(learningRate) {
    return tf.train.sgd(learningRate);
  }
  
  // Trả về kết quả theo MSE
  getMSEloss(predictions, labels) {
    const meanSquareError = predictions.sub(labels).square().mean();
    return meanSquareError;
  }

  predict(x) {
    // a*day + b*temp + c*humi + d*light = ppm
    return tf.tidy(() => {
      return x.matMul(this.coefficient);
    });
  }

  async train(xs, ys, numIterations, learningRate) {
    const optimizer = this.getSGDOptimizer(learningRate);

    for (let iter = 0; iter < numIterations; iter += 1) {
      optimizer.minimize(() => {
        const pred = this.predict(xs);
        const loss = this.getMSEloss(pred, ys);
        console.log(iter, 'loss: ', loss.dataSync());
        return loss;
      });
      await tf.nextFrame();
    }
  }

};