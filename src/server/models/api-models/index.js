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
    this.error(opts.error);
    this.data(opts.data);
  }

  data(data) {
    if (isNotSet(data)) return this;
    this.data = Object.assign(this.data || {}, data);
    this.success();
    return this;
  }

  error(error = defaultError || '') {
    if (isNotSet(error) || isDefaultError(error)) return this;
    if (typeof error === 'string') {
      return this.errorMessage(error);
    }
    this.error = Object.assign(this.error || {}, error);
    this.failed();
    return this;
  }

  errorMessage(message) {
    if (isNotSet(message)) return this;
    this.error = Object.assign(this.error || {}, { message });
    this.failed();
    return this;
  }

  errorCode(code) {
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
