const tf = require('@tensorflow/tfjs-node');
const PostService = require('../blog/PostServ');
const { Experiment } = require('../../models/mongo');


module.exports = class extends PostService {
  static getModel() {
    return Experiment;
  }

  static predict(target, input) {
    // return { fan: true };
  }
};
