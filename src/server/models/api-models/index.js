const { isString, isNotSet } = require('../../utils');


const defaultError = { code: 0, message: '', stack: '' };
function isErrorNotSet(error) {
  return Object.keys(error).length === Object.keys(defaultError).length
    && Object.keys(error).every(key => error[key] === defaultError[key]);
}

module.exports = class {
  constructor(options = { error: { ...defaultError }, data: undefined, result: undefined }) {
    this.setError(options.error);
    this.setData(options.data);
    if (!isNotSet(options.result)) this.setResult(options.result);
  }

  setData(data) {
    if (isNotSet(data)) return this;
    this.data = Object.assign(this.data || {}, data);
    return this;
  }

  setError(error = { ...defaultError }) {
    if (isErrorNotSet(error)) return this;
    if (isString(error)) {
      this.setErrorMessage(error);
    } else {
      this.error = Object.assign(this.error || {}, error);
    }
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

  /**
   *
   * @param { ["success" || "failed"] } result
   */
  setResult(result = '') {
    this.result = result;
    return this;
  }
};
