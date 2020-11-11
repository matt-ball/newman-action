/* eslint-disable object-shorthand */
var _ = require('lodash'),
    url = require('./url'),
    rnd = Math.random;

module.exports = {
    // @todo: Add support for a `json` type once it becomes available
    typeMap: {
        string: 'string',
        boolean: 'boolean',
        number: 'number'
    },

    /**
     * Returns unique GUID on every call as per pseudo-number RFC4122 standards.
     *
     * @type {function}
     * @returns {string}
     */
    uid: function () {
        var n,
            r,
            E = '',
            H = '-'; // r = result , n = numeric variable for positional checks

        // if "n" is not 9 or 14 or 19 or 24 return a random number or 4
        // if "n" is not 15 generate a random number from 0 to 15
        // `(n ^ 20 ? 16 : 4)` := unless "n" is 20, in which case a random number from 8 to 11 otherwise 4
        //
        // in other cases (if "n" is 9,14,19,24) insert "-"
        // eslint-disable-next-line curly
        for (r = n = E; n++ < 36; r += n * 51 & 52 ? (n ^ 15 ? 8 ^ rnd() * (n ^ 20 ? 16 : 4) : 4).toString(16) : H);

        return r;
    },

    urlparse: function (u) {
        return url.parse(u);
    },

    urlunparse: function (urlObj) {
        return url.unparse(urlObj);
    },

    /**
     * A generic utility method to sanitize variable transformations across collection formats.
     *
     * @param {Object} entity - A generic object that could contain variable data.
     * @param {?Object} options - The set of options for variable handling.
     * @param {?Object} options.fallback - The fallback values to be used if no variables are present.
     * @param {?Boolean} options.noDefaults - When set to true, id will be retained.
     * @param {?Boolean} options.retainEmptyValues - When set to true, empty property values will be set to ''
     * instead of being deleted.
     * @param {Object} [modifiers] - A set of behavioral modifiers for variable handling.
     * @param {Boolean} [modifiers.isV1=false] - When set to true, looks for the pathVariableData property as well.
     * @returns {Object[]} - The set of sanitized entity level variables.
     */
    handleVars: function (entity, options, modifiers) {
        !options && (options = {});

        var self = this,
            noDefaults = options.noDefaults,
            isV1 = modifiers && modifiers.isV1,
            retainEmpty = options.retainEmptyValues,
            source = entity && (entity.variables || entity.variable || (isV1 && entity.pathVariableData)),
            fallback = options.fallback && options.fallback.values,
            result = _.map(source || fallback, function (item) {
                var result = {
                    id: (noDefaults || item.id) ? item.id : self.uid(),
                    key: item.key || item.id,
                    value: item.value
                };

                item.type && (result.type = item.type === 'text' ? 'string' : item.type);
                item.disabled && (result.disabled = true);

                if (item.description) { result.description = item.description; }
                else if (retainEmpty) { result.description = null; }

                return result;
            });

        if (result.length) { return result; }
    },

    /**
     * Performs auth cleansing common to all sorts of auth transformations.
     *
     * @param {Object} entity - The wrapped auth entity to be cleaned.
     * @param {?Object} options - The set of options for the current auth cleansing operation.
     * @param {?Boolean} [options.excludeNoauth=false] - When set to true, noauth is set to null.
     * @returns {Object|*} - The processed auth data.
     */
    cleanAuth: function (entity, options) {
        !options && (options = {});

        var auth = entity && entity.auth;

        if (auth === null) { return null; } // eslint-disable-line security/detect-possible-timing-attacks
        if (!(auth && auth.type)) { return; }
        if (auth.type === 'noauth') {
            return options.excludeNoauth ? null : { type: 'noauth' };
        }

        return auth;
    },

    cleanEmptyValue: function (entity, property, retainEmpty) {
        if (_.has(entity, property) && !entity[property]) {
            retainEmpty ? (entity[property] = null) : (delete entity[property]);
        }

        return entity;
    },

    /**
     * Transforms an array of auth params to their object equivalent.
     *
     * @param {Object} entity - The wrapper object for the array of auth params.
     * @param {?Object} options - The set of options for the current auth cleansing operation.
     * @param {?Boolean} [options.excludeNoauth=false] - When set to true, noauth is set to null.
     * @returns {*}
     */
    authArrayToMap: function (entity, options) {
        var type,
            result,
            self = this,
            auth = self.cleanAuth(entity, options);

        if (!auth) { return auth; }

        result = { type: (type = auth.type) };

        if (type !== 'noauth') {
            result[type] = _.transform(auth[type], function (result, param) {
                result[param.key] = param.value;
            }, {});
        }

        return result;
    },

    /**
     * Transforms an object of auth params to their array equivalent.
     *
     * @param {Object} entity - The wrapper object for the array of auth params.
     * @param {?Object} options - The set of options for the current auth cleansing operation.
     * @param {?Boolean} [options.excludeNoauth=false] - When set to true, noauth is set to null.
     * @returns {*}
     */
    authMapToArray: function (entity, options) {
        var type,
            params,
            result,
            self = this,
            auth = self.cleanAuth(entity, options);

        if (!auth) { return auth; }

        result = { type: (type = auth.type) };

        if (type !== 'noauth') {
            // @todo: Handle all non _ prefixed properties, ala request bodies
            params = _.map(auth[type], function (value, key) {
                return {
                    key: key,
                    value: value,
                    type: self.typeMap[typeof value] || 'any'
                };
            });

            params.length && (result[type] = params);
        }

        return result;
    },

    /**
     * Sanitizes a collection SDK compliant auth list.
     *
     * @param {Object} entity - The wrapper entity for the auth manifest.
     * @param {?Object} options - The set of options for the current auth cleansing operation.
     * @param {?Boolean} [options.excludeNoauth=false] - When set to true, noauth is set to null.
     * @returns {Object[]} - An array of raw collection SDK compliant auth parameters.
     */
    sanitizeAuthArray: function (entity, options) {
        var type,
            result,
            self = this,
            auth = self.cleanAuth(entity, options);

        if (!auth) { return auth; }

        result = { type: (type = auth.type) };

        if (type !== 'noauth') {
            result[type] = _.map(auth[type], function (param) {
                return {
                    key: param.key,
                    value: param.value,
                    type: (param.type === 'text' ? 'string' : param.type) || self.typeMap[typeof param.value] || 'any'
                };
            });
        }

        return result;
    },

    /**
     * A helper function to determine if the provided v1 entity has legacy properties.
     *
     * @private
     * @param {Object} entityV1 - The v1 entity to be checked for the presence of legacy properties.
     * @param {String} type - The type of property to be adjudged against.
     * @returns {Boolean|*} - A flag to indicate the legacy property status of the passed v1 entity.
     */
    notLegacy: function (entityV1, type) {
        if (!entityV1) { return; }

        switch (type) {
            case 'event':
                return !(entityV1.tests || entityV1.preRequestScript);
            case 'auth':
                return _.has(entityV1, 'auth') && !(_.has(entityV1, 'currentHelper') || entityV1.helperAttributes);
            default:
                return true;
        }
    },

    authMappersFromLegacy: {
        apikeyAuth: function (oldParams) {
            return oldParams && {
                key: oldParams.key,
                value: oldParams.value,
                in: oldParams.in
            };
        },
        basicAuth: function (oldParams) {
            return oldParams && {
                username: oldParams.username,
                password: oldParams.password,
                saveHelperData: oldParams.saveToRequest,
                showPassword: false
            };
        },
        bearerAuth: function (oldParams) {
            return oldParams && {
                token: oldParams.token
            };
        },
        digestAuth: function (oldParams) {
            return oldParams && {
                algorithm: oldParams.algorithm,
                username: oldParams.username,
                realm: oldParams.realm,
                password: oldParams.password,
                nonce: oldParams.nonce,
                nonceCount: oldParams.nonceCount,
                clientNonce: oldParams.clientNonce,
                opaque: oldParams.opaque,
                qop: oldParams.qop,
                disableRetryRequest: oldParams.disableRetryRequest
            };
        },
        oAuth1: function (oldParams) {
            return oldParams && {
                consumerKey: oldParams.consumerKey,
                consumerSecret: oldParams.consumerSecret,
                token: oldParams.token,
                tokenSecret: oldParams.tokenSecret,
                signatureMethod: oldParams.signatureMethod,
                timestamp: oldParams.timestamp,
                nonce: oldParams.nonce,
                version: oldParams.version,
                realm: oldParams.realm,
                addParamsToHeader: oldParams.header,
                autoAddParam: oldParams.auto,
                addEmptyParamsToSign: oldParams.includeEmpty
            };
        },
        hawkAuth: function (oldParams) {
            return oldParams && {
                authId: oldParams.hawk_id,
                authKey: oldParams.hawk_key,
                algorithm: oldParams.algorithm,
                user: oldParams.user,
                saveHelperData: oldParams.saveToRequest,
                nonce: oldParams.nonce,
                extraData: oldParams.ext,
                appId: oldParams.app,
                delegation: oldParams.dlg,
                timestamp: oldParams.timestamp
            };
        },
        ntlmAuth: function (oldParams) {
            return oldParams && {
                username: oldParams.username,
                password: oldParams.password,
                domain: oldParams.domain,
                workstation: oldParams.workstation,
                disableRetryRequest: oldParams.disableRetryRequest
            };
        },
        oAuth2: function (oldParams) {
            return oldParams && {
                accessToken: oldParams.accessToken,
                addTokenTo: oldParams.addTokenTo,
                callBackUrl: oldParams.callBackUrl,
                authUrl: oldParams.authUrl,
                accessTokenUrl: oldParams.accessTokenUrl,
                clientId: oldParams.clientId,
                clientSecret: oldParams.clientSecret,
                clientAuth: oldParams.clientAuth,
                grantType: oldParams.grantType,
                scope: oldParams.scope,
                username: oldParams.username,
                password: oldParams.password,
                tokenType: oldParams.tokenType,
                redirectUri: oldParams.redirectUri,
                refreshToken: oldParams.refreshToken
            };
        },
        // Only exists for consistency
        awsSigV4: function (oldParams) {
            return oldParams;
        }
    },
    authMappersFromCurrent: {
        apikeyAuth: function (newParams) {
            return newParams && {
                id: 'apikey',
                key: newParams.key,
                value: newParams.value,
                in: newParams.in
            };
        },
        basicAuth: function (newParams) {
            return newParams && {
                id: 'basic',
                username: newParams.username,
                password: newParams.password,
                saveToRequest: newParams.saveHelperData
            };
        },
        bearerAuth: function (newParams) {
            return newParams && {
                id: 'bearer',
                token: newParams.token
            };
        },
        digestAuth: function (newParams) {
            return newParams && {
                id: 'digest',
                algorithm: newParams.algorithm,
                username: newParams.username,
                realm: newParams.realm,
                password: newParams.password,
                nonce: newParams.nonce,
                nonceCount: newParams.nonceCount,
                clientNonce: newParams.clientNonce,
                opaque: newParams.opaque,
                qop: newParams.qop,
                disableRetryRequest: newParams.disableRetryRequest
            };
        },
        oAuth1: function (newParams) {
            return newParams && {
                id: 'oAuth1',
                consumerKey: newParams.consumerKey,
                consumerSecret: newParams.consumerSecret,
                token: newParams.token,
                tokenSecret: newParams.tokenSecret,
                signatureMethod: newParams.signatureMethod,
                timestamp: newParams.timeStamp || newParams.timestamp,
                nonce: newParams.nonce,
                version: newParams.version,
                realm: newParams.realm,
                header: newParams.addParamsToHeader,
                auto: newParams.autoAddParam,
                includeEmpty: newParams.addEmptyParamsToSign
            };
        },
        hawkAuth: function (newParams) {
            return newParams && {
                id: 'hawk',
                hawk_id: newParams.authId,
                hawk_key: newParams.authKey,
                algorithm: newParams.algorithm,
                user: newParams.user,
                saveToRequest: newParams.saveHelperData,
                nonce: newParams.nonce,
                ext: newParams.extraData,
                app: newParams.appId,
                dlg: newParams.delegation,
                timestamp: newParams.timestamp
            };
        },
        ntlmAuth: function (newParams) {
            return newParams && {
                id: 'ntlm',
                username: newParams.username,
                password: newParams.password,
                domain: newParams.domain,
                workstation: newParams.workstation,
                disableRetryRequest: newParams.disableRetryRequest
            };
        },
        oAuth2: function (newParams) {
            return newParams && {
                id: 'oAuth2',
                accessToken: newParams.accessToken,
                addTokenTo: newParams.addTokenTo,
                callBackUrl: newParams.callBackUrl,
                authUrl: newParams.authUrl,
                accessTokenUrl: newParams.accessTokenUrl,
                clientId: newParams.clientId,
                clientSecret: newParams.clientSecret,
                clientAuth: newParams.clientAuth,
                grantType: newParams.grantType,
                scope: newParams.scope,
                username: newParams.username,
                password: newParams.password,
                tokenType: newParams.tokenType,
                redirectUri: newParams.redirectUri,
                refreshToken: newParams.refreshToken
            };
        },
        // Only exists for consistency
        awsSigV4: function (newParams) {
            return newParams;
        }
    },

    /**
     * Validate protocolProfileBehavior property's value.
     *
     * @param {Object} source - A generic object that could contain the protocolProfileBehavior property.
     * @param {?Object} destination - The destination object that needs the addition of protocolProfileBehavior.
     * @returns {Boolean} - A Boolean value to decide whether to include the property or not.
     */
    addProtocolProfileBehavior: function (source, destination) {
        var behavior = source && source.protocolProfileBehavior;

        if (!(behavior && typeof behavior === 'object')) { return false; }

        destination && (destination.protocolProfileBehavior = behavior);

        return true;
    }
};
