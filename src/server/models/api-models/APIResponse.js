const HttpErrors = require('http-errors');
const { isNotSet } = require('../../utils');

const defaultError = {
  code: 400,
  message: '',
  stack: ''
};

function isDefaultError(error) {
  return !error || Object.keys(defaultError).every(key => error[key] === defaultError[key]);
}


module.exports = class APIResponse {
  static get throwError() {
    return HttpErrors;
  }

  static get SUCCESS() {
    return {
      ok: true
    };
  }

  static get FAILED() {
    return {
      ok: false
    };
  }

  constructor(opts = {
    error: defaultError,
    data: undefined
  }) {
    this.setError(opts.error);
    this.setData(opts.data);
  }

  setData(data) {
    if (isNotSet(data)) return this;
    this.data = data;
    this.success();
    return this;
  }

  static setData(data) {
    return new APIResponse().setData(data);
  }

  setError(error = defaultError || '') {
    if (isNotSet(error) || isDefaultError(error)) return this;
    if (typeof error === 'string') {
      return this.setErrorMessage(error);
    }
    if (typeof error === 'number') {
      return this.setErrorCode(error);
    }
    this.error = Object.assign(this.error || {}, error);
    this.setErrorMessage(error.message);
    this.setErrorStack(error.stack);
    this.failed();
    return this;
  }

  static setError(error = defaultError || '') {
    return new APIResponse().setError(error);
  }

  setErrorMessage(message) {
    if (isNotSet(message)) return this;
    this.error = Object.assign(this.error || {}, { message });
    this.failed();
    return this;
  }

  static setErrorMessage(message) {
    return new APIResponse().setErrorMessage(message);
  }

  setErrorCode(code) {
    if (isNotSet(code)) return this;
    const message = '';
    this.error = Object.assign(this.error || {}, { code, message });
    this.failed();
    return this;
  }

  static setErrorCode(code) {
    return new APIResponse().setErrorCode(code);
  }

  setErrorStack(stack) {
    if (isNotSet(stack)) return this;
    this.error = Object.assign(this.error || {}, { stack });
    this.failed();
    return this;
  }

  static setErrorStack(stack) {
    return new APIResponse().setErrorStack(stack);
  }

  success() {
    this.ok = true;
    return this;
  }

  failed() {
    this.ok = false;
    return this;
  }
};
