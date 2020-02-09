const moment = require('moment');
const ApiHelper = require('../../utils/ApiHelper');
const { Record } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const random = require('../../utils/random');


const DAY_FORMAT = 'YYYY/MM/DD';
const TIME_ZONE = 'Asia/Ho_Chi_Minh';

module.exports = class extends CRUDService {
  static getModel() {
    return Record;
  }

  static next10Minutes(mTime) {
    return mTime.add(10, 'minutes');
  }

  static next5Minutes(mTime) {
    return mTime.add(5, 'minutes');
  }

  static nextTime(mTime) {
    return mTime.add(5, 'minutes');
  }

  static generateRawRecord(time, stationId) {
    const light = random.int(0, 15000);
    const temperature = random.float(24, 30);
    const humidity = random.float(70, 100);

    const mtime = moment(time);
    const hours = mtime.get('hours');
    const minutes = mtime.get('minutes');
    const seconds = mtime.get('seconds');

    const start = moment(new Date('2020/1/27'));
    const nutri = this.calcNutrient(mtime, start);

    const led = this.calcLed(light, mtime, hours, minutes, seconds);
    const fan = this.calcFan(temperature, mtime, hours, minutes, seconds);

    return {
      station: ApiHelper.getId(stationId),
      state: {
        temperature,
        humidity,
        light,
        led,
        fan,
        nutri
      },
      createdAt: time
    };
  }

  static calcLed(light, mtime, hours, minutes, seconds) {
    return hours >= 5 && hours < 17 && light < 2000;
  }

  static calcFan(temperature, mtime, hours, minutes, seconds) {
    const TIME_FORMAT = 'HH:mm';
    const onTimes = [
      ['6:00', '8:00'],
      ['10:00', '12:00'],
      ['17:00', '19:00']
    ];
    return temperature > 29
      || onTimes.some(
        (time) => {
          const start = moment(time[0], TIME_FORMAT);
          const stop = moment(time[1], TIME_FORMAT);

          const begin = moment(mtime);
          begin.set('hours', start.get('hours'));
          begin.set('minutes', start.get('minutes'));
          const end = moment(mtime);
          end.set('hours', stop.get('hours'));
          end.set('minutes', stop.get('minutes'));

          return mtime.isBetween(begin, end);
        }
      );
  }

  static calcNutrient(mtime, start, daysRange = 3) {
    const totalMinutes = 60 * 24 * daysRange;
    const minutesFromStart = mtime.diff(start, 'minutes');
    const startPPM = 0;
    const targetPPM = 3000;
    const rangePPM = targetPPM - startPPM;
    return startPPM + minutesFromStart / totalMinutes * rangePPM;
  }

  static async generateRecordByDate(date, stationId, next = this.nextTime) {
    const beginDay = moment(date, DAY_FORMAT, TIME_ZONE).startOf('date');
    const endDay = moment(date, DAY_FORMAT, TIME_ZONE).endOf('date');
    const currentDayOfYear = beginDay.get('dayOfYear');

    await this.findAndDelete({
      station: ApiHelper.getId(stationId),
      createdAt: {
        $gte: beginDay.toDate(),
        $lte: endDay.toDate()
      }
    });

    const records = [];
    let time = moment(date, DAY_FORMAT, TIME_ZONE).startOf('date');
    while (time.get('dayOfYear') === currentDayOfYear) {
      const record = this.generateRawRecord(time.toDate(), stationId);
      records.push(record);
      time = next(time);
    }

    return Promise.all(
      records.map(record => this.create(record))
    );
  }

  static async generateRecordByDates(dates, stationId, next = this.nextTime) {
    if (!dates || dates.length < 0) {
      return [];
    }
    return Promise.all(
      dates.map(date => this.generateRecordByDate(date, stationId, next))
    );
  }

  static async listByDay(day, stationId, idOnly = false) {
    const beginDay = moment(day, DAY_FORMAT, TIME_ZONE).startOf('day');
    const endDay = moment(day, DAY_FORMAT, TIME_ZONE).endOf('day');
    const options = {
      where: {
        station: ApiHelper.getId(stationId),
        createdAt: {
          $gte: beginDay.toDate(),
          $lte: endDay.toDate()
        }
      },
      sort: 'createdAt'
    };
    if (idOnly) {
      options.fields = ['_id'];
    }
    return this.list(options);
  }

  static async listByDays(days, stationId, flatten = false, idOnly = false) {
    let recordsByDays = await Promise.all(
      days.map(day => this.listByDay(day, stationId, idOnly))
    );
    if (flatten) {
      recordsByDays = recordsByDays.reduce((records, recordsSet) => records.concat(recordsSet), []);
    }
    return recordsByDays;
  }
};
