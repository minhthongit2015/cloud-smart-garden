const moment = require('moment');
const { get, autoKey } = require('../../../utils');


function valueOf(value, Type) {
  if (Type) {
    value = new Type(value);
  }
  return value.valueOf();
}

const DataUtils = {
  runUtil(utilNode, inputValue, record, dataset) {
    const params = utilNode.params
      ? utilNode.params.map(param => this.getParamValue(param, inputValue, record, dataset))
      : [];
    return valueOf(utilNode.execution(
      valueOf(inputValue, utilNode.inputType),
      record, dataset,
      ...params
    ), utilNode.type);
  },
  getParamValue(param, inputValue, record, dataset) {
    const context = { inputValue, record, dataset };
    return param.from
      ? valueOf(get(context, param.from), param.type)
      : valueOf(inputValue, param.type);
  },

  fromStart: {
    key: '',
    inputType: Date,
    type: Number,
    name: 'Từ lúc bắt đầu trồng',
    description: 'Chuyển đổi thời gian dạng timestamp sang số giây kể từ lúc bắt đầu trồng.',
    params: [
      { type: Date, from: 'dataset.records[0].createdAt' }
    ],
    execution(inputValue, record, dataset, createdAt) {
      return moment.unix(inputValue / 1000)
        .diff(moment.unix(createdAt / 1000), 'minutes');
    }
  },
  minuteOfDay: {
    key: '',
    type: Number,
    name: 'Thời gian trong ngày',
    description: 'Chuyển đổi sang số phút từ lúc bắt đầu ngày',
    execution: (inputValue) => {
      const time = moment(inputValue);
      return time.get('hour') * 60 + time.get('minute');
    }
  },
  toNumber: {
    key: '',
    type: Number,
    name: 'Ép sang kiểu số',
    description: 'Ép giá trị đầu vào sang kiểu số',
    execution: inputValue => +inputValue
  },
  div100: {
    key: '',
    type: Number,
    name: 'Chia cho 100',
    description: 'Chia cho 100',
    execution: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 100)
  },
  div1k: {
    key: '',
    type: Number,
    name: 'Chia cho 1000',
    description: 'Chia cho 1000',
    execution: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 1000)
  },
  div10k: {
    key: '',
    type: Number,
    name: 'Chia cho 10,000',
    description: 'Chia cho 10,000',
    execution: inputValue => (Number.isNaN(+inputValue) ? +inputValue : +inputValue / 10000)
  },
  toInverse: {
    key: '',
    type: Boolean,
    name: 'Nghịch đảo',
    description: 'Đảo ngược giá trị đầu vào',
    execution: inputValue => !inputValue
  }
};
autoKey(DataUtils);

module.exports = DataUtils;
