const ApiError = require('./api.error');

exports.badRequest = function(message, error, target) {
  return new ApiError({
    statusCode: 400,
    code: 'bad_request',
    message: message || 'bad request',
    error,
    target,
  });
};

exports.notFound = function(message, error, target) {
  return new ApiError({
    statusCode: 404,
    code: 'not_found',
    message: message || 'not found',
    error,
    target,
  });
};

exports.unAuthorized = function(message, error, target) {
  return new ApiError({
    statusCode: 401,
    code: 'unauthorized',
    message: message || 'unauthorized',
    error,
    target,
  });
};

exports.methodNotAllowed = function(message, error, target) {
  return new ApiError({
    statusCode: 405,
    code: 'method_not_allowed',
    message: message || 'method not allowed',
    error,
    target,
  });
};

exports.notAcceptable = function(message, error, target) {
  return new ApiError({
    statusCode: 406,
    code: 'not_acceptable',
    message: message || 'not acceptable',
    error,
    target,
  });
};

exports.conflict = function(message, error, target) {
  return new ApiError({
    statusCode: 409,
    code: 'conflict',
    message: message || 'conflict',
    error,
    target,
  });
};

exports.requestEntityTooLarge = function(message, error, target) {
  return new ApiError({
    statusCode: 413,
    code: 'request_entity_too_large',
    message: message || 'request entity too large',
    error,
    target,
  });
};

exports.unsupportedMediaType = function(message, error, target) {
  return new ApiError({
    statusCode: 415,
    code: 'unsupported_media_type',
    message: message || 'unsupported media type',
    error,
    target,
  });
};

exports.internalServerError = function(message, error, target) {
  return new ApiError({
    statusCode: 500,
    code: 'internal_server_error',
    message: message || 'internal server error',
    target,
    error,
  });
};
