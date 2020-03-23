/* eslint-disable import/order */
/* eslint-disable global-require */
/* eslint-disable func-names */

let tf;
class TFLoader {
  static get tf() {
    if (!tf) {
      tf = require('@tensorflow/tfjs-node');
    }
    return tf;
  }
}

module.exports = TFLoader;
TFLoader.tf.