var semver = require('semver'),

    util = require('./util'),
    converter = require('./converters'),
    normalizers = require('./normalizers');

module.exports = {

    /**
     * Converts a Collection between different versions, based on the given input.
     *
     * @param {Object} collection - The collection object to be converted.
     * @param {Object} options - The set of conversion options.
     * @param {String} options.outputVersion - The version to convert to.
     * @param {String} options.inputVersion - The version to convert from.
     * @param {Function} callback - The function invoked to mark the completion of the conversion process.
     */
    convert: function (collection, options, callback) {
        if (!options.outputVersion || !semver.valid(options.outputVersion, true)) {
            return callback(new Error('Output version not specified or invalid: ' + options.outputVersion));
        }
        if (!options.inputVersion || !semver.valid(options.inputVersion, true)) {
            return callback(new Error('Input version not specified or invalid: ' + options.inputVersion));
        }

        return converter.convert(collection, options, callback);
    },

    normalize: normalizers.normalize,
    normalizeSingle: normalizers.normalizeSingle,
    normalizeResponse: normalizers.normalizeResponse,

    /**
     * Export the utilities
     */
    util: util,

    /**
     * Checks whether the given object is a v1 collection
     *
     * @param {Object} object - The Object to check for v1 collection compliance.
     * @returns {Boolean} - A boolean result indicating whether or not the passed object was a v1 collection.
     */
    isv1: function (object) {
        return Boolean(object && object.name && object.order && object.requests);
    },

    /**
     * Checks whether the given object is a v2 collection
     *
     * @param {Object} object - The Object to check for v2 collection compliance.
     * @returns {Boolean} - A boolean result indicating whether or not the passed object was a v2 collection.
     */
    isv2: function (object) {
        return Boolean(object && object.info && object.info.schema);
    },

    /**
     * Converts a single V1 request to a V2 Item, or a V2 item to a single V1 request.
     *
     * @param {Object} object - A V1 request or a V2 item.
     * @param {Object} options - The set of options for response conversion.
     * @param {String} options.outputVersion - The version to convert to.
     * @param {String} options.inputVersion - The version to convert from.
     * @param {Function} callback - The function invoked to mark the completion of the conversion process.
     */
    convertSingle: function (object, options, callback) {
        if (!options.outputVersion || !semver.valid(options.outputVersion, true)) {
            return callback(new Error('Output version not specified or invalid: ' + options.outputVersion));
        }
        if (!options.inputVersion || !semver.valid(options.inputVersion, true)) {
            return callback(new Error('Input version not specified or invalid: ' + options.inputVersion));
        }

        return converter.convertSingle(object, options, callback);
    },

    /**
     * Converts a single V1 request to a V2 Item, or a V2 item to a single V1 request.
     *
     * @param {Object} object - A V1 request or a V2 item.
     * @param {Object} options - The set of options for response conversion.
     * @param {String} options.outputVersion - The version to convert to.
     * @param {String} options.inputVersion - The version to convert from.
     * @param {Function} callback - The function invoked to mark the completion of the conversion process.
     */
    convertResponse: function (object, options, callback) {
        if (!options.outputVersion || !semver.valid(options.outputVersion, true)) {
            return callback(new Error('Output version not specified or invalid: ' + options.outputVersion));
        }
        if (!options.inputVersion || !semver.valid(options.inputVersion, true)) {
            return callback(new Error('Input version not specified or invalid: ' + options.inputVersion));
        }

        return converter.convertResponse(object, options, callback);
    }
};
