/* eslint-disable no-restricted-globals */
/* eslint-disable no-cond-assign */

const csv = require('csv-stringify');
const parse = require('csv-parse');
// const path = require('path');

const WebsocketManager = require('../websocket/ws-manager');

module.exports = class {
  static async resolveStationEnvironmentData(environment) {
    const environmentEvent = new WSEvent('environment', environment);
    WebsocketManager.dispatchEvent(environmentEvent);
  }

  static getRangePoints(viewMode, time) {
    let now = new Date();
    now = new Date(
      `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
    );
    let start = new Date(now);
    let end = new Date(now);
    let offset;
    switch (viewMode) {
    case 'day':
      if (!isNaN(parseInt(time, 10))) {
        now.setDate(parseInt(time, 10));
      }
      start = new Date(
        `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
      );
      end = new Date(
        `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate() + 1}`
      );
      return [start.getTime(), end.getTime() - 1];
    case 'week':
      offset = now.getDay() - 1;
      if (!isNaN(parseInt(time, 10))) {
        offset -= 7 * parseInt(time, 10);
      }
      start.setDate(now.getDate() - offset);
      end = new Date(start);
      end.setDate(start.getDate() + 7);
      return [start.getTime(), end.getTime() - 1];
    case 'month':
      if (!isNaN(parseInt(time, 10))) {
        now.setMonth(parseInt(time, 10) - 1);
      }
      start = new Date(now.getTime());
      start.setDate(1);
      end.setMonth(now.getMonth() + 1);
      end.setDate(1);
      return [start.getTime(), end.getTime() - 1];
    default:
      break;
    }
  }

  static async get(deviceId, viewMode, time) {
    if (!deviceId) return null;
    const device = await DeviceService.get(deviceId);
    const filter = { device: deviceId };
    if (viewMode) {
      const range = this.getRangePoints(viewMode, time);
      filter.x = {
        $gte: range[0],
        $lt: range[1]
      };
    }
    const powers = await Powers.find(filter)
      .sort({ x: 1 })
      .toArray();
    return {
      _id: deviceId,
      name: device.name,
      max: device.max,
      records: powers
    };
  }

  static async getAll(viewMode, time) {
    const filter = {};
    if (viewMode) {
      const range = this.getRangePoints(viewMode, time);
      filter.x = {
        $gte: range[0],
        $lt: range[1]
      };
    }
    const devices = await DeviceService.getAll(false);
    const deviceRecordsPromises = [];
    devices.forEach((device) => {
      const deviceRecordsPromise = Powers.find({
        ...filter,
        device: device._id.toString()
      })
        .sort({ x: 1 })
        .toArray();
      deviceRecordsPromises.push(deviceRecordsPromise);
    });
    const devicesRecords = await Promise.all(deviceRecordsPromises);
    const mappedDeviceRecords = devicesRecords.map((deviceRecords, index) => ({
      records: deviceRecords,
      name: devices[index].name,
      id: devices[index]._id.toString()
    }));
    return mappedDeviceRecords;
  }

  static async create(newRecord) {
    const record = await Powers.insertOne(newRecord);
    return record;
  }

  static async remove() {
    const removedRecord = await Powers.deleteOne({});
    return removedRecord;
  }

  static async removeAll(deviceId) {
    if (!deviceId) {
      const removedRecords = await Powers.deleteMany({});
      return removedRecords;
    }
    const removedRecords = await Powers.deleteMany({ device: deviceId });
    return removedRecords;
  }

  static async generate(size = 1000, deviceId = '') {
    const removedRecords = await this.removeAll(deviceId);
    const records = await this.generateRecords(size, deviceId);
    const newRecords = await Powers.insertMany(records);
    return [removedRecords, newRecords.ops];
  }

  static async generateRecords(size, deviceId) {
    if (!deviceId) {
      const firstDevice = await DeviceService.getFirst();
      deviceId = firstDevice._id;
    }
    const records = [];
    size = isNaN(size) ? 1000 : size;
    let now = new Date();
    now = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/1`);
    const distance = 10;
    let y = Math.random() * 300 + 100;
    for (let i = 0; i < size; ++i) {
      y += Math.random() * 4 - 2;
      y = y < 0 ? 0 : y;
      records.push({
        x: now.getTime(),
        y,
        device: deviceId
      });
      now = new Date(now.getTime() + distance * 60 * 1000);
    }

    return records;
  }

  static async generateRecordsFile(deviceId, viewMode, time) {
    const data = deviceId
      ? await this.get(deviceId, viewMode, time)
      : await this.getAll(viewMode, time);
    const columns = {
      x: 'time',
      y: 'value',
      device: 'device'
    };
    const allData = deviceId
      ? data.records
      : data.reduce((prev, cur) => prev.concat(cur.records), []);
    const promise = new Promise((resolve) => {
      csv(allData, { header: true, columns }, (err, output) => {
        if (err) throw err;
        resolve(output);
      });
    });
    const buffer = await promise;
    return buffer;
  }

  static async importRecordFiles(files, deviceId) {
    const promises = [];
    files.forEach((file) => {
      if (file.mimetype !== 'application/vnd.ms-excel') return;
      const promise = new Promise((resolve) => {
        parse(file.data).on('readable', () => {
          let record;
          const records = [];
          while ((record = this.read())) {
            // eslint-disable-next-line no-continue
            if (isNaN(parseInt(record[0], 10, 10))) continue;
            records.push({
              x: parseInt(record[0], 10, 10) || 0,
              y: parseFloat(record[1]) || 0,
              device: record[2] || null
            });
          }
          resolve(records);
        });
      });
      promises.push(promise);
    });
    const recordTables = await Promise.all(promises);
    const insertPromises = [];
    recordTables.forEach((table) => {
      const insertPromise = Powers.insertMany(table);
      insertPromises.push(insertPromise);
    });
    const newRecordsResult = await Promise.all(insertPromises);
    return newRecordsResult;
  }
};
