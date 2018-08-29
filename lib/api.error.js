const uuidv4 = require('uuid/v4');
const assert = require('assert');

module.exports = class ApiError {
  constructor({
    statusCode = 500,
    code = 'error',
    message = 'unxepected_error',
    target,
    error,
  }) {
    assert(statusCode, 'statusCode required');
    if (!target) delete this.target;

    this.error = error;
    this.trace = uuidv4();
    this.statusCode = statusCode;
    this.errors = [];
    this.add({
      code,
      message,
      target,
    });
  }

  add({ code = 'error', message = 'unxepected_error', target, error }) {
    this._validate({ code, message, target });
    this.errors.push({
      code,
      message,
      target,
    });
  }

  _validate({ code, message, target }) {
    assert(code, 'code required');
    assert(message, 'message required');
    if (target) {
      assert(target.type, 'target.type required');
      assert(target.name, 'target.name required');
    }
  }

  toJSON() {
    return {
      trace: this.trace,
      errors: this.errors,
    };
  }
};
