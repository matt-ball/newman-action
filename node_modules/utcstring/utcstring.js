/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const UTC_BASE = [
  "(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)",
  ",\\s",
  "\\d{2}\\s", //day of month
  "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)",
  "\\s",
  "\\d{4}", //year
  "\\s",
  "\\d{2}:\\d{2}:\\d{2}\\sGMT" //time
].join('');

const UTC_EXACT = new RegExp("^" + UTC_BASE + "$");
const UTC_CONTAINS = new RegExp(UTC_BASE);


function utc(date) {
  return (date || new Date()).toUTCString();
}

function is(str) {
  return UTC_EXACT.test(str);
}

function has(str) {
  return UTC_CONTAINS.test(str);
}

function match(str) {
  return UTC_CONTAINS.exec(str);
}

function get(str) {
  return match(str)[0];
}

function from(str) {
  if (is(str)) {
    return new Date(Date.parse(str));
  }
}

utc.is = is;
utc.has = has;
utc.match = match;
utc.get = get;
utc.from = from;
utc.EXACT = UTC_EXACT;
utc.CONTAINS = UTC_CONTAINS;

module.exports = utc;
