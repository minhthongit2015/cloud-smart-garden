const moment = require('moment');
const { autoKey } = require('../../../utils');


const DataUtils = {
  fromStart: {
    key: '',
    inputType: Date,
    outputType: Number,
    name: 'Thời gian từ lúc bắt đầu trồng',
    description: 'Đo khoảng thời gian từ lúc bắt đầu trồng.',
    params: [
      {
        type: Date,
        name: 'Mốc thời gian',
        from: 'startTime',
        description: 'Thời điểm trồng.'
      },
      {
        type: String,
        name: 'Tính theo',
        description: 'Đơn vị thời gian',
        options: ['minutes', 'days'],
        defaultValue: 'minustes'
      }
    ],
    execute(inputValue, context, createdAt, unitOfTime) {
      return moment.unix(inputValue / 1000)
        .diff(moment.unix(createdAt / 1000), unitOfTime);
    }
  },
  minuteOfDay: {
    key: '',
    outputType: Number,
    name: 'Số phút trong ngày',
    description: 'Chuyển đổi sang số phút từ lúc bắt đầu ngày',
    execute: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  sunHeight: {
    key: '',
    outputType: Number,
    name: 'Độ cao mặt trời (%)',
    description: 'Độ cao mặt trời (tính theo %)',
    execute: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  lastOn: {
    key: '',
    outputType: Number,
    name: 'Last turn on',
    description: 'Khoảng thời gian từ lần cuối cùng bật',
    execute: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  lastOff: {
    key: '',
    outputType: Number,
    name: 'Last turn on',
    description: 'Khoảng thời gian từ lần cuối cùng bật',
    execute: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  toNumber: {
    key: '',
    outputType: Number,
    name: 'Ép sang kiểu số',
    description: 'Ép giá trị đầu vào sang kiểu số',
    execute: inputValue => +inputValue
  },
  div100: {
    key: '',
    outputType: Number,
    name: 'Chia cho 100',
    description: 'Chia cho 100',
    execute: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 100)
  },
  div1k: {
    key: '',
    outputType: Number,
    name: 'Chia cho 1000',
    description: 'Chia cho 1000',
    execute: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 1000)
  },
  div10k: {
    key: '',
    outputType: Number,
    name: 'Chia cho 10,000',
    description: 'Chia cho 10,000',
    execute: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 10000)
  },
  toInverse: {
    key: '',
    outputType: Boolean,
    name: 'Nghịch đảo',
    description: 'Đảo ngược giá trị đầu vào',
    execute: inputValue => !inputValue
  }
};
autoKey(DataUtils);

module.exports = DataUtils;
