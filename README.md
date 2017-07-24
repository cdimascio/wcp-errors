# api-errors

Package for normalizing api errors using the following format:

*(work in progress)*

```json
{
  "trace": "w7vrpmm9479z2o0hxhex0ttgat4qv9ev",
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
npm install api-errors
```

## Usage

```JavaScript
const { notFound } = require('api-errors');

byId(req, res, next) {
    FindStuff.byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.json(notFound());
      });
  }

```

## License 
MIT