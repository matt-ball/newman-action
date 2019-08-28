/* eslint-disable object-shorthand */
var _ = require('lodash').noConflict(),
    util = require('../../util'),
    inherits = require('inherits'),

    v2Common = require('../../common/v2'),
    BaseBuilders = require('../v2.0.0/converter-v2-to-v1').Builders,

    Builders;

inherits(Builders = function () {
    Builders.super_.apply(this, arguments);
}, BaseBuilders);

_.assign(Builders.prototype, {
    /**
     * Converts arrays of v2.1 style auth params to their v1.0.0 equivalent objects.
     *
     * @param {Object} entity - A v2.1 compliant wrapped auth manifest.
     * @param {?Object} options - The set of options for the current auth cleansing operation.
     * @param {?Boolean} [options.includeNoauth=false] - When set to true, noauth is set to null.
     * @returns {Object} - A v1 compliant set of auth helper attributes.
     */
    auth: function (entity, options) {
        return util.sanitizeAuthArray(entity, options);
    }
});

module.exports = {
    input: '2.1.0',
    output: '1.0.0',
    Builders: Builders,

    /**
     * Converts a single V2 item to a V1 request.
     *
     * @param {Object} request - The request to be converted.
     * @param {Object} options - The set of options for request conversion.
     * @param {Function} callback - The function to be invoked after conversion has completed.
     */
    convertSingle: function (request, options, callback) {
        var err,
            converted,
            builders = new Builders(options);

        try { converted = builders.request(_.cloneDeep(request)); }
        catch (e) { err = e; }

        if (callback) { return callback(err, converted); }

        if (err) { throw err; }

        return converted;
    },

    /**
     * Converts a single V2 item to a V1 request.
     *
     * @param {Object} response - The response to be converted.
     * @param {Object} options - The set of options for request conversion.
     * @param {Function} callback - The function to be invoked after conversion has completed.
     */
    convertResponse: function (response, options, callback) {
        var builders = new Builders(options),
            converted,
            err;

        try { converted = builders.response(_.cloneDeep(response)); }
        catch (e) { err = e; }

        if (callback) { return callback(err, converted); }

        if (err) { throw err; }

        return converted;
    },

    /**
     * Converts a V2 collection to a V1 collection (performs ID replacement, etc as necessary).
     *
     * @param {Object} collection - The collection to be converted.
     * @param {Object} options - The set of options for request conversion.
     * @param {Function} callback - The function to be invoked after conversion has completed.
     */
    convert: function (collection, options, callback) {
        collection = _.cloneDeep(collection);

        var auth,
            events,
            variables,
            builders = new Builders(options),
            authOptions = { excludeNoauth: true },
            units = ['order', 'folders_order', 'folders', 'requests'],
            varOpts = { fallback: options && options.env },
            id = _.get(collection, 'info._postman_id') || _.get(collection, 'info.id'),
            info = collection && collection.info,
            newCollection = {
                id: id && options && options.retainIds ? id : util.uid(),
                name: info && info.name
            };

        // ensure that each item has an id
        collection = v2Common.populateIds(collection);
        try {
            // eslint-disable-next-line max-len
            newCollection.description = builders.description(info && info.description);
            (auth = builders.auth(collection, authOptions)) && (newCollection.auth = auth);
            (events = builders.events(collection)) && (newCollection.events = events);
            (variables = builders.variables(collection, varOpts)) && (newCollection.variables = variables);

            units.forEach(function (unit) {
                newCollection[unit] = builders[unit](collection);
            });
        }
        catch (e) {
            if (callback) { return callback(e, null); }
            throw e;
        }

        if (callback) { return callback(null, newCollection); }

        return newCollection;
    }
};
