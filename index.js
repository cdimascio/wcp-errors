const errors = require('./lib/http.errors');
const ApiError = require('./lib/api.error');

module.exports = Object.assign({ ApiError }, errors);
