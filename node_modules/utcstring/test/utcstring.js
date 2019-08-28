/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const assert = require('assert');

const utc = require('../');

module.exports = {
  'utc': {
    '()': {
      'returns now in UTC format': function() {
        assert.equal(utc(), new Date().toUTCString());
      },
      'returns passed date in UTC format': function() {
        var d = new Date(Date.now() - 1000000);
        assert.equal(utc(d), d.toUTCString());
      }
    },
    'is': {
      'matches utc strings': function() {
        assert(utc.is(new Date().toUTCString()));
      },
      'does not match partial utc strings': function() {
        assert(!utc.is('Wed, 30 Oct'));
        assert(!utc.is('Wed, 30 October'));
        assert(!utc.is('Wed, 30 Oct 2013'));
        assert(!utc.is('Wed 30 Oct 2013 12:00:00 GMT'));
        assert(!utc.is('Wed, 30 Oct 2013, 12:00'));
      },
      "only matches exact strings": function() {
        assert(!utc.is(utc() + " is a fine day!"));
      }
    },
    'has': {
      'matches strings that contain UTC strings': function() {
        assert(utc.has(utc() + " is a fine day!"));
      }
    },
    'match': {
      'returns a RegExp match against string': function() {
        var m = utc.match("Boy, " + utc() + " is a fine day!");
        assert(m instanceof Array);
        assert.equal(m.length, 1);
      }
    },
    'get': {
      'returns a found UTC string in against string': function() {
        var d = utc();
        assert.equal(utc.get(d + " is poop."), d);
      }
    },
    'from': {
      'parses UTC strings': function() {
        var d = new Date();
        assert(utc.from(d.toUTCString()) instanceof Date);
        assert.equal(utc.from(d.toUTCString()).getYear(), d.getYear());
      }
    }
  }
};
