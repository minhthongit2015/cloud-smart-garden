const moment = require('moment');
const { get, autoKey } = require('../../../utils');


function valueOf(value, Type) {
  if (Type) {
    value = new Type(value);
  }
  return value.valueOf();
}

const DataUtils = {
  runUtil(utilNode, inputValue, record, index, dataset) {
    const params = utilNode.params
      ? utilNode.params.map(param => this.getParamValue(param, inputValue, record, index, dataset))
      : [];
    return valueOf(utilNode.calculate(
      valueOf(inputValue, utilNode.inputType),
      record, index, dataset,
      ...params
    ), utilNode.type);
  },
  getParamValue(param, inputValue, record, index, dataset) {
    const context = {
      inputValue, record, index, dataset
    };
    return param.from
      ? valueOf(get(context, param.from), param.type)
      : valueOf(inputValue, param.type);
  },

  fromStart: {
    key: '',
    inputType: Date,
    type: Number,
    name: 'Từ lúc bắt đầu trồng',
    description: 'Tính thời gian từ lúc bắt đầu trồng.',
    params: [
      { type: Date, from: 'dataset.records[0].createdAt' }
    ],
    calculate(inputValue, record, index, dataset, createdAt) {
      return moment.unix(inputValue / 1000)
        .diff(moment.unix(createdAt / 1000), 'minutes');
    }
  },
  minuteOfDay: {
    key: '',
    type: Number,
    name: 'Thời gian trong ngày',
    description: 'Chuyển đổi sang số phút từ lúc bắt đầu ngày',
    calculate: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  sunHeight: {
    key: '',
    type: Number,
    name: 'Độ cao mặt trời (%)',
    description: 'Độ cao mặt trời (tính theo %)',
    calculate: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  lastOn: {
    key: '',
    type: Number,
    name: 'Last turn on',
    description: 'Khoảng thời gian từ lần cuối cùng bật',
    calculate: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  lastOff: {
    key: '',
    type: Number,
    name: 'Last turn on',
    description: 'Khoảng thời gian từ lần cuối cùng bật',
    calculate: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  toNumber: {
    key: '',
    type: Number,
    name: 'Ép sang kiểu số',
    description: 'Ép giá trị đầu vào sang kiểu số',
    calculate: inputValue => +inputValue
  },
  div100: {
    key: '',
    type: Number,
    name: 'Chia cho 100',
    description: 'Chia cho 100',
    calculate: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 100)
  },
  div1k: {
    key: '',
    type: Number,
    name: 'Chia cho 1000',
    description: 'Chia cho 1000',
    calculate: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 1000)
  },
  div10k: {
    key: '',
    type: Number,
    name: 'Chia cho 10,000',
    description: 'Chia cho 10,000',
    calculate: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 10000)
  },
  toInverse: {
    key: '',
    type: Boolean,
    name: 'Nghịch đảo',
    description: 'Đảo ngược giá trị đầu vào',
    calculate: inputValue => !inputValue
  }
};
autoKey(DataUtils);

module.exports = DataUtils;
