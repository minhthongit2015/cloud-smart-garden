const moment = require('moment');
const { get } = require('../../../utils');


function getValueByType(value, Type) {
  value = new Type(value);
  return value.valueOf();
}

const DataUtils = {
  fromStart: {
    id: '',
    type: Date,
    name: 'Từ lúc bắt đầu trồng',
    description: 'Chuyển đổi thời gian dạng timestamp sang số giây kể từ lúc bắt đầu trồng.',
    params: [
      { type: Date, from: 'records[0].createdAt' },
      { type: Date }
    ],
    execution(dataset, time) {
      return moment.unix(getValueByType(time, this.params[1].type))
        .diff(
          moment.unix(getValueByType(get(dataset, this.params[0].from), this.params[0].type)),
          'seconds'
        );
    }
  },
  minuteOfDay: {
    id: '',
    type: 'time',
    name: 'Thời gian trong ngày',
    description: 'Chuyển đổi sang số phút từ lúc bắt đầu ngày.',
    params: [
      { type: Date }
    ],
    execution: (dataset, time) => moment(time).startOf('day')
  },
  roundMinute: {
    id: '',
    type: 'time',
    name: 'Từ lúc bắt đầu trồng',
    description: 'Chuyển đổi thời gian dạng timestamp sang số mili giây kể từ lúc bắt đầu trồng',
    execution: (dataset, time) => {}
  },
  toNumber: {
    id: '',
    type: 'time',
    name: 'Từ lúc bắt đầu trồng',
    description: 'Chuyển đổi thời gian dạng timestamp sang số mili giây kể từ lúc bắt đầu trồng',
    execution: (dataset, value) => +value
  },
  toInverse: {
    id: '',
    type: 'time',
    name: 'Từ lúc bắt đầu trồng',
    description: 'Chuyển đổi thời gian dạng timestamp sang số mili giây kể từ lúc bắt đầu trồng',
    execution: (dataset, value) => !value
  }
};

Object.entries(DataUtils).forEach(([key, value]) => {
  value.id = key;
});

module.exports = DataUtils;
