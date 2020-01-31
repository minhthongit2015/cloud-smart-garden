/* eslint-disable no-unused-vars */
const { TrainingSetInterface, ListenersInterface } = require('../utils/AITypes');

module.exports = class {
  static build() {

  }

  static buildForTrainingSet(trainingSet = new ListenersInterface()) {
    this.buildForTrainingSet({ });
  }
};
