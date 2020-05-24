const CRUDService = require('../CRUDService');
const { TrainingTask: TrainingTaskModel } = require('../../models/mongo');
const { TaskStatus } = require('../../utils/Constants');


class TrainingTaskService extends CRUDService {
  static getModel() {
    return TrainingTaskModel;
  }

  static async scheduleTrainingTask({
    experiment, target, trainingSetOptions, modelOptions, trainOptions
  }) {
    const newTask = {
      experiment,
      target,
      trainingSetOptions,
      modelOptions,
      trainOptions,
      status: TaskStatus.scheduled
    };
    const existedTask = await this.get({
      opts: {
        where: {
          experiment: newTask.experiment,
          target: newTask.target
        }
      }
    });
    return existedTask
      ? this.update({ id: existedTask._id, doc: newTask })
      : this.create({ doc: newTask });
  }

  static getNextTask() {
    return this.first({
      opts: {
        where: { status: TaskStatus.scheduled },
        sort: '-createdAt'
      }
    });
  }

  static getPreviousTask(currentTask) {
    return this.first({
      opts: {
        where: {
          experiment: currentTask.experiment,
          target: currentTask.target,
          status: TaskStatus.completed
        },
        sort: '-createdAt'
      }
    });
  }

  static markTaskIsRunning(task) {
    return this.update({ id: task, doc: { status: TaskStatus.running } });
  }

  static markTaskIsCompleted(task) {
    return this.update({ id: task, doc: { status: TaskStatus.completed } });
  }
}

module.exports = TrainingTaskService;
