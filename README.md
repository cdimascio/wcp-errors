# wcp-errors

Package for normalizing api errors using the following format:

![](https://github.com/cdimascio/wcp-errors/blob/master/assets/error.png?raw=true)

## Install

```shell
npm install wcp-errors
```

## Usage

```JavaScript
const { notFound } = require('wcp-errors');
badRequest('first name is required.');
```

## Examples (ExpressJS)

```javascript
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

app.get('/multiple_errors', function(req, res, next) {
  next(
    badRequest('Eek! A bad request').add({
      code: 'bad_request',
      message: ':-(',
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
```

## Run the examples

- `cd example/express`
- `npm install`
- `npm start`

Open a browser and run

- [http://localhost:3000/not_found](http://localhost:3000/not_found)
- [http://localhost:3000/bad_request](http://localhost:3000/bad_request)
- [http://localhost:3000/multiple_errors](http://localhost:3000/multiple_errors)
- [http://localhost:3000/throws](http://localhost:3000/throws)

## APIs

### Basic

All basic Apis take the following three **_optional_** arguments:

- `message`: a string describing the error
- `error`: an `Error` object
- `target`: an object with shape `{ type, name }`

### All APIs

```javascript
badRequest();
conflict();
forbidden();
internalServerError();
methodNotAllowed();
notAcceptable();
notFound();
requestEntityTooLarge();
unAuthorized();
unsupportedMediaType();
```

Optionally, add additional errors to a wcp error

```javascript
// Add additional errors to the error
const br = badRequest();

br.add({
  code = 'validation_error', // optional
  message = 'last name required.', // optional
  target, // optional target
  error // optional error object
})
```

### Raw

The raw API is only necessary in circumstances where the [Basic](#basic) are not sufficient.

```javascript
 const { ApiError } = require('wcp-errors');

// Manually create a new API error
const e = new ApiError({
  statusCode: 409,
  code: 'conflict',
  message,
  error, // optional error
  target, // optional target
}).add({
  code = 'error', // optional
  message = 'unxepected error 1', // optional
  target, // optional target
  error // optional error object
}).add({
  code = 'error', // optional
  message = 'unxepected error 2', // optional
  target, // optional target
  error // optional error object
})
```

## TODO

Create dedicated Express middleware, such that a user does not have to write the fallback error handler middleware.

ex:

```javascript
app.use(function(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err);
  } else {
    res.status(500).json(internalServerError(err.message, err));
  }
});
```

## License

MIT
