# dbug

[![Build Status](https://travis-ci.org/seanmonstar/dbug.png?branch=master)](https://travis-ci.org/seanmonstar/dbug)
[![NPM version](https://badge.fury.io/js/dbug.png)](http://badge.fury.io/js/dbug)

A drop-in replacement for [debug][], for slightly more utility.

```js
var dbug = require('dbug')('foo:bar');

dbug('just like debug'); // except goes to stdout, not stderr
dbug(new Error('also like debug'));

// additional methods
dbug.info('info');
dbug.warn('warning');
dbug.error('red alert');
```

Just like debug, `dbug` won't do anything unless the `DEBUG` env variable matches the `dbug` logger, but with slightly more lenient matching.

```
DEBUG=*
DEBUG=foo,quux
DEBUG=foo // also acts as foo:*
```

A user script wanting to dynamically enable or disable can do it a
couple ways:

```js
require('dbug').env = 'foo,quux'; // just like ENV var
var foo = require('dbug')('foo');
foo.enabled = true;
```

[debug]: https://npmjs.org/package/debug
