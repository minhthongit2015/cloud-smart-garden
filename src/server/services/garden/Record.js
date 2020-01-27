const moment = require('moment');
const ApiHelper = require('../../utils/ApiHelper');
const { Record } = require('../../models/mongo');
const CRUDService = require('../CRUDService');

module.exports = class extends CRUDService {
  static getModel() {
    return Record;
  }

  static next10Minutes(mTime) {
    return mTime.add(10, 'minutes');
  }

  static generateRawRecord(time, stationId) {
    return {
      station: ApiHelper.getId(stationId),
      state: {
        temperature: 26,
        humidity: 80,
        light: 5000,
        led: false,
        fan: false,
        nutri: 2000
      },
      createdAt: time
    };
  }

  static async generateRecordByDate(date, stationId, next = this.next10Minutes) {
    const beginDay = moment(date).startOf('date');
    const endDay = moment(date).endOf('date');
    const currentDayOfYear = beginDay.get('dayOfYear');

    await this.findAndDelete({
      station: ApiHelper.getId(stationId),
      createdAt: {
        $gte: beginDay.toDate(),
        $lte: endDay.toDate()
      }
    });

    const records = [];
    let time = moment(date).startOf('date');
    while (time.get('dayOfYear') === currentDayOfYear) {
      const record = this.generateRawRecord(time.toDate(), stationId);
      records.push(record);
      time = next(time);
    }

    return Promise.all(
      records.map(record => this.create(record))
    );
  }

  static async generateRecordByDates(dates, stationId, next = this.next10Minutes) {
    if (!dates || dates.length < 0) {
      return [];
    }
    return Promise.all(
      dates.map(date => this.generateRecordByDate(date, stationId, next))
    );
  }
};
