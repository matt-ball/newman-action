/* eslint-disable object-shorthand */
var _ = require('lodash').noConflict(),
    constants = require('../../constants'),
    v1Common = require('../../common/v1'),
    util = require('../../util'),

    headersCommentPrefix = '//',

    /**
     * A constructor that is capable of being used for one-off conversions of requests, and folders.
     *
     * @param {Object} options - The set of options for builder construction.
     * @class Builders
     * @constructor
     */
    Builders = function (options) {
        this.options = options || {};
    },

    /**
     * Parse formdata & urlencoded request data.
     *   - filter params missing property `key`
     *   - handle file type param value
     *   -cleanup `enabled` & `description`
     *
     * @param {Object[]} data - Data to parse.
     * @param {?Boolean} [retainEmpty] - To retain empty values or not.
     * @returns {Object[]} - Parsed data.
     */
    parseFormData = function (data, retainEmpty) {
        if (!(Array.isArray(data) && data.length)) { return []; }

        var formdata = [],
            i,
            ii,
            param;

        for (i = 0, ii = data.length; i < ii; i++) {
            // clone param to avoid mutating data.
            param = Object.assign({}, data[i]);

            // skip if param is missing property `key`,
            // `key` is a required property, value can be null/undefined.
            // because in a FormParam property lists, key is used for indexing.
            if (_.isNil(param.key)) {
                continue;
            }

            // for file `type`, set `value` to `src`
            if (param.type === 'file' && !param.src && param.value) {
                param.src = (_.isString(param.value) || _.isArray(param.value)) ? param.value : null;
                delete param.value;
            }

            // `hasOwnProperty` check ensures that it don't delete undefined property: `enabled`
            if (Object.prototype.hasOwnProperty.call(param, 'enabled')) {
                // set `disabled` flag if `enabled` is false.
                param.enabled === false && (param.disabled = true);

                delete param.enabled; // cleanup
            }

            // Prevent empty descriptions from showing up in the converted results. This keeps collections clean.
            util.cleanEmptyValue(param, 'description', retainEmpty);

            formdata.push(param);
        }

        return formdata;
    };

_.assign(Builders.prototype, {

    /**
     * Constructs a V2 compatible "info" object from a V1 Postman Collection
     *
     * @param {Object} collectionV1 - A v1 collection to derive collection metadata from.
     * @returns {Object} - The resultant v2 info object.
     */
    info: function (collectionV1) {
        var info = {
            _postman_id: collectionV1.id || util.uid(),
            name: collectionV1.name
        };

        if (collectionV1.description) { info.description = collectionV1.description; }
        else if (this.options.retainEmptyValues) { info.description = null; }

        info.schema = constants.SCHEMA_V2_URL;

        return info;
    },

    /**
     * Facilitates sanitized variable transformations across all levels for v1 collection normalization.
     *
     * @param {Object} entity - The wrapper object containing variable definitions.
     * @param {?Object} options - The set of options for the current variable transformation.
     * @param {?Object} options.fallback - The set of fallback values to be applied when no variables exist.
     * @param {?Boolean} options.noDefaults - When set to true, no defaults are applied.
     * @returns {Object[]} - The set of sanitized variables.
     */
    variable: function (entity, options) {
        return util.handleVars(entity, options);
    },

    /**
     * Constructs a V2 compatible URL object from a V1 request
     *
     * @param {Object} requestV1 - The source v1 request to extract the URL from.
     * @returns {String|Object} - The resultant URL.
     */
    url: function (requestV1) {
        var queryParams = [],
            pathVariables = [],
            traversedVars = {},
            queryParamAltered,
            parsed = util.urlparse(requestV1.url),
            retainEmpty = this.options.retainEmptyValues;

        // add query params
        _.forEach(requestV1.queryParams, function (queryParam) {
            (queryParam.enabled === false) && (queryParam.disabled = true);

            delete queryParam.enabled;

            util.cleanEmptyValue(queryParam, 'description', retainEmpty);

            if (_.has(queryParam, 'equals')) {
                if (queryParam.equals) {
                    (queryParam.value === null) && (queryParam.value = '');
                }
                else {
                    // = is not appended when the value is null. However,
                    // non empty value should be preserved
                    queryParam.value = queryParam.value || null;
                }

                queryParamAltered = true;
                delete queryParam.equals;
            }
            queryParams.push(queryParam);
        });

        // only add query params from URL if not given explicitly
        if (!_.size(queryParams)) {
            // parsed query params are taken from the url, so no descriptions are available from them
            queryParams = parsed.query;
        }

        // Merge path variables
        _.forEach(requestV1.pathVariableData, function (pathVariable) {
            pathVariable = _.clone(pathVariable);
            util.cleanEmptyValue(pathVariable, 'description', retainEmpty);

            pathVariables.push(pathVariable);
            traversedVars[pathVariable.key] = true;
        });
        // pathVariables in v1 are of the form  {foo: bar}, so no descriptions can be obtained from them
        _.forEach(requestV1.pathVariables, function (value, id) {
            !traversedVars[id] && pathVariables.push({
                value: value,
                id: id
            });
        });

        !_.isEmpty(queryParams) && (parsed.query = queryParams);
        !_.isEmpty(pathVariables) && (parsed.variable = pathVariables);

        // If the query params have been altered, update the raw stringified URL
        queryParamAltered && (parsed.raw = util.urlunparse(parsed));

        // return the objectified URL only if query param or path variable descriptions are present, string otherwise
        return (parsed.query || parsed.variable) ? parsed : (parsed.raw || requestV1.url);
    },

    /**
     * Extracts the HTTP Method from a V1 request
     *
     * @param {Object} requestV1 - The v1 request to extract the request method from.
     * @returns {String} - The extracted request method.
     */
    method: function (requestV1) {
        return requestV1.method;
    },

    /**
     * Constructs an array of Key-Values from a raw HTTP Header string.
     *
     * @param {Object} requestV1 - The v1 request to extract header information from.
     * @returns {Object[]} - A list of header definition objects.
     */
    header: function (requestV1) {
        if (_.isArray(requestV1.headers)) {
            return requestV1.headers;
        }

        var headers = [],
            traversed = {},
            headerData = requestV1.headerData || [],
            retainEmpty = this.options.retainEmptyValues;

        _.forEach(headerData, function (header) {
            if (_.startsWith(header.key, headersCommentPrefix) || (header.enabled === false)) {
                header.disabled = true;
                header.key = header.key.replace(headersCommentPrefix, '').trim();
            }

            // prevent empty header descriptions from showing up in converted results. This keeps the collections clean
            util.cleanEmptyValue(header, 'description', retainEmpty);

            delete header.enabled;
            headers.push(header); // @todo Improve this sequence to account for multi-valued headers

            traversed[header.key] = true;
        });

        // requestV1.headers is a string, so no descriptions can be obtained from it
        _.forEach(v1Common.parseHeaders(requestV1.headers), function (header) {
            !traversed[header.key] && headers.push(header);
        });

        return headers;
    },

    /**
     * Constructs a V2 Request compatible "body" object from a V1 Postman request
     *
     * @param {Object} requestV1 - The v1 request to extract the body from.
     * @returns {{mode: *, content: (*|string)}}
     */
    body: function (requestV1) {
        var modes = {
                binary: 'file',
                graphql: 'graphql',
                params: 'formdata',
                raw: 'raw',
                urlencoded: 'urlencoded'
            },
            data = {},
            rawModeData,
            graphqlModeData,
            dataMode = modes[requestV1.dataMode],
            retainEmpty = this.options.retainEmptyValues,
            bodyOptions = {},
            mode,
            // flag indicating that all the props which holds request body data
            // i.e, data (urlencoded, formdata), rawModeData (raw, file) and graphqlModeData (graphql)
            // are empty.
            emptyBody = _.isEmpty(requestV1.data) && _.isEmpty(requestV1.rawModeData) &&
                _.isEmpty(requestV1.graphqlModeData);

        // set body to null if:
        //   1. emptyBody is true and dataMode is unset
        //   2. dataMode is explicitly set to null
        // @note the explicit null check is added to ensure that body is not set
        // in case the dataMode was set to null by the app.
        if ((!dataMode && emptyBody) || requestV1.dataMode === null) {
            return retainEmpty ? null : undefined;
        }

        // set `rawModeData` if its a string
        if (_.isString(requestV1.rawModeData)) {
            rawModeData = requestV1.rawModeData;
        }
        // check if `rawModeData` is an array like: ['rawModeData']
        else if (Array.isArray(requestV1.rawModeData) &&
            requestV1.rawModeData.length === 1 &&
            _.isString(requestV1.rawModeData[0])) {
            rawModeData = requestV1.rawModeData[0];
        }

        // set graphqlModeData if its not empty
        if (!_.isEmpty(requestV1.graphqlModeData)) {
            graphqlModeData = requestV1.graphqlModeData;
        }

        // set data.mode.
        // if dataMode is not set, infer from data or rawModeData or graphqlModeData
        if (dataMode) {
            data.mode = dataMode;
        }
        // at this point we are sure that the body is not empty so let's
        // infer the data mode.
        // @note its possible that multiple body types are set e.g, both
        // rawModeData and graphqlModeData are set. So, the priority will be:
        // raw -> formdata -> graphql (aligned with pre-graphql behaviour).
        //
        // set `formdata` if rawModeData is not set and data is an array
        // `data` takes higher precedence over `rawModeData`.
        else if (!rawModeData && Array.isArray(requestV1.data || requestV1.rawModeData)) {
            data.mode = 'formdata';
        }
        // set `graphql` if graphqlModeData is set
        else if (!rawModeData && graphqlModeData) {
            data.mode = 'graphql';
        }
        // set `raw` mode as default
        else {
            data.mode = 'raw';
        }

        if (data.mode === 'raw') {
            if (rawModeData) {
                data[data.mode] = rawModeData;
            }
            else if (_.isString(requestV1.data)) {
                data[data.mode] = requestV1.data;
            }
            else {
                // empty string instead of retainEmpty check to have parity with other modes.
                data[data.mode] = '';
            }
        }
        else if (data.mode === 'graphql') {
            data[data.mode] = graphqlModeData;
        }
        else if (data.mode === 'file') {
            // rawModeData can be string or undefined.
            data[data.mode] = { src: rawModeData };
        }
        else {
            // parse data for formdata or urlencoded data modes.
            // `rawModeData` is checked in case its of type `data`.
            data[data.mode] = parseFormData(requestV1.data || requestV1.rawModeData, retainEmpty);
        }

        if (requestV1.dataOptions) {
            // Convert v1 mode to v2 mode
            for (mode in modes) {
                if (requestV1.dataOptions[mode]) {
                    bodyOptions[modes[mode]] = requestV1.dataOptions[mode];
                }
            }

            data.options = bodyOptions;
        }

        if (requestV1.dataDisabled) { data.disabled = true; }
        else if (retainEmpty) { data.disabled = false; }

        return data;
    },

    /**
     * Constructs a V2 "events" object from a V1 Postman Request
     *
     * @param {Object} entityV1 - The v1 entity to extract script information from.
     * @returns {Object[]|*}
     */
    event: function (entityV1) {
        if (!entityV1) { return; }

        // if prioritizeV2 is true, events is used as the source of truth
        if ((util.notLegacy(entityV1, 'event') || this.options.prioritizeV2) && !_.isEmpty(entityV1.events)) {
            // in v1, `events` is regarded as the source of truth if it exists, so handle that first and bail out.
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

        // @todo: Extract both flows below into a common method
        if (entityV1.tests) {
            events.push({
                listen: 'test',
                script: {
                    type: 'text/javascript',
                    exec: _.isString(entityV1.tests) ?
                        entityV1.tests.split('\n') :
                        entityV1.tests
                }
            });
        }
        if (entityV1.preRequestScript) {
            events.push({
                listen: 'prerequest',
                script: {
                    type: 'text/javascript',
                    exec: _.isString(entityV1.preRequestScript) ?
                        entityV1.preRequestScript.split('\n') :
                        entityV1.preRequestScript
                }
            });
        }

        return events.length ? events : undefined;
    },

    /**
     * A number of auth parameter names have changed from V1 to V2. This function calls the appropriate
     * mapper function, and creates the V2 auth parameter object.
     *
     * @param {Object} entityV1 - The v1 entity to derive auth information from.
     * @param {?Object} options - The set of options for the current auth cleansing operation.
     * @param {?Boolean} [options.includeNoauth=false] - When set to true, noauth is set to null.
     * @returns {{type: *}}
     */
    auth: function (entityV1, options) {
        if (!entityV1) { return; }
        if ((util.notLegacy(entityV1, 'auth') || this.options.prioritizeV2) && entityV1.auth) {
            return util.authArrayToMap(entityV1, options);
        }
        if (!entityV1.currentHelper || (entityV1.currentHelper === null) || (entityV1.currentHelper === 'normal')) {
            return;
        }

        var params,
            type = v1Common.authMap[entityV1.currentHelper] || entityV1.currentHelper,
            auth = {
                type: type
            };

        // Some legacy versions of the App export Helper Attributes as a string.
        if (_.isString(entityV1.helperAttributes)) {
            try {
                entityV1.helperAttributes = JSON.parse(entityV1.helperAttributes);
            }
            catch (e) {
                return;
            }
        }

        if (entityV1.helperAttributes && util.authMappersFromLegacy[entityV1.currentHelper]) {
            params = util.authMappersFromLegacy[entityV1.currentHelper](entityV1.helperAttributes);
        }

        params && (auth[type] = params);

        return auth;
    },

    /**
     * Creates a V2 format request from a V1 Postman Collection Request
     *
     * @param {Object} requestV1 - The v1 request to be transformed.
     * @returns {Object} - The converted v2 request.
     */
    request: function (requestV1) {
        var self = this,
            request = {},
            retainEmpty = self.options.retainEmptyValues,
            units = ['auth', 'method', 'header', 'body', 'url'];

        units.forEach(function (unit) {
            request[unit] = self[unit](requestV1);
        });

        if (requestV1.description) { request.description = requestV1.description; }
        else if (retainEmpty) { request.description = null; }

        return request;
    },

    /**
     * Converts a V1 cookie to a V2 cookie.
     *
     * @param {Object} cookieV1 - The v1 cookie object to convert.
     * @returns {{expires: string, hostOnly: *, httpOnly: *, domain: *, path: *, secure: *, session: *, value: *}}
     */
    cookie: function (cookieV1) {
        return {
            expires: (new Date(cookieV1.expirationDate * 1000)).toString(),
            hostOnly: cookieV1.hostOnly,
            httpOnly: cookieV1.httpOnly,
            domain: cookieV1.domain,
            path: cookieV1.path,
            secure: cookieV1.secure,
            session: cookieV1.session,
            value: cookieV1.value,
            key: cookieV1.name
        };
    },

    /**
     * Gets the saved request for the given response, and handles edge cases between Apps & Sync
     *
     * Handles a lot of edge cases, so the code is not very clean.
     *
     * The Flow followed here is:
     *
     * If responseV1.requestObject is present
     *      If it is a string
     *          Try parsing it as JSON
     *              If parsed,
     *                  return it
     *              else
     *                  It is a request ID
     * If responseV1.request is present
     *      If it is a string
     *          Try parsing it as JSON
     *              If parsed,
     *                  return it
     *              else
     *                  It is a request ID
     * Look up the collection for the request ID and return it, or return undefined.
     *
     * @param {Object} responseV1 - The v1 response to be converted.
     * @returns {Object} - The converted saved request, in v2 format.
     */
    savedRequest: function (responseV1) {
        var self = this,
            associatedRequestId;

        if (responseV1.requestObject) {
            if (_.isString(responseV1.requestObject)) {
                try {
                    return JSON.parse(responseV1.requestObject);
                }
                catch (e) {
                    // if there was an error parsing it as JSON, it's probably an ID, so store it in the ID variable
                    associatedRequestId = responseV1.requestObject;
                }
            }
            else {
                return responseV1.requestObject;
            }
        }

        if (responseV1.request) {
            if (_.isString(responseV1.request)) {
                try {
                    return JSON.parse(responseV1.request);
                }
                catch (e) {
                    // if there was an error parsing it as JSON, it's probably an ID, so store it in the ID variable
                    associatedRequestId = responseV1.request;
                }
            }
            else {
                return responseV1.request;
            }
        }

        // we have a request ID
        return associatedRequestId && _.get(self, ['cache', associatedRequestId]);
    },

    /**
     * Since a V2 response contains the entire associated request that was sent, creating the response means it
     * also must use the V1 request.
     *
     * @param {Object} responseV1 - The response object to convert from v1 to v2.
     * @returns {Object} - The v2 response object.
     */
    singleResponse: function (responseV1) {
        var response = {},
            self = this,
            originalRequest;

        originalRequest = self.savedRequest(responseV1);

        // add ids to the v2 result only if both: the id and retainIds are truthy.
        // this prevents successive exports to v2 from being overwhelmed by id diffs
        self.options.retainIds && (response.id = responseV1.id || util.uid());

        response.name = responseV1.name || 'response';
        response.originalRequest = originalRequest ? self.request(originalRequest) : undefined;
        response.status = responseV1.responseCode && responseV1.responseCode.name || undefined;
        response.code = responseV1.responseCode && responseV1.responseCode.code || undefined;
        response._postman_previewlanguage = responseV1.language;
        response._postman_previewtype = responseV1.previewType;
        response.header = responseV1.headers;
        response.cookie = _.map(responseV1.cookies, function (cookie) {
            return self.cookie(cookie);
        });
        response.responseTime = responseV1.time;
        response.body = responseV1.text;

        return response;
    },

    /**
     * Constructs an array of "sample" responses (compatible with a V2 collection)
     * from a Postman Collection V1 Request.
     *
     * @param {Object} requestV1 - The v1 request object to extract response information from.
     * @returns {Object[]} - The list of v2 response definitions.
     */
    response: function (requestV1) {
        var self = this;

        return _.map(requestV1.responses, function (responseV1) {
            return self.singleResponse(responseV1);
        });
    },

    /**
     * Creates a V2 compatible ``item`` from a V1 Postman Collection Request
     *
     * @param {Object} requestV1 - Postman collection V1 request.
     * @returns {Object} - The converted request object, in v2 format.
     */
    singleItem: function (requestV1) {
        if (!requestV1) { return; }

        var self = this,
            units = ['request', 'response'],
            variable = self.variable(requestV1),
            item = {
                name: requestV1.name || '', // Inline building to avoid additional function call
                event: self.event(requestV1)
            };

        self.options.retainIds && (item._postman_id = requestV1.id || util.uid());
        // add protocolProfileBehavior property from requestV1 to the item
        util.addProtocolProfileBehavior(requestV1, item);

        units.forEach(function (unit) {
            item[unit] = self[unit](requestV1);
        });

        variable && variable.length && (item.variable = variable);

        return item;
    },

    /**
     * Constructs an array of Items & ItemGroups compatible with the V2 format.
     *
     * @param {Object} collectionV1 - The v1 collection to derive folder information from.
     * @returns {Object[]} - The list of item group definitions.
     */
    itemGroups: function (collectionV1) {
        var self = this,
            items = [],
            itemGroupCache = {},
            retainEmpty = self.options.retainEmptyValues;

        // Read all folder data, and prep it so that we can throw subfolders in the right places
        itemGroupCache = _.reduce(collectionV1.folders, function (accumulator, folder) {
            if (!folder) { return accumulator; }

            var auth = self.auth(folder),
                event = self.event(folder),
                variable = self.variable(folder),
                result = {
                    name: folder.name,
                    item: []
                };

            self.options.retainIds && (result._postman_id = folder.id || util.uid());

            if (folder.description) { result.description = folder.description; }
            else if (retainEmpty) { result.description = null; }

            (auth || (auth === null)) && (result.auth = auth);
            event && (result.event = event);
            variable && variable.length && (result.variable = variable);
            util.addProtocolProfileBehavior(folder, result);

            accumulator[folder.id] = result;

            return accumulator;
        }, {});

        // Populate each ItemGroup with subfolders
        _.forEach(collectionV1.folders, function (folderV1) {
            if (!folderV1) { return; }

            var itemGroup = itemGroupCache[folderV1.id],
                hasSubfolders = folderV1.folders_order && folderV1.folders_order.length,
                hasRequests = folderV1.order && folderV1.order.length;

            // Add subfolders
            hasSubfolders && _.forEach(folderV1.folders_order, function (subFolderId) {
                if (!itemGroupCache[subFolderId]) {
                    // todo: figure out what to do when a collection contains a subfolder ID,
                    // but the subfolder is not actually there.
                    return;
                }

                itemGroupCache[subFolderId]._postman_isSubFolder = true;

                itemGroup.item.push(itemGroupCache[subFolderId]);
            });

            // Add items
            hasRequests && _.forEach(folderV1.order, function (requestId) {
                if (!self.cache[requestId]) {
                    // todo: what do we do here??
                    return;
                }

                itemGroup.item.push(self.singleItem(self.cache[requestId]));
            });
        });

        // This compromises some self-healing, which was originally present, but the performance cost of
        // doing self-healing the right way is high, so we directly rely on collectionV1.folders_order
        // The self-healing way would be to iterate over itemGroupCache directly, but preserving the right order
        // becomes a pain in that case.
        _.forEach(_.uniq(collectionV1.folders_order || _.map(collectionV1.folders, 'id')), function (folderId) {
            var itemGroup = itemGroupCache[folderId];

            itemGroup && !_.get(itemGroup, '_postman_isSubFolder') && items.push(itemGroup);
        });

        // This is useful later
        self.itemGroupCache = itemGroupCache;

        return _.compact(items);
    },

    /**
     * Creates a V2 compatible array of items from a V1 Postman Collection
     *
     * @param {Object} collectionV1 - A Postman Collection object in the V1 format.
     * @returns {Object[]} - The list of item groups (folders) in v2 format.
     */
    item: function (collectionV1) {
        var self = this,
            requestsCache = _.keyBy(collectionV1.requests, 'id'),
            allRequests = _.map(collectionV1.requests, 'id'),
            result;

        self.cache = requestsCache;
        result = self.itemGroups(collectionV1);

        _.forEach(_.intersection(collectionV1.order, allRequests), function (requestId) {
            var request = self.singleItem(requestsCache[requestId]);

            request && (result.push(request));
        });

        return result;
    }
});

module.exports = {
    input: '1.0.0',
    output: '2.0.0',
    Builders: Builders,

    /**
     * Converts a single V1 request to a V2 item.
     *
     * @param {Object} request - The v1 request to convert to v2.
     * @param {Object} options - The set of options for v1 -> v2 conversion.
     * @param {Function} callback - The function to be invoked when the conversion has completed.
     */
    convertSingle: function (request, options, callback) {
        var builders = new Builders(options),
            converted,
            err;

        try {
            converted = builders.singleItem(_.cloneDeep(request));
        }
        catch (e) {
            err = e;
        }

        if (callback) {
            return callback(err, converted);
        }

        if (err) {
            throw err;
        }

        return converted;
    },

    /**
     * Converts a single V1 Response to a V2 Response.
     *
     * @param {Object} response - The v1 response to convert to v2.
     * @param {Object} options - The set of options for v1 -> v2 conversion.
     * @param {Function} callback - The function to be invoked when the conversion has completed.
     */
    convertResponse: function (response, options, callback) {
        var builders = new Builders(options),
            converted,
            err;

        try {
            converted = builders.singleResponse(_.cloneDeep(response));
        }
        catch (e) {
            err = e;
        }

        if (callback) {
            return callback(err, converted);
        }

        if (err) {
            throw err;
        }

        return converted;
    },

    /**
     * Converts a V1 collection to a V2 collection (performs ID replacement, etc as necessary).
     *
     * @param {Object} collection - The v1 collection to convert to v2.
     * @param {Object} options - The set of options for v1 -> v2 conversion.
     * @param {Function} callback - The function to be invoked when the conversion has completed.
     */
    convert: function (collection, options, callback) {
        collection = _.cloneDeep(collection);

        var auth,
            event,
            variable,
            newCollection = {},
            units = ['info', 'item'],
            builders = new Builders(options),
            authOptions = { excludeNoauth: true },
            varOpts = { fallback: options && options.env };

        try {
            units.forEach(function (unit) {
                newCollection[unit] = builders[unit](collection);
            });

            (auth = builders.auth(collection, authOptions)) && (newCollection.auth = auth);
            (event = builders.event(collection)) && (newCollection.event = event);
            (variable = builders.variable(collection, varOpts)) && (newCollection.variable = variable);
            util.addProtocolProfileBehavior(collection, newCollection);
        }
        catch (e) {
            if (callback) {
                return callback(e, null);
            }
            throw e;
        }

        if (callback) { return callback(null, newCollection); }

        return newCollection;
    }
};
