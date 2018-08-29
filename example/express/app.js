const express = require('express');
const {
  ApiError,
  badRequest,
  internalServerError,
  notFound,
} = require('wcp-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Not found example
app.get('/not_found', function(req, res, next) {
  next(notFound());
});

// Bad request example
app.get('/bad_request', function(req, res, next) {
  next(
    badRequest('Eek! A bad request', new Error(), {
      type: 'parameter',
      name: 'Eek',
    })
  );
});

// Throw! example
app.get('/throws', function(req, res, next) {
  throw new Error('Oh noes!');
});

// Error handler
app.use(function(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err);
  } else {
    res.status(500).json(internalServerError(err.message, err));
  }
});

module.exports = app;
