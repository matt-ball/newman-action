/**
 * @fileoverview
 *
 * Copied the URL parser and unparser from the SDK.
 * @todo Move this into it's own separate module, and make the SDK and transformer depend on it.
 */

var _ = require('lodash').noConflict(),

    /**
     * Unparses a single query param into a string.
     *
     * @param {Object} param - The query parameter object to be unparsed.
     * @returns {String} - The unparsed query string.
     */
    unparseQueryParam = function (param) {
        if (!param || param.disabled) { return ''; }
        var unparsed = param.key || '';

        // if the value is not falsy, then we add the value
        // @note - The "param.value != null" check is basically !_.isNil(). (isNil is not available in lodash v3.x)
        // This is the right thing to use here.
        (param.value !== null) && (unparsed += ('=' + (param.value || '')));

        return unparsed;
    },

    E = '',
    PATH_SEPARATOR = '/',
    DOMAIN_SEPARATOR = '.',
    AUTH_SEPARATOR = ':',
    PATH_VARIABLE_IDENTIFIER = ':',

    GET_0 = '[0]',
    GET_1 = '[1]',
    MATCH_1 = '$1',

    regexes = {
        extractProtocol: /^([^:?]+):\/\/([^?#/:]+|$)/,
        extractHost: /^([^?#/]+)/,
        extractHostAuth: /^([^@]+)@/,
        extractPort: /:([^:]*)$/,
        extractPath: /.*?(?=\?|#|$)/,
        trimPath: /^\/((.+))$/,
        extractQuery: /^\?([^#]+)/,
        extractSearch: /#(.+)$/,
        splitDomain: /\.(?![^{]*\}{2})/g
    };

/* eslint-disable object-shorthand */
module.exports = {
    parse: function (url) {
        url = _.trim(url);
        var pathVariables,
            p = {
                raw: url
            };

        // extract the protocol
        p.protocol = _.get(url.match(regexes.extractProtocol), GET_1);
        _.isString(p.protocol) && (url = url.substr(p.protocol.length + 3)); // remove that damn protocol from url

        // extract the host
        p.host = _.get(url.match(regexes.extractHost), GET_1);

        // if host exists there are a lot you can extract from it
        if (_.isString(p.host)) {
            url = url.substr(p.host.length); // remove host from url

            if ((p.auth = _.get(p.host.match(regexes.extractHostAuth), GET_1))) {
                p.host = p.host.substr(p.auth.length + 1); // remove auth from host
                p.auth = p.auth.split(AUTH_SEPARATOR);
                p.auth = {
                    user: p.auth[0],
                    password: p.auth[1]
                };
            }

            // extract the port from the host
            p.port = _.get(p.host.match(regexes.extractPort), GET_1);
            p.port && (p.host = p.host.substring(0, p.host.length - p.port.length - 1)); // remove port from url

            p.host = _.trim(p.host, DOMAIN_SEPARATOR).split(regexes.splitDomain); // split host by subdomains
        }

        // extract the path
        p.path = _.get(url.match(regexes.extractPath), GET_0);
        if (_.isString(p.path)) {
            url = url.substr(p.path.length);
            p.path && (p.path = p.path.replace(regexes.trimPath, MATCH_1)); // remove leading slash for valid path
            // if path is blank string, we set it to undefined, if '/' then single blank string array
            // eslint-disable-next-line no-nested-ternary
            p.path = p.path ? (p.path === PATH_SEPARATOR ? [E] : p.path.split(PATH_SEPARATOR)) : undefined;
        }

        // extract the query string
        p.query = _.get(url.match(regexes.extractQuery), GET_1);
        if (_.isString(p.query)) {
            url = url.substr(p.query.length + 1);
            p.query = p.query.split('&').map(function (q) {
                if (!q) { return { key: null, value: null }; }

                var index = _.indexOf(q, '=');

                return (index < 0) ? { key: q, value: null } : { key: q.substr(0, index), value: q.substr(index + 1) };
            });
        }

        // extract the hash
        p.hash = _.get(url.match(regexes.extractSearch), GET_1);

        // extract path variables
        pathVariables = _.transform(p.path, function (res, segment) {
            // check if the segment has path variable prefix followed by the variable name.
            if (_.startsWith(segment, PATH_VARIABLE_IDENTIFIER) && segment !== PATH_VARIABLE_IDENTIFIER) {
                res.push({ key: segment.slice(1) }); // remove path variable prefix.
            }
        }, []);
        p.variable = pathVariables.length ? pathVariables : undefined;

        return p;
    },

    unparse: function (urlObj) {
        var rawUrl = '',
            path,
            queryString;

        if (urlObj.protocol) {
            rawUrl += (_.endsWith(urlObj.protocol, '://') ? urlObj.protocol : urlObj.protocol + '://');
        }

        if (urlObj.auth && urlObj.auth.user) { // If the user is not specified, ignore the password.
            rawUrl += ((urlObj.auth.password) ?
                urlObj.auth.user + ':' + urlObj.auth.password : urlObj.auth.user) + '@'; // ==> username:password@
        }

        if (urlObj.host) {
            rawUrl += (_.isArray(urlObj.host) ? urlObj.host.join('.') : urlObj.host.toString());
        }

        if (urlObj.port) {
            rawUrl += ':' + urlObj.port.toString();
        }

        if (urlObj.path) {
            path = (_.isArray(urlObj.path) ? urlObj.path.join('/') : urlObj.path.toString());
            rawUrl += (_.startsWith(path, '/') ? path : '/' + path);
        }

        if (urlObj.query && urlObj.query.length) {
            queryString = _.reduce(urlObj.query, function (accumulator, param) {
                var unparsed = unparseQueryParam(param);

                if (accumulator.length > 0 && unparsed) {
                    accumulator += '&';
                }
                accumulator += unparsed;

                return accumulator;
            }, '');

            rawUrl += '?' + queryString;
        }

        if (urlObj.hash) {
            rawUrl += '#' + urlObj.hash;
        }

        return rawUrl;
    }
};
