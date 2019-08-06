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
    error: defaultError,
    data: undefined
  }) {
    this.setError(opts.error);
    this.setData(opts.data);
  }

  setData(data) {
    if (isNotSet(data)) return this;
    this.data = Object.assign(this.data || {}, data);
    this.success();
    return this;
  }

  setError(error = defaultError || '') {
    if (isNotSet(error) || isDefaultError(error)) return this;
    if (typeof error === 'string') {
      return this.setErrorMessage(error);
    }
    if (typeof error === 'number') {
      return this.setErrorCode(error)
    }
    this.error = Object.assign(this.error || {}, error);
    this.failed();
    return this;
  }

  setErrorMessage(message) {
    if (isNotSet(message)) return this;
    this.error = Object.assign(this.error || {}, { message });
    this.failed();
    return this;
  }

  setErrorCode(code) {
    if (isNotSet(code)) return this;
    this.error = Object.assign(this.error || {}, { code });
    this.failed();
    return this;
  }

  success() {
    this.result = true;
    return this;
  }

  failed() {
    this.result = false;
    return this;
  }
};
