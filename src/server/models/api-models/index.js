const { isString } = require('../../utils');

module.exports = class {
  constructor(error, data) {
    this.error = {};
    this.setError(error);
    this.data = {};
    this.setData(data);
  }

  setData(data) {
    this.data = Object.assign(this.data, data);
  }

  setError(error) {
    if (isString(error)) {
      this.setErrorMessage(error);
    } else {
      Object.assign(this.error, error);
    }
  }

  setErrorMessage(message) {
    Object.assign(this.error, { message });
  }

  setErrorCode(code) {
    Object.assign(this.error, { code });
  }
};
