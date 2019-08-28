/* eslint-disable object-shorthand */

var inherits = require('inherits'),
    _ = require('lodash').noConflict(),

    url = require('../../url'),
    util = require('../../util'),
    constants = require('../../constants'),
    BaseBuilders = require('./converter-v1-to-v2').Builders,

    Builders;

inherits(Builders = function () {
    Builders.super_.apply(this, arguments);
}, BaseBuilders);

_.assign(Builders.prototype, {

    /**
     * Derives v2.1.0 collection info from a v1.0.0 collection object.
     *
     * @param {Object} collectionV1 - The v1.0.0 collection object to be converted to v2.1.0.
     * @return {Object} - The compiled v2.x collection info manifest.
     */
    info: function (collectionV1) {
        var info = Builders.super_.prototype.info.call(this, collectionV1);

        info.schema = constants.SCHEMA_V2_1_0_URL;

        return info;
    },

    /**
      * Converts collection request urls from v1.0.0 to v2.1.0
      *
      * @param {Object} requestV1 - The v1.0.0 request url to be converted to v2.1.0.
      * @return {Object} - The objectified v2.1.0 compliant URL.
      */
    url: function (requestV1) {
        var v21Url = Builders.super_.prototype.url.call(this, requestV1);

        return _.isString(v21Url) ? url.parse(v21Url) : v21Url;
    },

    /**
     * A number of auth parameter names have changed from V1 to V2. This function calls the appropriate
     * mapper function, and creates the V2 auth parameter object.
     *
     * @param {Object} entityV1 - A Collection V1 compliant request instance.
     * @param {?Object} options - The set of options for the current auth cleansing operation.
     * @param {?Boolean} [options.includeNoauth=false] - When set to true, noauth is set to null.
     * @returns {{type: *}} - The v2.1.0 compliant request object
     */
    auth: function (entityV1, options) {
        // if the current auth manifest is at a parent level, no further transformation is needed.
        // @todo: Possible dead code, prune when confirmed
        if (util.notLegacy(entityV1, 'auth') && entityV1.currentHelper) {
            return util.sanitizeAuthArray(entityV1, options);
        }

        var auth = Builders.super_.prototype.auth.call(this, entityV1, options);

        return util.authMapToArray({ auth: auth }, options);
    }
});

module.exports = {
    input: '1.0.0',
    output: '2.1.0',
    Builders: Builders,

    /**
     * Converts a single V1 request to a v2.1.0 item.
     *
     * @param {Object} request - The v1.0.0 request to be converted to a v2.1.0 format.
     * @param {Object} options - The set of options for the current conversion sequence.
     * @param {?Function} callback - The function invoked to mark the end of the current conversion process.
     * @returns {*}
     */
    convertSingle: function (request, options, callback) {
        var err,
            converted,
            builders = new Builders(options);

        try { converted = builders.singleItem(_.cloneDeep(request)); }
        catch (e) { err = e; }

        if (callback) { return callback(err, converted); }

        if (err) { throw err; }

        return converted;
    },

    /**
     * Converts a single V1 Response to a v2.1.0 Response.
     *
     * @param {Object} response - The V1 compliant response to convert to a v2.1.0 format.
     * @param {Object} options - The set of options for the current conversion process.
     * @param {?Function} callback - The function invoked to mark the completion of the response conversion.
     * @returns {*}
     */
    convertResponse: function (response, options, callback) {
        var err,
            converted,
            builders = new Builders(options);

        try { converted = builders.singleResponse(_.cloneDeep(response)); }
        catch (e) { err = e; }

        if (callback) { return callback(err, converted); }

        if (err) { throw err; }

        return converted;
    },

    /**
     * Converts a V1 collection to a V2 collection (performs ID replacement, etc as necessary).
     *
     * @param {Object} collection - The V1 collection instance to convert to a v2.1.0 format.
     * @param {Object} options - The set of options for the current conversion sequence.
     * @param {?Function} callback - The function invoked to mark the completion of the conversion process/
     * @returns {*}
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
        }
        catch (e) {
            if (callback) { return callback(e); }
            throw e;
        }

        if (callback) { return callback(null, newCollection); }

        return newCollection;
    }
};
