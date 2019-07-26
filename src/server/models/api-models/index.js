const { isNotSet } = require('../../utils');

const defaultError = {
  code: 400,
  message: '',
  stack: ''
};

function isDefaultError(error) {
  return !error || Object.keys(error).every(key => error[key] === defaultError[key]);
}


module.exports = class {
  constructor(opts = {
    error: { ...defaultError },
    data: undefined
  }) {
    this.setError(opts.error);
    this.setData(opts.data);
  }

  setData(data) {
    if (isNotSet(data)) return this;
    this.data = Object.assign(this.data || {}, data);
    return this;
  }

  setError(error = { ...defaultError }) {
    if (isDefaultError(error)) return this;
    this.error = Object.assign(this.error || {}, error);
    return this;
  }

  setErrorMessage(message) {
    if (isNotSet(message)) return this;
    this.error = Object.assign(this.error || {}, { message });
    return this;
  }

  setErrorCode(code) {
    if (isNotSet(code)) return this;
    this.error = Object.assign(this.error || {}, { code });
    return this;
  }
};
