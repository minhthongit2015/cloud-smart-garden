const ExperimentService = require('./ExperimentServ');
const TargetService = require('./TargetServ');


class AutoPlanting {
  static calcNewState(record, target) {
    return ExperimentService.predict(record, target);
  }

  static calcNewStateByRecord(record) {
    const { station, state, createdAt } = record;
    station.targets.forEach((target) => {
      const target = TargetService.get(station.target);
      const newState = this.calcNewState(record, target);
    });
  }
}

module.exports = AutoPlanting;
