# wcp-errors

Package for normalizing api errors using the following format:

*(work in progress)*

```json
{
  "trace": "dcb12022-ab1c-11e8-98d0-529269fb1459",
  "errors": [
    {
      "code": "bad_request",
      "message": "The `first_name` field is required.",
      "target": {
        "type": "field",
        "name": "first_name"
      }
    }
  ]
}
```

## Install
```shell
npm install wcp-errors
```

## Usage

```JavaScript
const { notFound } = require('wcp-errors');
throw badRequest('first name is required.');
```

## Example
This following example describes how one might return a `404` not found via an ExpressJs request handler.

```JavaScript
const { notFound } = require('wcp-errors');

app.get('/user/:id', (req, res, next) => {
	FindStuff.byId(req.params.id)
	  .then(r => {
	    if (r) res.json(r);
	    else res.json(notFound());
	  });
});
```

## APIs

### Raw

The raw API is only necessary when multiple errors are to be returned in the wcp error response. For scenarios where a single error is to be returned, use the [Basic](#basic) Apis.

```
	const { ApiError } = require('wcp-errors');

  // Manually create a new API error
  const e = new ApiError({
    statusCode: 409,
    code: 'conflict',
    message,
    error, // optional error
    target, // optional target
  });
  
  // Add additional errors to the error
  e.add({ 
  	code = 'error', 
  	message = 'unxepected_error', 
  	target, // optional target 
  	error // optional error object
  })
```

### Basic

All basic Apis take the following three optional arguments: `message, error, target`

ex:

```javascript
const e = new Error();
badRequest({
	message: 'first name is missing', 
	error: e,
	target: {
		type: 'paramater',
		name: 'first name'
	}
});
```

### All APIs

```javascript
badRequest()
conflict()
forbidden()
internalServerError()
methodNotAllowed()
notAcceptable()
notFound()
requestEntityTooLarge()
unAuthorized()
unsupportedMediaType()
```


## License 
MIT