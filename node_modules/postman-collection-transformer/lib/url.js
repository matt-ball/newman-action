/**
 * @fileoverview
 *
 * Copied the URL parser and unparser from the SDK.
 * @todo Move this into it's own separate module, and make the SDK and transformer depend on it.
 */

const _ = require('lodash').noConflict(),

    E = '',
    HASH = '#',
    SLASH = '/',
    COLON = ':',
    EQUALS = '=',
    AMPERSAND = '&',
    AUTH_SEPARATOR = '@',
    QUERY_SEPARATOR = '?',
    DOMAIN_SEPARATOR = '.',
    PROTOCOL_SEPARATOR = '://',
    PROTOCOL_SEPARATOR_WITH_BACKSLASH = ':\\\\',

    STRING = 'string',
    FUNCTION = 'function',
    SAFE_REPLACE_CHAR = '_',
    CLOSING_SQUARE_BRACKET = ']',
    URL_PROPERTIES_ORDER = ['protocol', 'auth', 'host', 'port', 'path', 'query', 'hash'],

    REGEX_HASH = /#/g,
    REGEX_EQUALS = /=/g, // eslint-disable-line no-div-regex
    REGEX_AMPERSAND = /&/g,
    REGEX_EXTRACT_VARS = /{{[^{}]*[.:/?#@&\]][^{}]*}}/g,
    REGEX_EXTRACT_VARS_IN_PARAM = /{{[^{}]*[&#=][^{}]*}}/g,

    /**
     * Percent encode reserved chars (&, = and #) in the given string.
     *
     * @private
     * @param {String} str - String to encode
     * @param {Boolean} encodeEquals - Encode '=' if true
     * @returns {String} - Encoded string
     */
    encodeReservedChars = function (str, encodeEquals) {
        if (!str) {
            return str;
        }

        // eslint-disable-next-line lodash/prefer-includes
        str.indexOf(AMPERSAND) !== -1 && (str = str.replace(REGEX_AMPERSAND, '%26'));

        // eslint-disable-next-line lodash/prefer-includes
        str.indexOf(HASH) !== -1 && (str = str.replace(REGEX_HASH, '%23'));

        // eslint-disable-next-line lodash/prefer-includes
        encodeEquals && str.indexOf(EQUALS) !== -1 && (str = str.replace(REGEX_EQUALS, '%3D'));

        return str;
    },

    /**
     * Normalize the given param string by percent-encoding the reserved chars
     * such that it won't affect the re-parsing.
     *
     * @note `&`, `=` and `#` needs to be percent-encoded otherwise re-parsing
     * the same URL string will generate different output
     *
     * @private
     * @param {String} str - Parameter string to normalize
     * @param {Boolean} encodeEquals - If true, encode '=' while normalizing
     * @returns {String} - Normalized param string
     */
    normalizeParam = function (str, encodeEquals) {
        // bail out if the given sting is null or empty
        if (!(str && typeof str === STRING)) {
            return str;
        }

        // bail out if the given string does not include reserved chars
        // eslint-disable-next-line lodash/prefer-includes
        if (str.indexOf(AMPERSAND) === -1 && str.indexOf(HASH) === -1) {
            // eslint-disable-next-line lodash/prefer-includes
            if (!(encodeEquals && str.indexOf(EQUALS) !== -1)) {
                return str;
            }
        }

        var normalizedString = '',
            pointer = 0,
            variable,
            match,
            index;

        // find all the instances of {{<variable>}} which includes reserved chars
        while ((match = REGEX_EXTRACT_VARS_IN_PARAM.exec(str)) !== null) {
            variable = match[0];
            index = match.index;

            // [pointer, index) string is normalized + the matched variable
            normalizedString += encodeReservedChars(str.slice(pointer, index), encodeEquals) + variable;

            // update the pointer
            pointer = index + variable.length;
        }

        // whatever left in the string is normalized as well
        if (pointer < str.length) {
            normalizedString += encodeReservedChars(str.slice(pointer), encodeEquals);
        }

        return normalizedString;
    },

    /**
     * Unparses a single query param into a string.
     *
     * @private
     * @param {Object} obj - The query parameter object to be unparsed.
     * @returns {String} - The unparsed query string.
     */
    unparseQueryParam = function (obj) {
        if (!obj) { return E; }

        var key = obj.key,
            value = obj.value,
            result;

        if (typeof key === STRING) {
            result = normalizeParam(key, true);
        }
        else {
            result = E;
        }

        if (typeof value === STRING) {
            result += EQUALS + normalizeParam(value);
        }

        return result;
    },

    /**
     * Parses a single query param string into an object.
     *
     * @private
     * @param {String} param - The query parameter string to be parsed.
     * @returns {Object} - The parsed query object.
     */
    parseQueryParam = function (param) {
        if (param === E) {
            return { key: null, value: null };
        }

        var index = _.indexOf(param, EQUALS);

        if (index < 0) {
            return { key: param, value: null };
        }

        return {
            key: param.substr(0, index),
            value: param.substr(index + 1)
        };
    };

/**
 * Tracks replacements done on a string and expose utility to patch replacements.
 *
 * @note due to performance reasons, it doesn't store the original string or
 * perform ops on the string.
 *
 * @private
 * @constructor
 */
function ReplacementTracker () {
    this.replacements = [];
    this._offset = 0;
    this._length = 0;
}

/**
 * Add new replacement to track.
 *
 * @param {String} value - value being replaced
 * @param {Number} index - index of replacement
 */
ReplacementTracker.prototype.add = function (value, index) {
    this.replacements.push({
        value: value,
        index: index - this._offset
    });

    this._offset += value.length - 1; // - 1 replaced character
    this._length++;
};

/**
 * Returns the total number of replacements.
 *
 * @returns {Number}
 */
ReplacementTracker.prototype.count = function () {
    return this._length;
};

/**
 * Finds the lower index of replacement position for a given value using inexact
 * binary search.
 *
 * @param {Number} index - index to search in replacements
 * @returns {Number}
 */
ReplacementTracker.prototype._findLowerIndex = function (index) {
    var length = this.count(),
        start = 0,
        end = length - 1,
        mid;

    while (start <= end) {
        mid = (start + end) >> 1; // divide by 2

        if (this.replacements[mid].index >= index) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }

    return start >= length ? -1 : start;
};

/**
 * Patches a given string by apply all the applicable replacements done in the
 * given range.
 *
 * @param {String} input - string to apply replacements on
 * @param {Number} beginIndex - index from where to apply replacements in input
 * @param {Number} endIndex - index until where to apply replacements in input
 * @returns {String}
 */
ReplacementTracker.prototype._applyInString = function (input, beginIndex, endIndex) {
    var index,
        replacement,
        replacementIndex,
        replacementValue,
        offset = 0,
        length = this.count();

    // bail out if no replacements are done in the given range OR empty string
    if (!input || (index = this._findLowerIndex(beginIndex)) === -1) {
        return input;
    }

    do {
        replacement = this.replacements[index];
        replacementIndex = replacement.index;
        replacementValue = replacement.value;

        // bail out if all the replacements are done in the given range
        if (replacementIndex >= endIndex) {
            break;
        }

        replacementIndex = offset + replacementIndex - beginIndex;
        input = input.slice(0, replacementIndex) + replacementValue + input.slice(replacementIndex + 1);
        offset += replacementValue.length - 1;
    } while (++index < length);

    return input;
};

/**
 * Patches a given string or array of strings by apply all the applicable
 * replacements done in the given range.
 *
 * @param {String|String[]} input - string or splitted string to apply replacements on
 * @param {Number} beginIndex - index from where to apply replacements in input
 * @param {Number} endIndex - index until where to apply replacements in input
 * @returns {String|String[]}
 */
ReplacementTracker.prototype.apply = function (input, beginIndex, endIndex) {
    var i,
        ii,
        length,
        _endIndex,
        _beginIndex,
        value = input;

    // apply replacements in string
    if (typeof input === STRING) {
        return this._applyInString(input, beginIndex, endIndex);
    }

    // apply replacements in the splitted string (Array)
    _beginIndex = beginIndex;

    // traverse all the segments until all the replacements are patched
    for (i = 0, ii = input.length; i < ii; ++i) {
        value = input[i];
        _endIndex = _beginIndex + (length = value.length);

        // apply replacements applicable for individual segment
        input[i] = this._applyInString(value, _beginIndex, _endIndex);
        _beginIndex += length + 1; // + 1 separator
    }

    return input;
};

/**
 * Normalize the given string by replacing the variables which includes
 * reserved characters in its name.
 * The replaced characters are added to the given replacement tracker instance.
 *
 * @private
 * @param {String} str - string to normalize
 * @param {ReplacementTracker} replacements - tracker to store replacements
 * @returns {String}
 */
function normalizeVariables (str, replacements) {
    var normalizedString = E,
        pointer = 0, // pointer till witch the string is normalized
        variable,
        match,
        index;

    // find all the instances of {{<variable>}} which includes reserved chars
    // "Hello {{user#name}}!!!"
    //  ↑ (pointer = 0)
    while ((match = REGEX_EXTRACT_VARS.exec(str)) !== null) {
        // {{user#name}}
        variable = match[0];

        // starting index of the {{variable}} in the string
        // "Hello {{user#name}}!!!"
        //        ↑ (index = 6)
        index = match.index;

        // [pointer, index) string is normalized + the safe replacement character
        // "Hello " + "_"
        normalizedString += str.slice(pointer, index) + SAFE_REPLACE_CHAR;

        // track the replacement done for the {{variable}}
        replacements.add(variable, index);

        // update the pointer
        // "Hello {{user#name}}!!!"
        //                     ↑ (pointer = 19)
        pointer = index + variable.length;
    }

    // avoid slicing the string in case of no matches
    if (pointer === 0) {
        return str;
    }

    // whatever left in the string is normalized as well
    if (pointer < str.length) {
        // "Hello _" + "!!!"
        normalizedString += str.slice(pointer);
    }

    return normalizedString;
}

/**
 * Update replaced characters in the URL object with its original value.
 *
 * @private
 * @param {Object} url - url to apply replacements on
 * @param {ReplacementTracker} replacements - tracked replacements
 */
function applyReplacements (url, replacements) {
    var i,
        ii,
        prop;

    // traverse each URL property in the given order
    for (i = 0, ii = URL_PROPERTIES_ORDER.length; i < ii; ++i) {
        prop = url[URL_PROPERTIES_ORDER[i]];

        // bail out if the given property is not set (undefined or E)
        if (!(prop && prop.value)) {
            continue;
        }

        prop.value = replacements.apply(prop.value, prop.beginIndex, prop.endIndex);
    }

    return url;
}

/**
 * Parses the input string by decomposing the URL into constituent parts,
 * such as path, host, port, etc.
 *
 * @private
 * @param {String} urlString - url string to parse
 * @returns {Object}
 */
function url_parse (urlString) {
    // trim leading whitespace characters
    urlString = String(urlString).trimLeft();

    var url = {
            protocol: { value: undefined, beginIndex: 0, endIndex: 0 },
            auth: { value: undefined, beginIndex: 0, endIndex: 0 },
            host: { value: undefined, beginIndex: 0, endIndex: 0 },
            port: { value: undefined, beginIndex: 0, endIndex: 0 },
            path: { value: undefined, beginIndex: 0, endIndex: 0 },
            query: { value: undefined, beginIndex: 0, endIndex: 0 },
            hash: { value: undefined, beginIndex: 0, endIndex: 0 }
        },
        parsedUrl = {
            raw: urlString,
            protocol: undefined,
            auth: undefined,
            host: undefined,
            port: undefined,
            path: undefined,
            query: undefined,
            hash: undefined
        },
        replacements = new ReplacementTracker(),
        pointer = 0,
        length,
        index,
        port;

    // bail out if input string is empty
    if (!urlString) {
        return parsedUrl;
    }

    // normalize the given string
    urlString = normalizeVariables(urlString, replacements);
    length = urlString.length;

    // 1. url.hash
    if ((index = urlString.indexOf(HASH)) !== -1) {
        // extract from the back
        url.hash.value = urlString.slice(index + 1);
        url.hash.beginIndex = pointer + index + 1;
        url.hash.endIndex = pointer + length;

        urlString = urlString.slice(0, (length = index));
    }

    // 2. url.query
    if ((index = urlString.indexOf(QUERY_SEPARATOR)) !== -1) {
        // extract from the back
        url.query.value = urlString.slice(index + 1).split(AMPERSAND);
        url.query.beginIndex = pointer + index + 1;
        url.query.endIndex = pointer + length;

        urlString = urlString.slice(0, (length = index));
    }

    // 3. url.protocol
    if ((index = urlString.indexOf(PROTOCOL_SEPARATOR)) !== -1) {
        // extract from the front
        url.protocol.value = urlString.slice(0, index);
        url.protocol.beginIndex = pointer;
        url.protocol.endIndex = pointer + index;

        urlString = urlString.slice(index + 3);
        length -= index + 3;
        pointer += index + 3;
    }
    // protocol can be separated using :\\ as well
    else if ((index = urlString.indexOf(PROTOCOL_SEPARATOR_WITH_BACKSLASH)) !== -1) {
        // extract from the front
        url.protocol.value = urlString.slice(0, index);
        url.protocol.beginIndex = pointer;
        url.protocol.endIndex = pointer + index;

        urlString = urlString.slice(index + 3);
        length -= index + 3;
        pointer += index + 3;
    }

    // 4. url.path
    urlString = urlString.replace(/\\/g, '/'); // sanitize path
    if ((index = urlString.indexOf(SLASH)) !== -1) {
        // extract from the back
        url.path.value = urlString.slice(index + 1).split(SLASH);
        url.path.beginIndex = pointer + index + 1;
        url.path.endIndex = pointer + length;

        urlString = urlString.slice(0, (length = index));
    }

    // 5. url.auth
    if ((index = urlString.lastIndexOf(AUTH_SEPARATOR)) !== -1) {
        // extract from the front
        url.auth.value = urlString.slice(0, index);
        url.auth.beginIndex = pointer;
        url.auth.endIndex = pointer + index;

        urlString = urlString.slice(index + 1);
        length -= index + 1;
        pointer += index + 1;

        // separate username:password
        if ((index = url.auth.value.indexOf(COLON)) === -1) {
            url.auth.value = [url.auth.value];
        }
        else {
            url.auth.value = [url.auth.value.slice(0, index), url.auth.value.slice(index + 1)];
        }
    }

    // 6. url.port
    if ((index = urlString.lastIndexOf(COLON)) !== -1 &&
        // eslint-disable-next-line lodash/prefer-includes
        (port = urlString.slice(index + 1)).indexOf(CLOSING_SQUARE_BRACKET) === -1
    ) {
        // extract from the back
        url.port.value = port;
        url.port.beginIndex = pointer + index + 1;
        url.port.endIndex = pointer + length;

        urlString = urlString.slice(0, (length = index));
    }

    // 7. url.host
    if (urlString) {
        url.host.value = urlString.split(DOMAIN_SEPARATOR);
        url.host.beginIndex = pointer;
        url.host.endIndex = pointer + length;
    }

    // apply replacements back, if any
    replacements.count() && applyReplacements(url, replacements);

    // finally, prepare parsed url
    parsedUrl.protocol = url.protocol.value;
    parsedUrl.auth = url.auth.value;
    parsedUrl.host = url.host.value;
    parsedUrl.port = url.port.value;
    parsedUrl.path = url.path.value;
    parsedUrl.query = url.query.value;
    parsedUrl.hash = url.hash.value;

    return parsedUrl;
}

/* eslint-disable object-shorthand */
module.exports = {
    parse: function (url) {
        if (typeof url !== STRING) {
            url = '';
        }

        url = url_parse(url);

        var pathVariables,
            pathVariableKeys = {};

        if (url.auth) {
            url.auth = {
                user: url.auth[0],
                password: url.auth[1]
            };
        }

        if (url.query) {
            url.query = url.query.map(parseQueryParam);
        }

        // extract path variables
        pathVariables = _.transform(url.path, function (res, segment) {
            // check if the segment has path variable prefix followed by the variable name and
            // the variable is not already added in the list.
            if (_.startsWith(segment, COLON) &&
                segment !== COLON &&
                !pathVariableKeys[segment]) {
                pathVariableKeys[segment] = true;
                res.push({ key: segment.slice(1) }); // remove path variable prefix.
            }
        }, []);
        url.variable = pathVariables.length ? pathVariables : undefined;

        return url;
    },

    unparse: function (urlObj) {
        var rawUrl = E,
            path,
            queryString,
            authString,
            firstEnabledParam = true;

        if (urlObj.protocol) {
            rawUrl += (_.endsWith(urlObj.protocol, PROTOCOL_SEPARATOR) ?
                urlObj.protocol : urlObj.protocol + PROTOCOL_SEPARATOR);
        }

        if (urlObj.auth) {
            if (typeof urlObj.auth.user === STRING) {
                authString = urlObj.auth.user;
            }

            if (typeof urlObj.auth.password === STRING) {
                !authString && (authString = E);
                authString += COLON + urlObj.auth.password;
            }

            if (typeof authString === STRING) {
                rawUrl += authString + AUTH_SEPARATOR;
            }
        }

        if (urlObj.host) {
            rawUrl += (_.isArray(urlObj.host) ? urlObj.host.join(DOMAIN_SEPARATOR) : urlObj.host.toString());
        }

        if (typeof _.get(urlObj.port, 'toString') === FUNCTION) {
            rawUrl += COLON + urlObj.port.toString();
        }

        if (urlObj.path) {
            path = (_.isArray(urlObj.path) ? urlObj.path.join(SLASH) : urlObj.path.toString());
            rawUrl += (_.startsWith(path, SLASH) ? path : SLASH + path);
        }

        if (urlObj.query && urlObj.query.length) {
            queryString = _.reduce(urlObj.query, function (accumulator, param) {
                // ignore disabled params
                if (!param || param.disabled) {
                    return accumulator;
                }

                // don't add '&' for the very first enabled param
                if (firstEnabledParam) {
                    firstEnabledParam = false;
                }
                // add '&' before concatenating param
                else {
                    accumulator += AMPERSAND;
                }

                return accumulator + unparseQueryParam(param);
            }, E);

            // either all the params are disabled or a single param is like { key: '' } (http://localhost?)
            // in that case, query separator ? must be included in the raw URL.
            if (queryString === E && firstEnabledParam) {
                // unset querystring if there are no enabled params
                queryString = undefined;
            }

            if (typeof queryString === STRING) {
                rawUrl += QUERY_SEPARATOR + queryString;
            }
        }

        if (typeof urlObj.hash === STRING) {
            rawUrl += HASH + urlObj.hash;
        }

        return rawUrl;
    }
};
