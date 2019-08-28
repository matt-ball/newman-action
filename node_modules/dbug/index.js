/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/*jshint camelcase: false*/

const tty = require('tty').isatty(2);

const colors = {
  debug: 6,
  info: 2,
  warn: 3,
  error: 1
};

var dbug;

var isColored = (function envDebugColor(colorString) {
  try {
    return colorString ? !!JSON.parse(colorString) : tty;
  } catch (ex) {
    return false;
  }
})(process.env.DEBUG_COLORS);

function parseDEBUG(debugStr) {
  var names = [];
  var skips = [];
  debugStr
    .split(/[\s,]+/)
    .forEach(function(name){
      name = name.replace('*', '.*?');
      if (name[0] === '-') {
        skips.push(new RegExp('^' + name.substr(1) + '$'));
      } else {
        names.push(new RegExp('^' + name + '(:.+)?$'));
      }
    });

  return {
    names: names,
    skips: skips
  };
}

var env = process.env.DEBUG || '';
var parsedEnv = parseDEBUG(env);

function isEnabled(name) {
  var env = parsedEnv;
  var match = env.skips.some(function(re){
    return re.test(name);
  });
  if (match) {
    return false;
  }

  match = env.names.some(function(re){
    return re.test(name);
  });

  if (!match) {
    return false;
  }
  return true;
}

function colored(name, level, args) {
  var c = colors[level];
  args[0] = [
    '  ',
    name + ':',
    '\x1b[9' + c + 'm' + level.toUpperCase() + '\x1b[39m ',
    '\x1b[90m' + args[0]
  ].join('');
  args.push('\x1b[39m');
  console[level === 'debug' ? 'log' : level].apply(console, args);
}

function plain(name, level, args) {
  args[0] = new Date().toUTCString()
    + ' ' + name + ':' + level.toUpperCase() + ' ' + args[0];
  console[level === 'debug' ? 'log' : level].apply(console, args);
}

function disabled() {}

var log = isColored ? colored : plain;

colored.__dbug = plain.__dbug = disabled.__dbug = true;



var dbuggers = {};
function define(dbugger, name) {
  function logAt(level) {
    return function dbug() {
      var args = new Array(arguments.length);
      var i = args.length;
      while (i--) {
        args[i] = arguments[i];
      }
      log(name, level, args);
    };
  }
  Object.defineProperty(dbugger, 'enabled', {
    configurable: true,
    get: function getEnabled() {
      return dbugger.__enabled;
    },
    set: function setEnabled(val) {
      dbugger.__enabled = !!val;
      if (dbugger.__enabled) {
        dbugger.debug = logAt('debug');
        dbugger.info = logAt('info');
        dbugger.warn = logAt('warn');
        dbugger.error = logAt('error');
        dbugger.log = dbugger.debug;
      } else {
        dbugger.debug =
        dbugger.info =
        dbugger.warn =
        dbugger.error =
        dbugger.log =
          disabled;
      }
    }
  });

  Object.defineProperty(dbugger, 'colored', {
    configurable: true,
    get: function getColored() {
      return dbug.colored;
    },
    set: function setColored(val) {
      dbug.colored = val;
    }
  });

  dbugger.enabled = isEnabled(name);

  dbuggers[name] = dbugger;
}

function dbugger(name) {
  if (dbuggers[name]) {
    return dbuggers[name];
  }
  var dbugger = function dbug() {
    if (dbugger.__enabled) {
      dbugger.debug.apply(this, arguments);
    }
  };

  define(dbugger, name);

  return dbugger;
}


function enableDbuggers() {
  for (var name in dbuggers) {
    if (isEnabled(name)) {
      dbuggers[name].enabled = true;
    } else {
      dbuggers[name].enabled = false;
    }
  }
}

dbug = function dbug(name) {
  return dbugger(name);
};

Object.defineProperty(dbug, 'colored', {
  get: function getColored() {
    return isColored;
  },
  set: function setColored(val) {
    isColored = !!val;
    if (!log.__dbug) {
      return;
    }
    if (isColored) {
      log = colored;
    } else {
      log = plain;
    }
  }
});

Object.defineProperty(dbug, 'env', {
  get: function getEnv() {
    return env;
  },
  set: function setEnv(val) {
    env = String(val || '');
    parsedEnv = parseDEBUG(env);
    enableDbuggers();
  }
});

// woah. this is a private API. don't rely on it. i can blow it up
// any time. kablamo!
Object.defineProperty(dbug, '__log', {
  enumerable: false,
  get: function() {
    return log;
  },
  set: function setLog(val) {
    log = val;
  }
});

dbug.version = require('./package.json').version;

function decimalVersion(verStr) {
  var parts = verStr.split('.');
  var v = 0;
  try {
    v = parseInt(parts[0], 10) * 10000
      + parseInt(parts[1], 10) * 100;
    if (parts[2].indexOf('-') !== -1) {
      parts = parts[2].split('-');
      v += parseInt(parts[0], 10);
      v += parseInt(parts[1], 16) / 1000; // a1, b1, b2, etc
    } else {
      v += parseInt(parts[2], 10);
    }
  } catch (e) {
    return -1;
  }
}

// old way, doesn't use properties, so i can't slurp that well
if (global.__dbug__1) {
  global.__dbug__1.__log = function __dbug() {
    log.apply(null, arguments);
  };
}
global.__dbug__1 = dbug;


// merge different versions to use the same dbug instance
if (global.__dbug__) {
  if (decimalVersion(dbug.version) > decimalVersion(global.__dbug__.version)) {
    dbuggers = global.__dbug__.__dbuggers;
    for (var k in dbuggers) {
      dbuggers[k] = define(dbuggers[k], k);
    }
    global.__dbug__ = dbug;
  }
} else {
  global.__dbug__ = dbug;
}
module.exports = global.__dbug__;
