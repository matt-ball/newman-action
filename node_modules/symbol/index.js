/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var defineProperty = Object.defineProperty;
function next() {
  return "@@symbol:" + String(Math.random()).slice(2);
}


function Symbol(desc) {
  if (this instanceof Symbol) {
    throw new TypeError("Symbol is not a constructor");
  }
  var _code = next();
  var sym = Object.create(Symbol.prototype, {
    _desc: {
      value: desc,
      enumerable: false,
      writable: false,
      configurable: false
    },
    _code: {
      value: _code,
      enumerable: false,
      writable: false,
      configurable: false
    }
  });
  defineProperty(Object.prototype, _code, {
    set: function(value) {
      defineProperty(this, _code, {
        value: value,
        enumerable: false,
        writable: true
      });
    }
  });
  return sym;
}

Symbol.prototype.toString = function toString() {
  return this._code;
};

var globalSymbolRegistry = {};
Symbol.for = function symbolFor(key) {
  key = String(key);
  return globalSymbolRegistry[key] || (globalSymbolRegistry[key] = Symbol(key));
};

Symbol.keyFor = function keyFor(sym) {
  if (!(sym instanceof Symbol)) {
    throw new TypeError("Symbol.keyFor requires a Symbol argument");
  }
  for (var key in globalSymbolRegistry) {
    if (globalSymbolRegistry[key] === sym) {
      return key;
    }
  }
  return undefined;
};

if (process.env.__SYMBOLJS_POLYFILL_FORCE) {
  module.exports = Symbol;
} else {
  module.exports = global.Symbol || Symbol;
}
