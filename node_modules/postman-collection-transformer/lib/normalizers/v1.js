/* eslint-disable object-shorthand */
var _ = require('lodash').noConflict(),
    v1Common = require('../common/v1'),
    v2Common = require('../common/v2'),
    util = require('../util'),
    url = require('../url'),

    Builders = function (options) {
        this.options = options || {};
    },
    script = function (entityV1, listen, key) {
        return {
            listen: listen,
            script: {
                type: 'text/javascript',
                exec: _.isString(entityV1[key]) ? entityV1[key].split('\n') : entityV1[key]
            }
        };
    },

    authIdMap = {
        apikey: 'apikeyAuth',
        awsSigV4: 'awsSigV4',
        basic: 'basicAuth',
        bearer: 'bearerAuth',
        digest: 'digestAuth',
        hawk: 'hawkAuth',
        ntlm: 'ntlmAuth',
        oAuth1: 'oAuth1',
        oAuth2: 'oAuth2'
    },

    /**
     * Normalizes a list of v1 entities.
     *
     * @param {Object[]} entities - The list of entities to be normalized.
     * @param {?Object} [options] - The set of options for the current normalization.
     * @param {?Boolean} [options.retainEmptyValues=false] - When set to true, appropriate empty values are set to ''
     * instead of being removed.
     * @returns {Object[]} - The normalized list of entities.
     */
    normalizeEntities = function (entities, options) {
        var retainEmpty = options && options.retainEmptyValues;

        _.forEach(entities, function (entity) {
            util.cleanEmptyValue(entity, 'description', retainEmpty);
        });

        return entities;
    };

_.assign(Builders.prototype, {

    /**
     * Normalizes inherited v1 auth manifests.
     *
     * @param {Object} entityV1 - A v1 compliant wrapped auth manifest.
     * @param {?Object} options - The set of options for the current auth cleansing operation.
     * @param {?Boolean} [options.includeNoauth=false] - When set to true, noauth is set to ''.
     *
     * @returns {Object} - A v1 compliant set of auth helper attributes.
     */
    auth: function (entityV1, options) {
        if (!entityV1) { return; }

        var auth,
            params,
            mapper,
            currentHelper,
            helperAttributes,
            prioritizeV2 = this.options.prioritizeV2;

        // if prioritize v2 is true, use auth as the source of truth
        if (util.notLegacy(entityV1, 'auth') || (entityV1.auth && prioritizeV2)) {
            return util.sanitizeAuthArray(entityV1, options);
        }
        if ((entityV1.currentHelper === null) || (entityV1.currentHelper === 'normal')) { return null; }

        currentHelper = entityV1.currentHelper;
        helperAttributes = entityV1.helperAttributes;

        // if noDefaults is false and there is no currentHelper, bail out
        if (!(currentHelper || this.options.noDefaults)) { return; }
        // if there is a currentHelper without helperAttributes, bail out.
        if (currentHelper && !helperAttributes) { return this.options.noDefaults ? undefined : null; }

        !currentHelper && (currentHelper = authIdMap[helperAttributes && helperAttributes.id]);
        auth = { type: v1Common.authMap[currentHelper] };
        mapper = util.authMappersFromLegacy[currentHelper];

        // @todo: Change this to support custom auth helpers
        mapper && helperAttributes && (params = mapper(helperAttributes)) && (auth[auth.type] = params);

        return util.authMapToArray({ auth: auth }, options);
    },

    /**
     * Normalizes v1 collection events.
     *
     * @param {Object} entityV1 - The v1 entity to be normalized.
     * @returns {Array|null} - The normalized events.
     */
    events: function (entityV1) {
        if (!entityV1) { return; }
        if ((util.notLegacy(entityV1, 'event') || this.options.prioritizeV2) && !_.isEmpty(entityV1.events)) {
            // @todo: Improve this to order prerequest events before test events
            _.forEach(entityV1.events, function (event) {
                !event.listen && (event.listen = 'test');

                if (event.script) {
                    !event.script.type && (event.script.type = 'text/javascript');

                    // @todo: Add support for src
                    _.isString(event.script.exec) && (event.script.exec = event.script.exec.split('\n'));
                }
            });

            return entityV1.events;
        }

        var events = [];

        entityV1.preRequestScript && events.push(script(entityV1, 'prerequest', 'preRequestScript'));
        entityV1.tests && events.push(script(entityV1, 'test', 'tests'));

        if (events.length) { return events; }

        // retain `null` events
        if (entityV1.events === null) { return null; }
    },

    /**
     * Facilitates sanitized variable transformations across all levels for v1 collection normalization.
     *
     * @param {Object} entity - The wrapper object containing variable definitions.
     * @param {?Object} options - The set of options for the current variable transformation.
     * @param {?Object} options.fallback - The set of fallback values to be applied when no variables exist.
     * @param {?Boolean} options.noDefaults - When set to true, no defaults are applied.
     * @param {?Boolean} options.retainIds - When set to true, ids are left as is.
     * @returns {Object[]} - The set of sanitized variables.
     */
    variables: function (entity, options) {
        return util.handleVars(entity, options);
    },

    /**
     * Sanitizes request v1 data.
     *
     * @param {Object} requestV1 - The wrapper v1 request object around the data list to be sanitized.
     * @returns {Object[]} - The normalized list of request body parameters.
     */
    data: function (requestV1) {
        if (!requestV1) { return; }

        var mode = requestV1.dataMode,
            noDefaults = this.options.noDefaults,
            retainEmptyValues = this.options.retainEmptyValues;

        if ((!mode || mode === 'binary') && !noDefaults) {
            return retainEmptyValues ? [] : undefined;
        }
        if (!requestV1.data) { return; }

        _.isArray(requestV1.data) && _.forEach(requestV1.data, function (datum) {
            if (datum.type === 'file' && (_.has(datum, 'value') || !noDefaults)) {
                datum.value = (_.isString(datum.value) || _.isArray(datum.value)) ? datum.value : null;
            }

            util.cleanEmptyValue(datum, 'description', retainEmptyValues);
        });

        return requestV1.data;
    },

    /**
     * Normalizes a list of header data from the incoming raw v1 request.
     *
     * @param {Object} requestV1 - The raw v1 request object.
     * @returns {Object[]} - The normalized list of header datum values.
     */
    headerData: function (requestV1) {
        if (!requestV1) { return; }
        if (requestV1.headers && _.isEmpty(requestV1.headerData)) {
            // this converts a newline concatenated string of headers to an array, so there are no descriptions
            return v1Common.parseHeaders(requestV1.headers, true);
        }

        // however, if non empty headerData already exists, sanitize it.
        return normalizeEntities(requestV1.headerData, this.options);
    },

    queryParams: function (requestV1) {
        if (!requestV1) { return; }

        var urlObj;

        if (!requestV1.queryParams) {
            return requestV1.url && (urlObj = url.parse(requestV1.url)) && urlObj.query;
        }

        return normalizeEntities(requestV1.queryParams, this.options);
    },

    /**
     * Facilitates sanitized variable transformations across all levels for v1 collection normalization.
     *
     * @param {Object} entity - The wrapper object containing variable definitions.
     * @param {?Object} [options] - The set of options for the current variable transformation.
     * @param {?Object} [options.fallback] - The set of fallback values to be applied when no variables exist.
     * @param {?Boolean} [options.noDefaults] - When set to true, no defaults are applied.
     * @param {?Boolean} [options.retainEmptyValues] - When set to true, empty values are set to null instead of being
     * removed.
     * @param {?Boolean} [options.retainIds] - When set to true, ids are left as is.
     * @returns {Object[]} - The set of sanitized variables.
     */
    pathVariableData: function (entity, options) {
        return util.handleVars(entity, options, { isV1: true });
    },

    /**
     * Normalizes a potentially raw v1 request object.
     *
     * @param {Object} requestV1 - The potentially raw v1 request object.
     * @param {?String} collectionId - A unique identifier for the v1 collection.
     * @param {?Boolean} [skipResponses=false] - When set to true, saved responses will be excluded from the result..
     * @returns {Object} - The normalized v1 request object.
     */
    request: function (requestV1, collectionId, skipResponses) {
        if (!requestV1) { return; }

        var map,
            auth,
            tests,
            events,
            mapper,
            variables,
            self = this,
            helperAttributes,
            preRequestScript,
            options = this.options,
            noDefaults = options.noDefaults,
            retainEmpty = options.retainEmptyValues,
            varOpts = { noDefaults: options.noDefaults },
            units = ['queryParams', 'pathVariableData', 'headerData', 'data'];

        !skipResponses && units.push('responses');

        // if noDefaults is true, do not replace the id
        // else
        // if id is falsy, replace the id
        // if retainIds is false, replace the id
        !((options.retainIds && requestV1.id) || options.noDefaults) && (requestV1.id = util.uid());
        util.cleanEmptyValue(requestV1, 'description', retainEmpty);

        units.forEach(function (unit) {
            var result = self[unit](requestV1, self.options);

            result && (requestV1[unit] = result);
        });

        if (requestV1.dataDisabled) { requestV1.dataDisabled = true; }
        else if (retainEmpty) { requestV1.dataDisabled = false; }
        else { delete requestV1.dataDisabled; }

        // remove invalid protocolProfileBehavior property from requestV1
        !util.addProtocolProfileBehavior(requestV1) && delete requestV1.protocolProfileBehavior;

        collectionId && !noDefaults && (requestV1.collectionId = collectionId);

        // normalized v1 requests should not have falsy helperAttributes or currentHelper
        if (_.has(requestV1, 'currentHelper')) {
            (requestV1.currentHelper === 'normal') && (requestV1.currentHelper = null);

            if (!requestV1.currentHelper) {
                (requestV1.currentHelper !== null) && (requestV1.currentHelper = null);

                // @todo: Should currentHelper be recreated from helperAttributes.id if falsy?
                requestV1.helperAttributes = null;
            }
        }

        auth = self.auth(requestV1);

        if (auth) {
            requestV1.auth = auth;

            if (_.has(requestV1, 'helperAttributes') && !requestV1.currentHelper) {
                requestV1.currentHelper = authIdMap[auth.type];
            }
        }
        else if (auth === null) { // eslint-disable-line security/detect-possible-timing-attacks
            requestV1.auth = requestV1.currentHelper = requestV1.helperAttributes = null;
        }
        else { delete requestV1.auth; }

        events = self.events(requestV1);
        if (events || events === null) {
            requestV1.events = events;
        }
        else {
            delete requestV1.events;
        }

        variables = self.variables(requestV1, varOpts);
        if (variables) {
            requestV1.variables = variables;
        }
        else {
            delete requestV1.variables;
        }

        if (requestV1.auth && (util.notLegacy(requestV1, 'auth') || options.prioritizeV2)) {
            requestV1.currentHelper = v2Common.authMap[requestV1.auth.type];
            (requestV1.currentHelper === null) && (requestV1.helperAttributes = null);

            mapper = util.authMappersFromCurrent[requestV1.currentHelper];

            if (mapper) {
                (map = util.authArrayToMap(requestV1)) && (helperAttributes = mapper(map[requestV1.auth.type]));
                helperAttributes && (requestV1.helperAttributes = helperAttributes);
            }
        }

        if (requestV1.events && (util.notLegacy(requestV1, 'event') || options.prioritizeV2)) {
            tests = preRequestScript = '';

            _.forEach(requestV1.events, function (event) {
                var exec = event && event.script && event.script.exec;

                if (!_.isArray(exec)) { return; }
                if (event.listen === 'prerequest') {
                    preRequestScript += exec.join('\n');
                }
                else if (event.listen === 'test') {
                    tests += exec.join('\n');
                }
            });

            requestV1.preRequestScript = preRequestScript ? preRequestScript : null;
            requestV1.tests = tests ? tests : null;
        }

        // prune
        ['preRequestScript', 'tests'].forEach(function (script) {
            if (_.has(requestV1, script) && !requestV1[script] && requestV1[script] !== null) {
                delete requestV1[script];
            }
        });

        return requestV1;
    },

    /**
     * Normalizes a potentially raw v1 response object.
     *
     * @param {Object} responseV1 - The potentially raw v1 response object.
     * @returns {Object} - The normalized v1 response object.
     */
    response: function (responseV1) {
        var self = this;

        // if noDefaults is true, do not replace the id
        // else
        // if id is falsy, replace the id
        // if retainIds is false, replace the id
        !((self.options.retainIds && responseV1.id) || self.options.noDefaults) && (responseV1.id = util.uid());

        // the true in the next line ensures that we don't recursively go on processing responses in a request.
        responseV1.request = self.request(responseV1.request, undefined, true);

        !responseV1.language && (responseV1.language = 'Text');
        !responseV1.previewType && (responseV1.previewType = 'html');

        _.isEmpty(responseV1.cookies) && (delete responseV1.cookies);

        return responseV1;
    },

    responses: function (requestV1) {
        if (_.isEmpty(requestV1 && requestV1.responses)) { return; }

        var self = this;

        requestV1.responses.forEach(function (response) {
            self.response(response);
        });

        return requestV1.responses;
    },

    /**
     * Normalizes a request order list.
     *
     * @param {Object} entityV1 - An object containing a potentially raw list of folder ids.
     * @returns {Array} - The normalized list of folder ids.
     */
    order: function (entityV1) {
        return !this.options.noDefaults && _.compact(entityV1 && entityV1.order);
    },

    /**
     * Normalizes a folder order list.
     *
     * @param {Object} entityV1 - An object containing a potentially raw list of folder ids.
     * @returns {Array} - The normalized list of folder ids.
     */
    folders_order: function (entityV1) {
        return !this.options.noDefaults && _.compact(entityV1 && entityV1.folders_order);
    },

    /**
     * Normalizes a potentially raw v1 folders list.
     *
     * @param {Object} collectionV1 - The potentially raw v1 collection object.
     * @returns {Object[]} - The normalized v1 collection folders list.
     */
    folders: function (collectionV1) {
        if (_.isEmpty(collectionV1 && collectionV1.folders)) { return; }

        var auth,
            events,
            variables,
            self = this,
            order,
            foldersOrder,
            retainEmpty = self.options.retainEmptyValues,
            varOpts = { noDefaults: self.options.noDefaults };

        _.forEach(collectionV1.folders, function (folder) {
            if (!folder) { return; }

            // if noDefaults is true, do not replace the id
            // else
            // if id is falsy, replace the id
            // if retainIds is false, replace the id
            !((self.options.retainIds && folder.id) || self.options.noDefaults) && (folder.id = util.uid());
            util.cleanEmptyValue(folder, 'description', retainEmpty);

            auth = self.auth(folder);

            !_.isEmpty((order = self.order(folder))) && (folder.order = order);
            !_.isEmpty((foldersOrder = self.folders_order(folder))) && (folder.folders_order = foldersOrder);

            (auth || (auth === null)) && (folder.auth = auth);
            (events = self.events(folder)) && (folder.events = events);
            (variables = self.variables(folder, varOpts)) && (folder.variables = variables);
        });

        return _.compact(collectionV1.folders);
    },

    /**
     * Normalizes a potentially raw v1 request object.
     *
     * @param {Object} collectionV1 - The potentially raw v1 collection object.
     * @returns {Object[]|*} - The normalized v1 request list.
     */
    requests: function (collectionV1) {
        if (_.isEmpty(collectionV1 && collectionV1.requests)) { return; }

        var self = this;

        collectionV1.requests.forEach(function (request) {
            self.request(request);
        });

        return _.compact(collectionV1.requests);
    }
});

module.exports = {

    /**
     * Normalizes a single v1 request.
     *
     * @param {Object} request - The v1 request to be normalized.
     * @param {Object} options - The set of options for the current normalization.
     * @param {?Boolean} [options.mutate=false] - When set to true, normalization is done in place.
     * @param {?Boolean} [options.noDefaults=false] - When set to true, sensible defaults are not added.
     * @param {?Boolean} [options.prioritizeV2=false] - When set to true, v2 style properties are checked first.
     * @param {?Boolean} [options.retainEmptyValues=false] - When set to true, empty values are set to '' instead of
     * being removed.
     * @param {Function} callback - A function that is invoked when the normalization has completed.
     * @returns {*}
     */
    normalizeSingle: function (request, options, callback) {
        var err,
            normalized,
            builders = new Builders(options);

        // At this stage, mutate will not be passed ordinarily. Hence, the falsy nature of options.mutate can be used
        // to selectively clone the request.
        options && !options.mutate && (request = _.cloneDeep(request));

        try { normalized = builders.request(request); }
        catch (e) { err = e; }

        if (callback) { return callback(err, normalized); }

        if (err) { throw err; }

        return normalized;
    },

    /**
     * Normalizes a single v1 response.
     *
     * @param {Object} response - The v1 request to be normalized.
     * @param {Object} options - The set of options for the current normalization.
     * @param {?Boolean} [options.mutate=false] - When set to true, normalization is done in place.
     * @param {?Boolean} [options.noDefaults=false] - When set to true, sensible defaults are not added.
     * @param {?Boolean} [options.prioritizeV2=false] - When set to true, v2 style properties are checked first.
     * @param {?Boolean} [options.retainEmptyValues=false] - When set to true, empty values are set to '' instead of
     * being removed.
     * @param {Function} callback - A function that is invoked when the normalization has completed.
     * @returns {*}
     */
    normalizeResponse: function (response, options, callback) {
        var err,
            normalized,
            builders = new Builders(options);

        // At this stage, mutate will not be passed ordinarily. Hence, the falsy nature of options.mutate can be used
        // to selectively clone the response.
        options && !options.mutate && (response = _.cloneDeep(response));

        try { normalized = builders.response(response); }
        catch (e) { err = e; }

        if (callback) { return callback(err, normalized); }

        if (err) { throw err; }

        return normalized;
    },

    /**
     * Converts a V1 collection to a V2 collection (performs ID replacement, etc as necessary).
     *
     * @param {Object} collection - The v1 collection to be normalized.
     * @param {Object} options - The options for the current normalization sequence.
     * @param {?Boolean} [options.mutate=false] - When set to true, normalization is done in place.
     * @param {?Boolean} [options.noDefaults=false] - When set to true, sensible defaults are not added.
     * @param {?Boolean} [options.prioritizeV2=false] - When set to true, v2 style properties are checked first.
     * @param {?Boolean} [options.retainEmptyValues=false] - When set to true, empty values are set to '' instead of
     * being removed.
     * @param {Function} callback - A function invoked to indicate that the normalization has completed.
     * @returns {*}
     */
    normalize: function (collection, options, callback) {
        // At this stage, mutate will not be passed ordinarily. Hence, the falsy nature of options.mutate can be used
        // to selectively clone the collection.
        options && !options.mutate && (collection = _.cloneDeep(collection));

        var auth,
            authOptions = { excludeNoauth: true },
            builders = new Builders(options),
            retainEmpty = options.retainEmptyValues,
            units = ['events', 'variables', 'order', 'folders_order', 'folders', 'requests'];

        // if noDefaults is true, do not replace the id
        // else
        // if id is falsy, replace the id
        // if retainIds is false, replace the id
        !((options.retainIds && collection.id) || options.noDefaults) && (collection.id = util.uid());

        util.cleanEmptyValue(collection, 'description', retainEmpty);

        try {
            auth = builders.auth(collection, authOptions);
            if (auth) {
                collection.auth = auth;
            }
            else {
                delete collection.auth;
            }

            units.forEach(function (unit) {
                var result;

                if (!_.isEmpty(result = builders[unit](collection)) || (unit === 'folders')) {
                    collection[unit] = result;
                }
            });
        }
        catch (e) {
            if (callback) { return callback(e, null); }
            throw e;
        }

        if (callback) { return callback(null, collection); }

        return collection;
    }
};
