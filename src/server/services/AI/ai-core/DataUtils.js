const moment = require('moment');
const { get, autoKey } = require('../../../utils');


function valueOf(value, Type) {
  if (Type) {
    value = new Type(value);
  }
  return value.valueOf();
}

const DataUtils = {
  runUtil: (utilNode, inputValue, record, dataset) => {
    const params = utilNode.params
      ? utilNode.params.map(param => this.getParamValue(param, inputValue, record, dataset))
      : [];
    return valueOf(utilNode.execution(
      valueOf(inputValue, utilNode.inputType),
      record, dataset,
      ...params
    ), utilNode.type);
  },
  getParamValue: (param, inputValue, record, dataset) => {
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
      return moment.unix(inputValue)
        .diff(moment.unix(createdAt), 'seconds');
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
